from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.expenses import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from app.services.expense_service import ExpenseService

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.post("", response_model=ExpenseResponse)
def create_expense(
    payload: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return ExpenseService.create_expense(db, current_user.id, payload)


@router.get("", response_model=list[ExpenseResponse])
def get_expenses(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return ExpenseService.get_expenses(db, current_user.id)


@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    expense = ExpenseService.get_expense(db, expense_id, current_user.id)

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    return expense


@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(
    expense_id: int,
    payload: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    expense = ExpenseService.get_expense(db, expense_id, current_user.id)

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    return ExpenseService.update_expense(db, expense, payload)


@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    expense = ExpenseService.get_expense(db, expense_id, current_user.id)

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    ExpenseService.delete_expense(db, expense)

    return {"message": "Expense deleted"}
