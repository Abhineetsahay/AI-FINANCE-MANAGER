from datetime import date
from pydantic import BaseModel


class ExpenseCreate(BaseModel):
    amount: float
    category: str
    description: str | None = None
    expense_date: date


class ExpenseUpdate(BaseModel):
    amount: float | None = None
    category: str | None = None
    description: str | None = None
    expense_date: date | None = None


class ExpenseResponse(BaseModel):
    expense_id: int
    amount: float
    category: str
    description: str | None
    expense_date: date

    class Config:
        from_attributes = True
