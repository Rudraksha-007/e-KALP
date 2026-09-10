from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from models.ai_test import AIProblemTest

from schemas.ai_test import (
    AIProblemCreate,
    AIProblemResponse,
)

from services.nlp.categorization import categorize
from services.nlp.prioritization import calculate_priority
from services.nlp.deduplication import compare_problems


router = APIRouter(
    prefix="/ai-test",
    tags=["AI Testing"],
)


# ============================================================
# POST /ai-test/problems
# ============================================================

@router.post(
    "/problems",
    status_code=status.HTTP_201_CREATED,
)
async def create_ai_test_problem(
    problem: AIProblemCreate,
    db: AsyncSession = Depends(get_db),
):
    # --------------------------------------------------------
    # 1. CATEGORIZATION
    # --------------------------------------------------------

    categorization = categorize(
        title=problem.title,
        description=problem.description,
        top_k=3,
    )

    primary_category = categorization["primary_category"]


    # --------------------------------------------------------
    # 2. PRIORITIZATION
    # --------------------------------------------------------

    prioritization = calculate_priority(
        title=problem.title,
        description=problem.description,
        citizens_affected=problem.citizens_affected,
    )


    # --------------------------------------------------------
    # 3. GET EXISTING TEST PROBLEMS
    # --------------------------------------------------------

    stmt = select(AIProblemTest)

    result = await db.scalars(stmt)

    existing_problems = result.all()


    # --------------------------------------------------------
    # 4. DEDUPLICATION
    # --------------------------------------------------------

    duplicate_matches = []
    related_matches = []

    for existing in existing_problems:

        # Geographic comparison requires coordinates
        if (
            problem.latitude is None
            or problem.longitude is None
            or existing.latitude is None
            or existing.longitude is None
        ):
            continue

        comparison = compare_problems(
            title_a=problem.title,
            description_a=problem.description,

            title_b=existing.title,
            description_b=existing.description,

            latitude_a=problem.latitude,
            longitude_a=problem.longitude,

            latitude_b=existing.latitude,
            longitude_b=existing.longitude,

            category_a=primary_category,
            category_b=existing.predicted_category,
        )

        match = {
            "problem_id": existing.id,
            "title": existing.title,
            "relationship": comparison["relationship"],
            "similarity": comparison["similarity"],
            "distance_km": comparison["distance_km"],
            "reasons": comparison["reasons"],
        }

        if comparison["relationship"] == "DUPLICATE":
            duplicate_matches.append(match)

        elif comparison["relationship"] == "RELATED":
            related_matches.append(match)


    # --------------------------------------------------------
    # 5. DON'T SAVE IF DUPLICATE
    # --------------------------------------------------------

    if duplicate_matches:

        return {
            "created": False,
            "duplicate": True,
            "message": (
                "This problem appears to duplicate "
                "an existing problem."
            ),
            "categorization": categorization,
            "prioritization": prioritization,
            "duplicate_matches": duplicate_matches,
            "related_matches": related_matches,
        }


    # --------------------------------------------------------
    # 6. CREATE DATABASE RECORD
    # --------------------------------------------------------

    new_problem = AIProblemTest(
        title=problem.title,
        description=problem.description,

        location=problem.location,

        latitude=problem.latitude,
        longitude=problem.longitude,

        citizens_affected=problem.citizens_affected,

        predicted_category=primary_category,

        predicted_categories=categorization.get(
            "categories"
        ),

        category_needs_review=categorization.get(
            "needs_review"
        ),

        priority_score=prioritization.get(
            "score"
        ),

        priority_label=prioritization.get(
            "label"
        ),

        priority_reasons=prioritization.get(
            "reasons"
        ),
    )


    db.add(new_problem)

    await db.commit()

    await db.refresh(new_problem)


    # --------------------------------------------------------
    # 7. RETURN RESULT
    # --------------------------------------------------------

    return {
        "created": True,
        "duplicate": False,

        "problem": {
            "id": new_problem.id,
            "title": new_problem.title,
            "description": new_problem.description,
            "location": new_problem.location,
            "latitude": new_problem.latitude,
            "longitude": new_problem.longitude,
            "citizens_affected": new_problem.citizens_affected,
        },

        "categorization": categorization,

        "prioritization": prioritization,

        "duplicate_matches": duplicate_matches,

        "related_matches": related_matches,
    }


# ============================================================
# GET /ai-test/problems
# ============================================================

@router.get(
    "/problems",
    response_model=list[AIProblemResponse],
)
async def get_ai_test_problems(
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(AIProblemTest)
        .order_by(AIProblemTest.id.desc())
    )

    result = await db.scalars(stmt)

    return result.all()


# ============================================================
# GET /ai-test/problems/{problem_id}
# ============================================================

@router.get(
    "/problems/{problem_id}",
    response_model=AIProblemResponse,
)
async def get_ai_test_problem(
    problem_id: int,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(AIProblemTest).where(
        AIProblemTest.id == problem_id
    )

    problem = await db.scalar(stmt)

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AI test problem not found",
        )

    return problem