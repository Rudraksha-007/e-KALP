import logging
from typing import Any, Awaitable, Callable

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.model import (
    Citizen,
    SpocUniversity,
    TeamLead,
    University,
    Workspace,
)
from schemas.schemas import (
    CitizenLogin,
    CitizenResponse,
    CitizenSignup,
    SignupResponse,
    SpocLogin,
    SpocResponse,
    SpocSignup,
    TeamLeadLogin,
    TeamLeadResponse,
    TeamLeadSignup,
    TokenPair,
)
from services.auth import (
    create_access_token,
    create_refresh_token,
    hash_password,
    store_refresh_token,
    verify_password,
)

ALLOWED_ROLES = ("citizen", "spocuni", "teamlead")

SIGNUP_SCHEMAS = {
    "citizen": CitizenSignup,
    "spocuni": SpocSignup,
    "teamlead": TeamLeadSignup,
}

LOGIN_SCHEMAS = {
    "citizen": CitizenLogin,
    "spocuni": SpocLogin,
    "teamlead": TeamLeadLogin,
}

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["auth"])


def _validate_role(role: str) -> str:
    if role not in SIGNUP_SCHEMAS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role '{role}'. Must be one of: {', '.join(ALLOWED_ROLES)}.",
        )
    return role


def _validate_payload(schema_cls, payload: dict[str, Any]):
    try:
        return schema_cls.model_validate(payload)
    except ValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=exc.errors(include_url=False, include_context=False),
        )


async def _signup_citizen(data: CitizenSignup, db: AsyncSession) -> dict[str, Any]:
    exists = await db.execute(select(Citizen.id).where(Citizen.phone == data.phone))
    if exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Phone number already registered.",
        )

    # Optional FK check: uni_token must reference an existing University.
    if data.uni_token is not None:
        uni_exists = await db.execute(
            select(University.id).where(
                University.registration_number == data.uni_token
            )
        )
        if uni_exists.scalar_one_or_none() is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Referenced university not found.",
            )

    citizen = Citizen(
        name=data.name,
        phone=data.phone,
        pass_hash=hash_password(data.password),
        longitude=data.longitude,
        latitude=data.latitude,
        occupation=data.occupation,
        age=data.age,
        gender=data.gender,
        uni_token=data.uni_token,
    )
    db.add(citizen)
    await db.commit()
    await db.refresh(citizen)

    return {
        "status": "success",
        "message": "Citizen registered successfully",
        "data": CitizenResponse.model_validate(citizen).model_dump(mode="json"),
    }


async def _signup_spoc(data: SpocSignup, db: AsyncSession) -> dict[str, Any]:
    exists = await db.execute(
        select(SpocUniversity.id).where(SpocUniversity.email == data.email)
    )
    if exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered as a SPOC university.",
        )

    university = University(name=data.uni_name)
    db.add(university)
    await db.flush()

    spoc = SpocUniversity(
        email=data.email,
        name=data.name,
        uni_id=university.id,
        subject_expertise=data.subject_expertise,
        pass_hash=hash_password(data.password),
    )
    db.add(spoc)
    await db.commit()
    await db.refresh(spoc)

    payload = SpocResponse(
        id=spoc.id,
        email=spoc.email,
        name=spoc.name,
        uni_id=spoc.uni_id,
        registration_number=university.registration_number,
        subject_expertise=spoc.subject_expertise,
    ).model_dump(mode="json")

    return {
        "status": "success",
        "message": "SPOC university registered successfully",
        "data": payload,
    }


async def _signup_teamlead(data: TeamLeadSignup, db: AsyncSession) -> dict[str, Any]:
    # Unique email
    exists = await db.execute(select(TeamLead.id).where(TeamLead.email == data.email))
    if exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered as a team lead.",
        )

    # uni_id now references universities.registration_number (BigInteger).
    uni_exists = await db.execute(
        select(University.id).where(University.registration_number == data.uni_id)
    )
    if uni_exists.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Referenced university not found.",
        )

    workspace_id = None
    if data.workspace is not None:
        workspace = Workspace(
            milestones=data.workspace.milestones,
            cost_estimate=data.workspace.cost_estimate,
            industry_partner=data.workspace.industry_partner,
        )
        db.add(workspace)
        await db.flush()
        workspace_id = workspace.id

    # `token` is an Identity(always=True) column — do NOT set it manually.
    team_lead = TeamLead(
        name=data.name,
        email=data.email,
        pass_hash=hash_password(data.password),
        uni_id=data.uni_id,
        team_members=data.team_members,
        workspace_id=workspace_id,
    )
    db.add(team_lead)
    await db.commit()
    await db.refresh(team_lead)

    return {
        "status": "success",
        "message": "Team lead registered successfully",
        "data": TeamLeadResponse.model_validate(team_lead).model_dump(mode="json"),
    }


SIGNUP_HANDLERS: dict[str, Callable[[Any, AsyncSession], Awaitable[dict]]] = {
    "citizen": _signup_citizen,
    "spocuni": _signup_spoc,
    "teamlead": _signup_teamlead,
}


# --------------------------------------------------------------------------- #
# Login handlers
# --------------------------------------------------------------------------- #
async def _auth_citizen(data: CitizenLogin, db: AsyncSession) -> Citizen:
    result = await db.execute(select(Citizen).where(Citizen.phone == data.phone))
    user = result.scalar_one_or_none()
    if (
        not user
        or not user.pass_hash
        or not verify_password(data.password, user.pass_hash)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def _auth_spoc(data: SpocLogin, db: AsyncSession) -> SpocUniversity:
    result = await db.execute(
        select(SpocUniversity).where(SpocUniversity.email == data.email)
    )
    user = result.scalar_one_or_none()
    if (
        not user
        or not user.pass_hash
        or not verify_password(data.password, user.pass_hash)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def _auth_teamlead(data: TeamLeadLogin, db: AsyncSession) -> TeamLead:
    result = await db.execute(select(TeamLead).where(TeamLead.email == data.email))
    user = result.scalar_one_or_none()
    if (
        not user
        or not user.pass_hash
        or not verify_password(data.password, user.pass_hash)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


LOGIN_HANDLERS: dict[str, Callable[[Any, AsyncSession], Awaitable[Any]]] = {
    "citizen": _auth_citizen,
    "spocuni": _auth_spoc,
    "teamlead": _auth_teamlead,
}


@router.post(
    "/{role}/signup",
    status_code=status.HTTP_201_CREATED,
    response_model=SignupResponse,
    responses={
        400: {"description": "Invalid role"},
        404: {"description": "Referenced entity not found"},
        409: {"description": "Identifier already registered"},
        422: {"description": "Payload validation failed"},
    },
)
async def signup(
    role: str,
    payload: dict[str, Any],
    db: AsyncSession = Depends(get_db),
) -> SignupResponse:
    _validate_role(role)
    data = _validate_payload(SIGNUP_SCHEMAS[role], payload)

    try:
        result = await SIGNUP_HANDLERS[role](data, db)
    except HTTPException:
        await db.rollback()
        raise
    except Exception:
        await db.rollback()
        logger.exception("Signup failed for role=%s", role)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error has occurred.",
        )

    return SignupResponse(**result)


@router.post(
    "/{role}/login",
    response_model=TokenPair,
    responses={
        400: {"description": "Invalid role"},
        401: {"description": "Invalid credentials"},
        422: {"description": "Payload validation failed"},
    },
)
async def login(
    role: str,
    payload: dict[str, Any],
    db: AsyncSession = Depends(get_db),
) -> TokenPair:
    _validate_role(role)
    data = _validate_payload(LOGIN_SCHEMAS[role], payload)

    user = await LOGIN_HANDLERS[role](data, db)

    access_token = create_access_token(subject=str(user.id), role=role)
    refresh_token = create_refresh_token(subject=str(user.id), role=role)

    await store_refresh_token(db, user_id=user.id, role=role, token=refresh_token)

    return TokenPair(access_token=access_token, refresh_token=refresh_token)
