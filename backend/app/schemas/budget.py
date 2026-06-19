from datetime import date
from pydantic import BaseModel


class BudgetCreate(BaseModel):
    category: str
    monthly_limit: float
    effective_from: date


class BudgetUpdate(BaseModel):
    category: str | None = None
    monthly_limit: float | None = None
    effective_from: date | None = None


class BudgetResponse(BaseModel):
    budget_id: int
    category: str
    monthly_limit: float
    effective_from: date

    class Config:
        from_attributes = True
