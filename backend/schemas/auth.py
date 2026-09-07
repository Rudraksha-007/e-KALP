import uuid
from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict
from models.auth import UserRole


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    password: str
    role: UserRole


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: EmailStr
    phone: str | None
    role: UserRole
    is_active: bool
    created_at: datetime


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str