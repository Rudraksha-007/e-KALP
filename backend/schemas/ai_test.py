from typing import Optional, Any

from pydantic import BaseModel, Field


class AIProblemCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: str = Field(..., min_length=5)

    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    citizens_affected: int = Field(
        default=1,
        ge=1
    )


class AIProblemResponse(BaseModel):
    id: int

    title: str
    description: str

    location: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]

    citizens_affected: int

    predicted_category: Optional[str]
    predicted_categories: Optional[list[Any]]
    category_needs_review: Optional[bool]

    priority_score: Optional[int]
    priority_label: Optional[str]

    # IMPORTANT: prioritization.py returns a dictionary here
    priority_reasons: Optional[dict[str, Any]]

    class Config:
        from_attributes = True