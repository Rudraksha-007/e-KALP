import enum
import secrets
from sqlalchemy import func
from sqlalchemy import (
    ARRAY,
    JSON,
    BigInteger,
    Boolean,
    CHAR,
    CheckConstraint,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Identity,
    Integer,
    LargeBinary,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import ENUM, JSONB, UUID
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


def random_registration_number() -> int:
    """10-digit random number. Uniqueness is enforced by the DB constraint;
    the caller should retry on IntegrityError (collision probability is tiny)."""
    return secrets.randbelow(9_000_000_000) + 1_000_000_000


class ProblemStatus(enum.Enum):
    NO_BIDDERS = "NO_BIDDERS"
    ASSIGNED = "ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    USER = "USER"
    SPOC = "SPOC"
    TEAM_LEAD = "TEAM_LEAD"


class University(Base):
    __tablename__ = "universities"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    # Random registration number handed to the SPOC at signup.

    registration_number = Column(
        BigInteger,
        unique=True,
        nullable=False,
        default=random_registration_number,
        server_default=text("floor(random() * 9000000000 + 1000000000)::bigint"),
    )
    name = Column(Text, nullable=False)


class Citizen(Base):
    __tablename__ = "citizens"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    problems = Column(
        ARRAY(UUID(as_uuid=True)),
        nullable=False,
        server_default=text("'{}'::uuid[]"),
    )
    name = Column(Text, nullable=False)
    phone = Column(Text, nullable=False)
    pass_hash = Column(Text, nullable=True)

    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)

    occupation = Column(Text, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(CHAR(1), nullable=False)

    uni_token = Column(
        BigInteger,
        ForeignKey("universities.registration_number"),
        nullable=True,
    )
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    university = relationship("University")

    __table_args__ = (
        CheckConstraint(
            "occupation = lower(occupation) AND occupation !~ '\\s'",
            name="citizens_occupation_check",
        ),
        CheckConstraint("age > 0 AND age < 130", name="citizens_age_check"),
        CheckConstraint(
            "gender = ANY (ARRAY['M'::bpchar, 'F'::bpchar])",
            name="citizens_gender_check",
        ),
        CheckConstraint(
            "longitude BETWEEN -180 AND 180", name="citizens_longitude_check"
        ),
        CheckConstraint("latitude BETWEEN -90 AND 90", name="citizens_latitude_check"),
    )


class ProblemStatement(Base):
    __tablename__ = "problem_statements"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    token_number = Column(
        BigInteger, Identity(always=True), unique=True, nullable=False
    )
    title = Column(Text, nullable=False)
    pd = Column(Text, nullable=False)

    photos = Column(
        ARRAY(LargeBinary), nullable=False, server_default=text("'{}'::bytea[]")
    )
    videos = Column(
        ARRAY(LargeBinary), nullable=False, server_default=text("'{}'::bytea[]")
    )

    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)

    status = Column(
        ENUM(ProblemStatus, name="problem_status"),
        nullable=False,
        server_default=text("'NO_BIDDERS'::problem_status"),
    )

    # JSON *object* now (was an array).
    proposals = Column(JSONB, nullable=False, server_default=text("'{}'::jsonb"))

    date_reported = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    categories = Column(
        ARRAY(Text), nullable=False, server_default=text("'{}'::text[]")
    )

    assigned_to = Column(
        UUID(as_uuid=True),
        ForeignKey("team_leads.id"),
        nullable=True,
        unique=True,  # enforces 1:1 with a team lead
    )

    assigned_team_lead = relationship("TeamLead", back_populates="problem")

    __table_args__ = (
        CheckConstraint(
            "jsonb_typeof(proposals) = 'object'",
            name="problem_statements_proposals_check",
        ),
    )


# --------------------------------------------------------------------------- #
# SPOC
# --------------------------------------------------------------------------- #
class SpocUniversity(Base):
    __tablename__ = "spoc_universities"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    email = Column(Text, nullable=False, unique=True, index=True)
    pass_hash = Column(Text, nullable=False)
    name = Column(Text, nullable=False)

    uni_id = Column(UUID(as_uuid=True), ForeignKey("universities.id"), nullable=False)
    subject_expertise = Column(
        ARRAY(Text), nullable=False, server_default=text("'{}'::text[]")
    )

    university = relationship("University")
    active_ps = relationship(
        "SpocActiveProblem",
        back_populates="spoc",
        cascade="all, delete-orphan",
    )


class SpocActiveProblem(Base):
    """Per-SPOC subtable: which problems this SPOC is handling and which
    team lead (if any) they assigned to it."""

    __tablename__ = "spoc_active_problems"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    spoc_id = Column(
        UUID(as_uuid=True),
        ForeignKey("spoc_universities.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    problem_id = Column(
        UUID(as_uuid=True),
        ForeignKey("problem_statements.id", ondelete="CASCADE"),
        nullable=False,
    )
    # The team lead's token number; NULL until the SPOC assigns one.
    team_lead_token = Column(BigInteger, ForeignKey("team_leads.token"), nullable=True)

    spoc = relationship("SpocUniversity", back_populates="active_ps")
    problem = relationship("ProblemStatement")
    team_lead = relationship("TeamLead")

    __table_args__ = (
        UniqueConstraint("spoc_id", "problem_id", name="uq_spoc_active_problem"),
    )


# --------------------------------------------------------------------------- #
# TeamLead
# --------------------------------------------------------------------------- #
class TeamLead(Base):
    __tablename__ = "team_leads"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    token = Column(BigInteger, Identity(always=True), unique=True, nullable=False)

    name = Column(Text, nullable=False)
    email = Column(Text, nullable=False, unique=True, index=True)
    pass_hash = Column(Text, nullable=False)

    team_members = Column(JSONB, nullable=False, server_default=text("'[]'::jsonb"))

    workspace_id = Column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=True
    )
    uni_id = Column(
        BigInteger,
        ForeignKey("universities.registration_number"),
        nullable=False,
    )

    workspace = relationship("Workspace")
    university = relationship("University")

    problem = relationship(
        "ProblemStatement",
        uselist=False,
        back_populates="assigned_team_lead",
    )


# --------------------------------------------------------------------------- #
# Untouched tables
# --------------------------------------------------------------------------- #
class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    serial_id = Column(BigInteger, Identity(always=True), unique=True, nullable=False)
    milestones = Column(
        ARRAY(Text), nullable=False, server_default=text("'{}'::text[]")
    )
    cost_estimate = Column(Numeric, nullable=False)
    industry_partner = Column(UUID(as_uuid=True), nullable=True)


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)
    role = Column(ENUM(UserRole, name="role"), nullable=False)
    is_active = Column(Boolean, nullable=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )


class AiProblemTest(Base):
    __tablename__ = "ai_problem_tests"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    citizens_affected = Column(Integer, nullable=False)
    predicted_category = Column(String, nullable=True)
    predicted_categories = Column(JSON, nullable=True)
    category_needs_review = Column(Boolean, nullable=True)
    priority_score = Column(Integer, nullable=True)
    priority_label = Column(String, nullable=True)
    priority_reasons = Column(JSON, nullable=True)


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)  # no FK
    role = Column(Text, nullable=False)
    token_hash = Column(String, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    revoked = Column(Boolean, nullable=False, default=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
