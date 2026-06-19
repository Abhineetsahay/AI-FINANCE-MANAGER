from datetime import date

from sqlalchemy import extract
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.expenses import Expense
from app.models.user import User


class DashboardService:

    @staticmethod
    def get_summary(db: Session, user_id: int):

        today = date.today()

        monthly_expense = (
            db.query(func.coalesce(func.sum(Expense.amount), 0))
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == today.month,
                extract("year", Expense.expense_date) == today.year,
            )
            .scalar()
        )

        user = db.query(User).filter(User.id == user_id).first()

        if not user or getattr(user, "user_income", None) is None:
            monthly_income = 0.0
        else:
            monthly_income = float(getattr(user, "user_income", 0) or 0)

        return {
            "monthly_income": monthly_income,
            "monthly_expense": float(monthly_expense),
            "savings": monthly_income - float(monthly_expense),
        }

    @staticmethod
    def category_breakdown(db: Session, user_id: int):

        today = date.today()

        data = (
            db.query(Expense.category, func.sum(Expense.amount).label("total"))
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == today.month,
                extract("year", Expense.expense_date) == today.year,
            )
            .group_by(Expense.category)
            .all()
        )

        return [{"category": row[0], "amount": float(row[1])} for row in data]

    @staticmethod
    def monthly_trend(db: Session, user_id: int):

        data = (
            db.query(
                extract("month", Expense.expense_date).label("month"),
                func.sum(Expense.amount).label("total"),
            )
            .filter(Expense.user_id == user_id)
            .group_by("month")
            .order_by("month")
            .all()
        )

        return [{"month": int(row[0]), "total": float(row[1])} for row in data]

    @staticmethod
    def recent_expenses(db: Session, user_id: int):

        expenses = (
            db.query(Expense)
            .filter(Expense.user_id == user_id)
            .order_by(Expense.created_at.desc())
            .limit(5)
            .all()
        )

        return expenses
