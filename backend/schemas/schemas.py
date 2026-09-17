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

from models.model import ProblemStatus

PHONE_PATTERN = r"^[0-9]{10}$"
PASSWORD_MIN = 8
PASSWORD_MAX = 128


class ORMBase(BaseModel):
    model_config = ConfigDict(from_attributes=True, str_strip_whitespace=True)


class InputBase(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


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


# ------------------------------ SPOC ---------------------------------------- #
class SpocSignup(InputBase):
    # A new University row is created from uni_name during signup, and a
    # random registration_number is generated server-side.
    uni_name: str = Field(..., min_length=1, max_length=255)
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    subject_expertise: list[str] = Field(default_factory=list)
    password: str = Field(..., min_length=PASSWORD_MIN, max_length=PASSWORD_MAX)


class SpocLogin(InputBase):
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=PASSWORD_MAX)


class SpocResponse(ORMBase):
    role: Literal["spocuni"] = "spocuni"
    id: UUID
    email: EmailStr
    name: str
    uni_id: UUID
    registration_number: int  # <-- add this
    subject_expertise: list[str]


# ------------------------------ Citizen ------------------------------------- #
class CitizenSignup(InputBase):
    name: str = Field(..., min_length=1, max_length=255)
    phone: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=PASSWORD_MIN, max_length=PASSWORD_MAX)
    longitude: float = Field(..., ge=-180, le=180)
    latitude: float = Field(..., ge=-90, le=90)
    occupation: str = Field(..., min_length=1)
    age: int = Field(..., gt=0, lt=130)
    gender: Literal["M", "F"]
    uni_token: int | None = None

    @field_validator("occupation")
    @classmethod
    def validate_occupation(cls, v: str) -> str:
        if v != v.lower() or re.search(r"\s", v):
            raise ValueError("occupation must be lowercase and contain no whitespace")
        return v


class CitizenLogin(InputBase):
    phone: str = Field(..., pattern=PHONE_PATTERN)
    password: str = Field(..., min_length=1, max_length=PASSWORD_MAX)


class CitizenResponse(ORMBase):
    role: Literal["citizen"] = "citizen"
    id: UUID
    problems: list[UUID] = Field(default_factory=list)
    name: str
    phone: str
    longitude: float
    latitude: float
    occupation: str
    age: int
    gender: Literal["M", "F"]
    uni_token: int | None = None
    created_at: datetime


# ------------------------------ TeamLead ------------------------------------ #
class WorkspaceCreate(InputBase):
    milestones: list[str] = Field(default_factory=list)
    cost_estimate: Decimal
    industry_partner: UUID | None = None


class TeamLeadSignup(InputBase):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=PASSWORD_MIN, max_length=PASSWORD_MAX)
    # BigInteger FK -> universities.registration_number
    uni_id: int
    team_members: list[str] = Field(default_factory=list)
    workspace: WorkspaceCreate | None = None


class TeamLeadLogin(InputBase):
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=PASSWORD_MAX)


class TeamLeadResponse(ORMBase):
    role: Literal["teamlead"] = "teamlead"
    id: UUID
    token: int
    name: str
    email: EmailStr
    team_members: list[str] = Field(default_factory=list)
    workspace_id: UUID | None = None
    uni_id: int


# ------------------------------ SPOC sub-table ------------------------------ #
class SpocActiveProblemResponse(ORMBase):
    id: UUID
    spoc_id: UUID
    problem_id: UUID
    team_lead_token: int | None = None


class SpocActiveProblemCreate(InputBase):
    problem_id: UUID
    team_lead_token: int | None = None


# ------------------------------ Signup envelope ----------------------------- #
SignupData = Annotated[
    Union[CitizenResponse, SpocResponse, TeamLeadResponse],
    Field(discriminator="role"),
]


class SignupResponse(BaseModel):
    status: Literal["success"] = "success"
    message: str
    data: SignupData


# ------------------------------ ProblemStatement ---------------------------- #
ProblemStatusLiteral = Literal[
    "NO_BIDDERS", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"
]


class ProblemStatementResponse(ORMBase):
    id: UUID
    token_number: int
    title: str
    pd: str
    photos: list[bytes] = Field(default_factory=list)
    videos: list[bytes] = Field(default_factory=list)
    longitude: float
    latitude: float
    status: ProblemStatus
    assigned_to: UUID | None = None
    proposals: dict[str, Any] = Field(default_factory=dict)
    date_reported: datetime
    categories: list[str] = Field(default_factory=list)


class ProblemListResponse(BaseModel):
    total: int
    limit: int
    offset: int
    items: list[ProblemStatementResponse]
