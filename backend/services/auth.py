import uuid
import hashlib
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash
from fastapi import Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, settings
from models.auth import User, RefreshToken, UserRole
from schemas.auth import TokenPair
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

bearer_scheme = HTTPBearer(auto_error=False)
password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return password_hash.verify(password, hashed)


def _create_token(subject: str, role: UserRole, expires_delta: timedelta, token_type: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "role": role.value,
        "type": token_type,
        "iat": now,
        "exp": now + expires_delta,
        "jti": str(uuid.uuid4()),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def create_access_token(user: User) -> str:
    return _create_token(
        str(user.id), user.role, timedelta(minutes=settings.access_token_expire_minutes), "access"
    )


def create_refresh_token(user: User) -> str:
    return _create_token(
        str(user.id), user.role, timedelta(days=settings.refresh_token_expire_days), "refresh"
    )


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


async def authenticate_user(db: AsyncSession, email: str, password: str, role: UserRole) -> User:
    result = await db.execute(select(User).where(User.email == email, User.role == role))
    user = result.scalar_one_or_none()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account disabled")
    return user


async def store_refresh_token(db: AsyncSession, user: User, token: str) -> None:
    payload = decode_token(token)
    entry = RefreshToken(
        user_id=user.id,
        token_hash=_hash_token(token),
        expires_at=datetime.fromtimestamp(payload["exp"], tz=timezone.utc),
    )
    db.add(entry)
    await db.commit()


async def rotate_refresh_token(db: AsyncSession, token: str) -> tuple[User, TokenPair]:
    payload = decode_token(token)
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not a refresh token")

    token_hash = _hash_token(token)
    result = await db.execute(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    stored = result.scalar_one_or_none()
    if not stored or stored.revoked or stored.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token invalid or revoked")

    result = await db.execute(select(User).where(User.id == stored.user_id))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive")

    stored.revoked = True  # rotation: old refresh token can't be reused

    new_access = create_access_token(user)
    new_refresh = create_refresh_token(user)
    await store_refresh_token(db, user, new_refresh)
    await db.commit()

    return user, TokenPair(access_token=new_access, refresh_token=new_refresh)


async def revoke_refresh_token(db: AsyncSession, token: str) -> None:
    token_hash = _hash_token(token)
    result = await db.execute(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    stored = result.scalar_one_or_none()
    if stored:
        stored.revoked = True
        await db.commit()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    if payload.get("type") != "access":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an access token")

    result = await db.execute(select(User).where(User.id == uuid.UUID(payload["sub"])))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive")
    return user


def require_role(*allowed_roles: UserRole):
    """Usage: Depends(require_role(UserRole.admin, UserRole.institution))"""
    async def dependency(user: User = Depends(get_current_user)) -> User:
        if user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return user
    return dependency