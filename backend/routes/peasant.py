# /reportProblem POST
# /myProblems GET
import base64
import binascii
import logging
from typing import Any

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from database import get_db
from models.model import Citizen, ProblemStatement
from schemas.schemas import ProblemCreate, ProblemStatementResponse
from services.auth import get_and_identify_payload

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/citizen", tags=["citizen"])

bearer_scheme = HTTPBearer(auto_error=True)


async def get_current_citizen(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> Citizen:
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

    if role != "citizen":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Citizen access required.",
        )

    row = (
        await db.execute(select(Citizen).where(Citizen.id == user_id))
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User no longer exists.",
        )
    return row


@router.post(
    "/reportProblem",
    status_code=status.HTTP_201_CREATED,
    response_model=ProblemStatementResponse,
    responses={
        400: {"description": "Malformed base64 in photos/videos"},
        401: {"description": "Missing or invalid token"},
        403: {"description": "Not a citizen"},
    },
)
async def report_problem(
    payload: ProblemCreate,
    citizen: Citizen = Depends(get_current_citizen),
    db: AsyncSession = Depends(get_db),
) -> Any:
    try:
        photo_bytes = [base64.b64decode(p, validate=True) for p in payload.photos]
        video_bytes = [base64.b64decode(v, validate=True) for v in payload.videos]
    except (binascii.Error, ValueError) as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid base64 in photos/videos: {e}",
        )

    problem = ProblemStatement(
        title=payload.title,
        pd=payload.pd,
        photos=photo_bytes,
        videos=video_bytes,
        longitude=payload.longitude,
        latitude=payload.latitude,
        categories=payload.categories,
        # status  -> server_default 'NO_BIDDERS'
        # proposals -> server_default '{}'
        # date_reported -> server_default now()
        # assigned_to -> NULL
    )
    db.add(problem)
    await db.flush()

    citizen.problems = list(citizen.problems or []) + [problem.id]

    await db.commit()
    await db.refresh(problem)

    return problem


@router.get(
    "/myProblems",
    response_model=list[ProblemStatementResponse],
    responses={
        401: {"description": "Missing or invalid token"},
        403: {"description": "Not a citizen"},
    },
)
async def my_problems(
    citizen: Citizen = Depends(get_current_citizen),
    db: AsyncSession = Depends(get_db),
) -> Any:
    if not citizen.problems:
        return []

    result = await db.execute(
        select(ProblemStatement)
        .where(ProblemStatement.id.in_(citizen.problems))
        .order_by(ProblemStatement.date_reported.desc())
    )
    return list(result.scalars().all())
