from pydantic import BaseModel


class DashboardSummaryResponse(BaseModel):
    monthly_income: float
    monthly_expense: float
    savings: float


class CategoryBreakdownResponse(BaseModel):
    category: str
    amount: float


class MonthlyTrendResponse(BaseModel):
    month: int
    total: float
