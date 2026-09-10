from __future__ import annotations

import hashlib
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, settings
from models.model import RefreshToken, User, UserRole  # ← was models.auth
from schemas.schemas import TokenPair  # ← was schemas.auth

bearer_scheme = HTTPBearer(auto_error=False)
password_hash = PasswordHash.recommended()


# ---------------------------------------------------------------------------
# Password helpers
# ---------------------------------------------------------------------------
def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    try:
        return password_hash.verify(password, hashed)
    except Exception:
        # pwdlib raises on malformed hashes; treat as a failed login, not a 500
        return False


# ---------------------------------------------------------------------------
# Token creation / decoding
# ---------------------------------------------------------------------------
def _role_value(role: str | UserRole) -> str:
    """Accept either a UserRole enum member or a plain string like 'citizen'."""
    return role.value if isinstance(role, UserRole) else str(role)


def _create_token(
    subject: str,
    role: str | UserRole,
    expires_delta: timedelta,
    token_type: str,
) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "role": _role_value(role),
        "type": token_type,
        "iat": now,
        "exp": now + expires_delta,
        "jti": str(uuid.uuid4()),
    }
    return jwt.encode(
        payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm
    )


def create_access_token(subject: str, role: str | UserRole) -> str:
    """Endpoint call style: create_access_token(subject=str(user.id), role=role)."""
    return _create_token(
        subject=subject,
        role=role,
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
        token_type="access",
    )


def create_refresh_token(subject: str, role: str | UserRole) -> str:
    return _create_token(
        subject=subject,
        role=role,
        expires_delta=timedelta(days=settings.refresh_token_expire_days),
        token_type="refresh",
    )


def decode_token(token: str) -> dict[str, Any]:
    try:
        return jwt.decode(
            token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm]
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


# ---------------------------------------------------------------------------
# Refresh-token storage
#
# NOTE: RefreshToken.user_id has an FK → users.id. Citizen / SPOC / TeamLead
# ids live in different tables, so the FK will reject those inserts unless
# you drop the constraint (see the migration note after this file).
# ---------------------------------------------------------------------------
async def store_refresh_token(
    db: AsyncSession,
    user_id: uuid.UUID,
    role: str | UserRole,
    token: str,
) -> None:
    payload = decode_token(token)
    entry = RefreshToken(
        id=uuid.uuid4(),  # PK has no server default
        user_id=user_id,
        role=_role_value(role),  # NOT NULL, no default
        token_hash=_hash_token(token),
        expires_at=datetime.fromtimestamp(payload["exp"], tz=timezone.utc),
        revoked=False,  # NOT NULL, no default
    )
    db.add(entry)
    await db.commit()


async def rotate_refresh_token(db: AsyncSession, token: str) -> tuple[User, TokenPair]:
    payload = decode_token(token)
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not a refresh token"
        )

    token_hash = _hash_token(token)
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    stored = result.scalar_one_or_none()
    if not stored or stored.revoked or stored.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token invalid or revoked",
        )

    result = await db.execute(select(User).where(User.id == stored.user_id))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive"
        )

    stored.revoked = True  # rotation: old refresh token can't be reused

    new_access = create_access_token(subject=str(user.id), role=user.role)
    new_refresh = create_refresh_token(subject=str(user.id), role=user.role)
    await store_refresh_token(db, user_id=user.id, token=new_refresh)
    await db.commit()

    return user, TokenPair(access_token=new_access, refresh_token=new_refresh)


async def revoke_refresh_token(db: AsyncSession, token: str) -> None:
    token_hash = _hash_token(token)
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    stored = result.scalar_one_or_none()
    if stored:
        stored.revoked = True
        await db.commit()


# ---------------------------------------------------------------------------
# Admin / User flow (the ones that actually live in `users`)
# ---------------------------------------------------------------------------
async def authenticate_user(
    db: AsyncSession, email: str, password: str, role: UserRole
) -> User:
    result = await db.execute(
        select(User).where(User.email == email, User.role == role)
    )
    user = result.scalar_one_or_none()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Account disabled"
        )
    return user


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )
    payload = decode_token(credentials.credentials)
    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an access token"
        )

    try:
        user_id = uuid.UUID(payload["sub"])
    except (KeyError, ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token subject"
        )

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )
    return user


def require_role(*allowed_roles: UserRole):
    """Usage: Depends(require_role(UserRole.ADMIN, UserRole.SPOC))"""

    async def dependency(user: User = Depends(get_current_user)) -> User:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return user

    return dependency
