# /pitch
# /evaluate
import logging

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from database import get_db
from models.model import (
    ProblemStatement,
    SpocActiveProblem,
    SpocUniversity,
    TeamLead,
    University,
)
from schemas.schemas import (
    PitchCreate,
    PitchResponse,
    ProblemBrief,
    TeamLeadBrief,
)
from services.auth import get_and_identify_payload

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/univ", tags=["univ"])
bearer_scheme = HTTPBearer(auto_error=True)


async def get_current_spoc(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> SpocUniversity:
    try:
        payload = jwt.decode(
            creds.credentials,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        role, user_id = get_and_identify_payload(payload)
    except ValueError as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, str(e))

    if role != "spocuni":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="SPOC access required.",
        )

    row = (
        await db.execute(select(SpocUniversity).where(SpocUniversity.id == user_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User no longer exists.",
        )
    return row


@router.post(
    "/pitch",
    status_code=status.HTTP_201_CREATED,
    response_model=PitchResponse,
    responses={
        401: {"description": "Missing or invalid token"},
        403: {"description": "Not a SPOC, or team lead from another university"},
        404: {"description": "Problem or team lead not found"},
        409: {"description": "Problem already assigned / resolved / closed"},
    },
)
async def pitch(
    payload: PitchCreate,
    spoc: SpocUniversity = Depends(get_current_spoc),
    db: AsyncSession = Depends(get_db),
) -> PitchResponse:
    # 1. Fetch the SPOC's university to learn its registration_number.
    uni = (
        await db.execute(select(University).where(University.id == spoc.uni_id))
    ).scalar_one_or_none()
    if uni is None:
        # Data integrity issue — SPOC exists but its University is gone.
        logger.error("SPOC %s has no matching University row", spoc.id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="SPOC's university record missing.",
        )

    # 2. Problem must exist.
    problem = (
        await db.execute(
            select(ProblemStatement).where(ProblemStatement.id == payload.problem_id)
        )
    ).scalar_one_or_none()
    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found.",
        )

    # 3. Can't pitch on a problem that's already been decided.
    if problem.status in ("ASSIGNED", "RESOLVED", "CLOSED"):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Problem is already {problem.status.value} — cannot pitch.",
        )

    # 4. Team lead must exist (looked up by token).
    team_lead = (
        await db.execute(
            select(TeamLead).where(TeamLead.token == payload.team_lead_token)
        )
    ).scalar_one_or_none()
    if team_lead is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team lead not found.",
        )

    # 5. Team lead must belong to the SPOC's university.
    if team_lead.uni_id != uni.registration_number:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Team lead belongs to a different university.",
        )

    # 6. Upsert the pitch — one row per (spoc, problem).
    existing = (
        await db.execute(
            select(SpocActiveProblem).where(
                SpocActiveProblem.spoc_id == spoc.id,
                SpocActiveProblem.problem_id == problem.id,
            )
        )
    ).scalar_one_or_none()

    if existing is None:
        pitch_row = SpocActiveProblem(
            spoc_id=spoc.id,
            problem_id=problem.id,
            team_lead_token=team_lead.token,
        )
        db.add(pitch_row)
        action = "created"
    else:
        existing.team_lead_token = team_lead.token
        pitch_row = existing
        action = "updated"

    await db.commit()
    await db.refresh(pitch_row)

    logger.info(
        "pitch %s: spoc=%s problem=%s team_lead_token=%s",
        action,
        spoc.id,
        problem.id,
        team_lead.token,
    )

    return _serialize_pitch(pitch_row, problem, team_lead)


@router.get(
    "/evaluate",
    response_model=list[PitchResponse],
    responses={
        401: {"description": "Missing or invalid token"},
        403: {"description": "Not a SPOC"},
    },
)
async def evaluate(
    spoc: SpocUniversity = Depends(get_current_spoc),
    db: AsyncSession = Depends(get_db),
) -> list[PitchResponse]:
    result = await db.execute(
        select(SpocActiveProblem, ProblemStatement, TeamLead)
        .join(ProblemStatement, SpocActiveProblem.problem_id == ProblemStatement.id)
        .join(TeamLead, SpocActiveProblem.team_lead_token == TeamLead.token)
        .where(
            SpocActiveProblem.spoc_id == spoc.id,
            SpocActiveProblem.team_lead_token.is_not(None),
        )
        .order_by(ProblemStatement.date_reported.desc())
    )
    rows = result.all()
    return [_serialize_pitch(sap, ps, tl) for sap, ps, tl in rows]


def _serialize_pitch(
    sap: SpocActiveProblem,
    problem: ProblemStatement,
    team_lead: TeamLead,
) -> PitchResponse:
    return PitchResponse(
        id=sap.id,
        spoc_id=sap.spoc_id,
        problem=ProblemBrief.model_validate(problem),
        team_lead=TeamLeadBrief.model_validate(team_lead),
    )
