from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import get_current_user

from app.schemas.dashboard import (
    DashboardSummaryResponse,
    CategoryBreakdownResponse,
    MonthlyTrendResponse,
)

from app.schemas.expenses import ExpenseResponse

from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummaryResponse)
def dashboard_summary(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    return DashboardService.get_summary(db, current_user.id)


@router.get("/category-breakdown", response_model=list[CategoryBreakdownResponse])
def category_breakdown(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    return DashboardService.category_breakdown(db, current_user.id)


@router.get("/monthly-trend", response_model=list[MonthlyTrendResponse])
def monthly_trend(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    return DashboardService.monthly_trend(db, current_user.id)


@router.get("/recent-expenses", response_model=list[ExpenseResponse])
def recent_expenses(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    return DashboardService.recent_expenses(db, current_user.id)
