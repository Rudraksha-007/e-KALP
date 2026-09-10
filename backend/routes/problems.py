# Di={db conn, status filter, category of the problem, assigned_to pagination = limit , offset}
from __future__ import annotations
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.model import ProblemStatement, ProblemStatus
from schemas.schemas import ProblemListResponse

router = APIRouter(prefix="/problems", tags=["problems"])


@router.get(
    "",
    response_model=ProblemListResponse,
    status_code=status.HTTP_200_OK,
)
async def list_problem_statements(
    db: AsyncSession = Depends(get_db),
    status_filter: Optional[ProblemStatus] = Query(
        None, alias="status", description="Filter by problem status"
    ),
    category: Optional[str] = Query(
        None, description="Filter by a single category present in `categories`"
    ),
    assigned_to: Optional[UUID] = Query(
        None, description="Filter by assigned team lead id"
    ),
    search: Optional[str] = Query(
        None,
        min_length=1,
        max_length=100,
        description="Case-insensitive search on title or location",
    ),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    stmt = select(ProblemStatement)

    if status_filter is not None:
        stmt = stmt.where(ProblemStatement.status == status_filter)
    if category:
        stmt = stmt.where(ProblemStatement.categories.any(category))
    if assigned_to is not None:
        stmt = stmt.where(ProblemStatement.assigned_to == assigned_to)
    if search:
        like = f"%{search.lower()}%"
        stmt = stmt.where(
            func.lower(ProblemStatement.title).like(like)
            | func.lower(ProblemStatement.location).like(like)
        )

    # async: await both execute calls
    total = (
        await db.execute(select(func.count()).select_from(stmt.subquery()))
    ).scalar_one()

    result = await db.execute(
        stmt.order_by(ProblemStatement.date_reported.desc()).limit(limit).offset(offset)
    )
    rows = result.scalars().all()

    return ProblemListResponse(
        total=total,
        limit=limit,
        offset=offset,
        items=rows,
    )
