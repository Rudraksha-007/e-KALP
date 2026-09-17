import logging
from typing import Any, Awaitable, Callable

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.schemas import SpocResponse, CitizenResponse, TeamLeadResponse
from database import get_db
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from config import settings
from models.model import Citizen, SpocUniversity, TeamLead, University
from services.auth import get_and_identify_payload
from database import settings

bearer_scheme = HTTPBearer(auto_error=True)

router = APIRouter(prefix="/user", tags=["user"])

ROLE_TABLE = {
    "citizen": Citizen,
    "spocuni": SpocUniversity,
    "teamlead": TeamLead,
}


@router.get(
    "/{role}/me", response_model=SpocResponse | CitizenResponse | TeamLeadResponse
)
async def get_my_fucking_data(
    role: str,
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
):
    if role not in ROLE_TABLE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown role '{role}'.",
        )

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
        token_role, user_id = get_and_identify_payload(payload)
    except ValueError as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, str(e))

    if token_role != role:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Role mismatch")

    if role == "citizen":
        row = (
            await db.execute(select(Citizen).where(Citizen.id == user_id))
        ).scalar_one_or_none()
        if row is None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User no longer exists.")
        return CitizenResponse.model_validate(row).model_dump(mode="json")

    if role == "teamlead":
        row = (
            await db.execute(select(TeamLead).where(TeamLead.id == user_id))
        ).scalar_one_or_none()
        if row is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User no longer exists.",
            )
        return TeamLeadResponse.model_validate(row).model_dump(mode="json")
    if role == "spocuni":
        # Need the JOIN to get registration_number from University.
        result = await db.execute(
            select(SpocUniversity, University)
            .join(University, SpocUniversity.uni_id == University.id)
            .where(SpocUniversity.id == user_id)
        )
        row = result.one_or_none()
        if row is None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User no longer exists.")
        spoc, uni = row
        return SpocResponse(
            id=spoc.id,
            email=spoc.email,
            name=spoc.name,
            uni_id=spoc.uni_id,
            registration_number=uni.registration_number,
            subject_expertise=spoc.subject_expertise,
        ).model_dump(mode="json")

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Role handler missing.",
    )
