from typing import Optional

from sqlalchemy import Float, Integer, String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class AIProblemTest(Base):
    __tablename__ = "ai_problem_tests"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    location: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True
    )

    latitude: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True
    )

    longitude: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True
    )

    citizens_affected: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1
    )

    # AI categorization result
    predicted_category: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True
    )

    predicted_categories: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True
    )

    category_needs_review: Mapped[Optional[bool]] = mapped_column(
        nullable=True
    )

    # AI prioritization result
    priority_score: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )

    priority_label: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True
    )

    priority_reasons: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True
    )