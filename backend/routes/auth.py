from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from models.auth import User, UserRole
from schemas.auth import UserRegister, UserLogin, UserOut, TokenPair, RefreshRequest
from backend.models.auth import UserRole
from services.auth import (
    hash_password,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    store_refresh_token,
    rotate_refresh_token,
    revoke_refresh_token,
    get_current_user,
    require_role,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("{role}/signup", status_code=status.HTTP_201_CREATED)
async def signup(role: str, payload: UserRegister, db: AsyncSession = Depends(get_db)):

    pass


@router.post("/{role}/login", response_model=TokenPair)
async def login(role: UserRole, payload: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, payload.email, payload.password, role)
    access_token = create_access_token(user)
    refresh_token = create_refresh_token(user)
    await store_refresh_token(db, user, refresh_token)
    return TokenPair(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=TokenPair)
async def refresh(payload: RefreshRequest, db: AsyncSession = Depends(get_db)):
    _, tokens = await rotate_refresh_token(db, payload.refresh_token)
    return tokens


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(payload: RefreshRequest, db: AsyncSession = Depends(get_db)):
    await revoke_refresh_token(db, payload.refresh_token)


# @router.get("/me", response_model=UserOut)
# async def me(user: User = Depends(get_current_user)):
#     return user


# Example RBAC-protected route — swap roles as needed per endpoint
@router.get("/admin/ping")
async def admin_ping(user: User = Depends(require_role(UserRole.admin))):
    return {"message": f"hello admin {user.email}"}
