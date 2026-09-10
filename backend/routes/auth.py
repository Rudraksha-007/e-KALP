import logging
import secrets
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
            detail=exc.errors(),
        )


async def _signup_citizen(data: CitizenSignup, db: AsyncSession) -> dict[str, Any]:
    exists = await db.execute(
        select(Citizen.id).where(Citizen.phone_number == data.phone_number)
    )
    if exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Phone number already registered.",
        )

    citizen = Citizen(
        name=data.name,
        phone_number=data.phone_number,
        pass_hash=hash_password(data.password),
        location=data.location,
        occupation=data.occupation,
        age=data.age,
        gender=data.gender,
        university_token=data.university_token,
    )
    db.add(citizen)
    await db.commit()
    await db.refresh(citizen)

    return {
        "status": "success",
        "message": "Citaizen registered successfully",
        "data": CitizenResponse.model_validate(
            citizen, from_attributes=True
        ).model_dump(mode="json"),
    }


async def _signup_spoc(data: SpocSignup, db: AsyncSession) -> dict[str, Any]:
    exists = await db.execute(
        select(SpocUniversity.id).where(
            SpocUniversity.phone_number == data.phone_number
        )
    )
    if exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Phone number already registered as a SPOC university.",
        )

    spoc = SpocUniversity(
        uni_name=data.uni_name,
        name=data.name,
        subject_expertise=data.subject_expertise,
        problems_proposal=data.problems_proposal,
        phone_number=data.phone_number,
        pass_hash=hash_password(data.password),
    )
    db.add(spoc)
    await db.flush()

    university = University(token=spoc.serial_id, name=data.uni_name)
    db.add(university)

    await db.commit()
    await db.refresh(spoc)

    return {
        "status": "successs",
        "message": "SPOCO University registered successfully",
        "data": SpocResponse.model_validate(spoc, from_attributes=True).model_dump(
            mode="json"
        ),
    }


async def _signup_teamlead(data: TeamLeadSignup, db: AsyncSession) -> dict[str, Any]:
    exists = await db.execute(select(TeamLead.id).where(TeamLead.email == data.email))
    if exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered as a team lead.",
        )

    spoc_exists = await db.execute(
        select(SpocUniversity.id).where(SpocUniversity.id == data.uni_id)
    )
    if not spoc_exists.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Referenced SPOC university not found.",
        )

    workspace = Workspace(
        milestones=data.workspace.milestones,
        cost_estimate=data.workspace.cost_estimate,
        industry_partner=data.workspace.industry_partner,
    )
    db.add(workspace)
    await db.flush()

    team_lead = TeamLead(
        name=data.name,
        email=data.email,
        pass_hash=hash_password(data.password),
        token=secrets.randbits(63),
        uni_id=data.uni_id,
        team_members=data.team_members,
        workspace_id=workspace.id,
    )
    db.add(team_lead)
    await db.commit()
    await db.refresh(team_lead)

    return {
        "status": "success",
        "message": "Team lead registered successfully",
        "data": TeamLeadResponse.model_validate(
            team_lead, from_attributes=True
        ).model_dump(mode="json"),
    }


SIGNUP_HANDLERS: dict[str, Callable[[Any, AsyncSession], Awaitable[dict]]] = {
    "citizen": _signup_citizen,
    "spocuni": _signup_spoc,
    "teamlead": _signup_teamlead,
}


async def _auth_citizen(data: CitizenLogin, db: AsyncSession) -> Citizen:
    result = await db.execute(
        select(Citizen).where(Citizen.phone_number == data.phone_number)
    )
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
        select(SpocUniversity).where(SpocUniversity.phone_number == data.phone_number)
    )
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
