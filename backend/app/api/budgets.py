from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user

from app.schemas.budget import BudgetCreate, BudgetUpdate, BudgetResponse

from app.services.budget_service import BudgetService

router = APIRouter(prefix="/budgets", tags=["Budgets"])


@router.post("", response_model=BudgetResponse)
def create_budget(
    payload: BudgetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return BudgetService.create_budget(db, current_user.id, payload)


@router.get("", response_model=list[BudgetResponse])
def get_budgets(db: Session = Depends(get_db), current_user=Depends(get_current_user)):

    return BudgetService.get_budgets(db, current_user.id)


@router.put("/{budget_id}")
def update_budget(
    budget_id: int,
    payload: BudgetUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    budget = BudgetService.get_budget(db, budget_id, current_user.id)

    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    return BudgetService.update_budget(db, budget, payload)


@router.delete("/{budget_id}")
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    budget = BudgetService.get_budget(db, budget_id, current_user.id)

    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    BudgetService.delete_budget(db, budget)

    return {"message": "Budget deleted"}


@router.get("/status")
def get_budget_status(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):

    return BudgetService.get_budget_status(db, current_user.id)
