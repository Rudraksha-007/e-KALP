from datetime import datetime
from typing import List, Optional
from uuid import uuid4, UUID
from sqlalchemy import (
    String, BigInteger, DateTime, Enum, ForeignKey, 
    LargeBinary, CheckConstraint
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, validates
from sqlalchemy.dialects.postgresql import UUID as PG_UUID, JSONB
import enum


class Base(DeclarativeBase):
    pass


# ===================== ENUMS =====================
class ProblemStatus(enum.Enum):
    NO_BIDDERS = "NO_BIDDERS"
    RESOLVED = "RESOLVED"
    AWAITING_FUNDING = "AWAITING_FUNDING"
    AWAITING_FEEDBACK = "AWAITING_FEEDBACK"


class Category(enum.Enum):
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


# ===================== CITIZEN =====================
class Citizen(Base):
    __tablename__ = "citizens"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone_number: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    pass_hash: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    occupation: Mapped[str] = mapped_column(String(100), nullable=False)  # Lowercase without ws
    age: Mapped[int] = mapped_column(BigInteger, nullable=False)
    gender: Mapped[str] = mapped_column(String(1), nullable=False)  # 'M' or 'F'

    # Relationship: One Citizen -> Many Problems
    my_reports: Mapped[List["ProblemStatement"]] = relationship(
        back_populates="citizen",
        foreign_keys="[ProblemStatement.user_id]",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Citizen(id={self.id}, name='{self.name}')>"


# ===================== PROBLEM STATEMENT =====================
class ProblemStatement(Base):
    __tablename__ = "problem_statements"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("citizens.id"), nullable=False)
    
    # INT128 isn't native; BigInteger (64-bit) is the max. Use String if you need 128-bit exactly.
    token_number: Mapped[int] = mapped_column(BigInteger, autoincrement=True, unique=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    pd: Mapped[str] = mapped_column(String, nullable=False)  # Problem Description
    photos: Mapped[Optional[bytes]] = mapped_column(LargeBinary, nullable=True)
    videos: Mapped[Optional[bytes]] = mapped_column(LargeBinary, nullable=True)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    
    status: Mapped[ProblemStatus] = mapped_column(
        Enum(ProblemStatus), 
        default=ProblemStatus.NO_BIDDERS
    )
    
    # FK to TeamLead (NULL means unassigned)
    assigned_to: Mapped[Optional[UUID]] = mapped_column(
        PG_UUID(as_uuid=True), 
        ForeignKey("team_leads.id"), 
        nullable=True
    )
    
    # EXACTLY as per your spec: list[JSON<SPOC_UUID, TOKEN_NUMBER_Team_lead>]
    proposals: Mapped[List[dict]] = mapped_column(JSONB, default=list)
    
    date_reported: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Category list as per spec
    categories: Mapped[List[Category]] = mapped_column(JSONB, default=list)

    # Relationships
    citizen: Mapped["Citizen"] = relationship(back_populates="my_reports")
    assigned_team_lead: Mapped[Optional["TeamLead"]] = relationship(
        foreign_keys=[assigned_to],
        back_populates="assigned_problems"
    )

    # Optional: Enforce JSON shape at the application level
    @validates('proposals')
    def validate_proposals(self, key, value):
        if not isinstance(value, list):
            raise ValueError("Proposals must be a list")
        for item in value:
            if not isinstance(item, dict):
                raise ValueError("Each proposal must be a dict")
            if "SPOC_UUID" not in item:
                raise ValueError("Missing 'SPOC_UUID' key in proposal")
            if "TOKEN_NUMBER_Team_lead" not in item:
                raise ValueError("Missing 'TOKEN_NUMBER_Team_lead' key in proposal")
        return value

    def __repr__(self):
        return f"<ProblemStatement(id={self.id}, title='{self.title}', status={self.status})>"


# ===================== TEAM LEAD (UPDATED) =====================
class TeamLead(Base):
    __tablename__ = "team_leads"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    token: Mapped[int] = mapped_column(BigInteger, unique=True, nullable=False)  # Randomly generated number
    
    workspace_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=False)
    uni_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("spoc_universities.id"), nullable=False)
    
    # NEW FIELD as per your updated schema: array of strings
    team_members: Mapped[List[str]] = mapped_column(JSONB, default=list)

    # Relationships
    workspace: Mapped["Workspace"] = relationship(back_populates="team_leads")
    spoc_university: Mapped["SPOCUniversity"] = relationship(back_populates="team_leads")
    assigned_problems: Mapped[List["ProblemStatement"]] = relationship(
        foreign_keys=[ProblemStatement.assigned_to],
        back_populates="assigned_team_lead"
    )

    def __repr__(self):
        return f"<TeamLead(id={self.id}, token={self.token})>"


# ===================== SPOC UNIVERSITY =====================
class SPOCUniversity(Base):
    __tablename__ = "spoc_universities"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    uni_name: Mapped[str] = mapped_column(String(255), nullable=False)
    subject_expertise: Mapped[List[Category]] = mapped_column(JSONB, default=list)
    
    # EXACTLY as per your spec: list[JSON<UUID_PS, TOKENNUMBER>]
    problems_proposal: Mapped[List[dict]] = mapped_column(JSONB, default=list)
    
    phone_number: Mapped[str] = mapped_column(String(10), nullable=False)
    pass_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationships
    team_leads: Mapped[List["TeamLead"]] = relationship(
        back_populates="spoc_university",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<SPOCUniversity(id={self.id}, name='{self.uni_name}')>"


# ===================== WORKSPACE =====================
class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    milestones: Mapped[List[str]] = mapped_column(JSONB, default=list)
    cost_estimate: Mapped[float] = mapped_column(BigInteger, nullable=False)  # Using BigInteger for number
    industry_partner: Mapped[Optional[UUID]] = mapped_column(PG_UUID(as_uuid=True), nullable=True)

    # Relationships
    team_leads: Mapped[List["TeamLead"]] = relationship(
        back_populates="workspace",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Workspace(id={self.id}, cost_estimate={self.cost_estimate})>"