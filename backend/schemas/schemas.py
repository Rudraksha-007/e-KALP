from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from enum import Enum

# ==================== ENUMS ====================
class StatusEnum(str, Enum):
    NO_BIDDERS = "NO_BIDDERS"
    RESOLVED = "RESOLVED"
    AWAITING_FUNDING = "AWAITING_FUNDING"
    AWAITING_FEEDBACK = "AWAITING_FEEDBACK"


class CategoryEnum(str, Enum):
    EDUCATION = "education"
    HEALTHCARE = "healthcare"
    AGRICULTURE = "agriculture"
    WATER_MANAGEMENT = "water management"
    SANITATION = "sanitation"
    ENVIRONMENT = "environment"
    RURAL_LIVELIHOODS = "rural livelihoods"
    ACCESSIBILITY = "accessibility"
    URBAN_INFRASTRUCTURE = "urban infrastructure"
    PUBLIC_SERVICE_DELIVERY = "public service delivery"


# ==================== NESTED MODELS ====================
class ProposalItem(BaseModel):
    """
    Matches the dict keys enforced by ProblemStatement.validate_proposals
    in models.py: "SPOC_UUID" and "TOKEN_NUMBER_Team_lead".
    """
    spoc_uuid: UUID = Field(..., alias="SPOC_UUID")
    team_lead_token: int = Field(..., alias="TOKEN_NUMBER_Team_lead")

    model_config = {"populate_by_name": True}


# ==================== PROBLEM STATEMENT ====================
class ProblemStatementBase(BaseModel):
    title: str
    description: str = Field(..., alias="PD")  # maps to `pd` column
    photos: Optional[str] = None  # NOTE: model column is LargeBinary — assumes URL/path here, not raw bytes
    videos: Optional[str] = None  # same assumption
    location: str
    status: StatusEnum = StatusEnum.NO_BIDDERS
    assigned_to: Optional[UUID] = None
    proposals: List[ProposalItem] = []
    categories: List[CategoryEnum] = []  # was `category: Optional[...]`, renamed + defaulted to match model

    model_config = {"populate_by_name": True}


class ProblemStatementCreate(ProblemStatementBase):
    user_id: UUID = Field(..., alias="USER_ID")
    # token_number, id, date_reported are auto-generated server-side


class ProblemStatementResponse(ProblemStatementBase):
    id: UUID = Field(..., alias="ID")
    user_id: UUID = Field(..., alias="USER_ID")
    token_number: int = Field(..., alias="Token_number")
    date_reported: datetime = Field(..., alias="DATE_REPORTED")  # was `date`, model column is DateTime

    model_config = {"populate_by_name": True}


# ==================== CITIZEN ====================
class CitizenBase(BaseModel):
    name: str
    phone_number: str = Field(..., pattern=r"^\d{10}$")
    pass_hash: Optional[str] = None
    location: str
    occupation: str
    age: int = Field(..., ge=0, le=150)
    gender: str = Field(..., pattern=r"^[MF]$")

    @field_validator("occupation")
    @classmethod
    def normalize_occupation(cls, v: str) -> str:
        return v.lower().replace(" ", "")


class CitizenCreate(CitizenBase):
    pass


class CitizenResponse(CitizenBase):
    id: UUID = Field(..., alias="ID")
    serial_id: int  # was missing — model exposes this as the human-readable ID
    my_reports: List[UUID] = Field(default_factory=list, alias="myReports")

    model_config = {"populate_by_name": True}


# ==================== TEAM LEAD ====================
class TeamLeadBase(BaseModel):
    workspace_id: UUID
    uni_id: UUID
    team_members: List[str] = []  # was missing entirely


class TeamLeadCreate(TeamLeadBase):
    pass  # token is randomly generated server-side; id is auto UUID


class TeamLeadResponse(TeamLeadBase):
    id: UUID
    serial_id: int  # was missing
    token: int


# ==================== SPOC UNIVERSITY ====================
class SPOCUniversityBase(BaseModel):
    uni_name: str
    subject_expertise: List[CategoryEnum]
    phone_number: str = Field(..., pattern=r"^\d{10}$")
    pass_hash: str


class SPOCUniversityCreate(SPOCUniversityBase):
    problems_proposal: List[ProposalItem] = []


class SPOCUniversityResponse(SPOCUniversityBase):
    id: UUID
    serial_id: int  # was missing
    problems_proposal: List[ProposalItem]


# ==================== WORKSPACE ====================
class WorkspaceBase(BaseModel):
    milestones: List[str]
    cost_estimate: float = Field(..., ge=0)
    industry_partner: Optional[UUID] = None


class WorkspaceCreate(WorkspaceBase):
    pass


class WorkspaceResponse(WorkspaceBase):
    id: UUID
    serial_id: int  # was missing


# ==================== ADMIN / GOV (no matching model in models.py) ====================
class AdminGovBase(BaseModel):
    user_id: UUID
    specialization: str
    designation: str
    dep_name: str
    location_city: str = Field(..., alias="location/city")

    model_config = {"populate_by_name": True}


class AdminGovCreate(AdminGovBase):
    pass


class AdminGovResponse(AdminGovBase):
    id: UUID


# ==================== SPOC INDUSTRY (no matching model in models.py) ====================
class SPOCIndustryBase(BaseModel):
    user_id: UUID
    industry_name: str
    address: str
    city_location: str = Field(..., alias="city/location")
    industry_type: str
    collab_type: Optional[str] = None

    model_config = {"populate_by_name": True}


class SPOCIndustryCreate(SPOCIndustryBase):
    pass


class SPOCIndustryResponse(SPOCIndustryBase):
    id: UUID