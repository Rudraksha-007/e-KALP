from __future__ import annotations

import re
from datetime import datetime
from decimal import Decimal
from typing import Annotated, Any, Generic, Literal, TypeVar, Union
from uuid import UUID

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)

# ------------------------------------------------------------------------------
# Constants
# ------------------------------------------------------------------------------
PHONE_PATTERN = r"^[0-9]{10}$"
PASSWORD_MIN = 8
PASSWORD_MAX = 128


# ------------------------------------------------------------------------------
# Base configs
# ------------------------------------------------------------------------------
class ORMBase(BaseModel):
    """Base for response schemas read from SQLAlchemy ORM objects."""

    model_config = ConfigDict(
        from_attributes=True,
        str_strip_whitespace=True,
    )


class InputBase(BaseModel):
    """Base for inbound request bodies."""

    model_config = ConfigDict(
        extra="forbid",
        str_strip_whitespace=True,
    )


# ------------------------------------------------------------------------------
# Common auth schemas
# ------------------------------------------------------------------------------
class TokenPair(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: Literal["bearer"] = "bearer"


T = TypeVar("T")


class AuthResponse(BaseModel, Generic[T]):
    user: T
    tokens: TokenPair


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str


# ------------------------------------------------------------------------------
# SPOC University
# ------------------------------------------------------------------------------
class SpocSignup(InputBase):
    uni_name: str = Field(..., min_length=1, max_length=255)
    name: str = Field(..., min_length=1, max_length=255)
    subject_expertise: list[str] = Field(default_factory=list)
    problems_proposal: list[dict[str, Any]] = Field(default_factory=list)
    phone_number: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=PASSWORD_MIN, max_length=PASSWORD_MAX)


class SpocLogin(InputBase):
    phone_number: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=1, max_length=PASSWORD_MAX)


class SpocResponse(ORMBase):
    role: Literal["spocuni"] = "spocuni"
    id: UUID
    serial_id: int
    uni_name: str
    name: str
    subject_expertise: list[str]
    problems_proposal: list[dict[str, Any]]
    phone_number: str


# ------------------------------------------------------------------------------
# Citizen
# ------------------------------------------------------------------------------
class CitizenSignup(InputBase):
    name: str = Field(..., min_length=1, max_length=255)
    phone_number: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=PASSWORD_MIN, max_length=PASSWORD_MAX)
    location: str = Field(..., min_length=1)
    occupation: str = Field(..., min_length=1)
    age: int = Field(..., gt=0, lt=130)
    gender: Literal["M", "F"]
    university_token: int | None = None

    @field_validator("occupation")
    @classmethod
    def validate_occupation(cls, v: str) -> str:
        if v != v.lower() or re.search(r"\s", v):
            raise ValueError("occupation must be lowercase and contain no whitespace")
        return v


class CitizenLogin(InputBase):
    phone_number: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=1, max_length=PASSWORD_MAX)


class CitizenResponse(ORMBase):
    role: Literal["citizen"] = "citizen"
    id: UUID
    serial_id: int
    name: str
    phone_number: str
    location: str
    occupation: str
    age: int
    gender: Literal["M", "F"]
    university_token: int | None = None
    created_at: datetime


# ------------------------------------------------------------------------------
# TeamLead
# ------------------------------------------------------------------------------
class WorkspaceCreate(InputBase):
    milestones: list[str] = Field(default_factory=list)
    cost_estimate: Decimal
    industry_partner: UUID | None = None


class TeamLeadSignup(InputBase):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=PASSWORD_MIN, max_length=PASSWORD_MAX)
    uni_id: UUID
    team_members: list[str] = Field(default_factory=list)
    workspace: WorkspaceCreate


class TeamLeadLogin(InputBase):
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=PASSWORD_MAX)


class TeamLeadResponse(ORMBase):
    role: Literal["teamlead"] = "teamlead"
    id: UUID
    serial_id: int
    name: str
    email: EmailStr
    token: int
    workspace_id: UUID
    uni_id: UUID
    problem_assigned: UUID | None = None
    team_members: list[str]


# ------------------------------------------------------------------------------
# Signup envelope — discriminated union so Pydantic never guesses the branch
# ------------------------------------------------------------------------------
SignupData = Annotated[
    Union[CitizenResponse, SpocResponse, TeamLeadResponse],
    Field(discriminator="role"),
]


class SignupResponse(BaseModel):
    status: Literal["success"] = "success"
    message: str
    data: SignupData
