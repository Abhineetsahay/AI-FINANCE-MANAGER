from sqlalchemy.orm import Session
from typing import cast
from decimal import Decimal

from app.models.budget import Budget
from app.models.expenses import Expense

from sqlalchemy import func
from datetime import date


class BudgetService:

    @staticmethod
    def create_budget(db: Session, user_id: int, data):

        budget = Budget(
            user_id=user_id,
            category=data.category,
            monthly_limit=data.monthly_limit,
            effective_from=data.effective_from,
        )

        db.add(budget)
        db.commit()
        db.refresh(budget)

        return budget

    @staticmethod
    def get_budgets(db: Session, user_id: int):
        return db.query(Budget).filter(Budget.user_id == user_id).all()

    @staticmethod
    def get_budget(db: Session, budget_id: int, user_id: int):
        return (
            db.query(Budget)
            .filter(Budget.budget_id == budget_id, Budget.user_id == user_id)
            .first()
        )

    @staticmethod
    def update_budget(db: Session, budget, data):

        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(budget, key, value)

        db.commit()
        db.refresh(budget)

        return budget

    @staticmethod
    def delete_budget(db: Session, budget):
        db.delete(budget)
        db.commit()

    @staticmethod
    def get_budget_status(db: Session, user_id: int):

        budgets = db.query(Budget).filter(Budget.user_id == user_id).all()

        result = []

        current_month = date.today().month
        current_year = date.today().year

        for budget in budgets:

            spent = (
                db.query(func.coalesce(func.sum(Expense.amount), 0))
                .filter(
                    Expense.user_id == user_id,
                    Expense.category == budget.category,
                    func.extract("month", Expense.expense_date) == current_month,
                    func.extract("year", Expense.expense_date) == current_year,
                )
                .scalar()
            )

            result.append(
                {
                    "category": budget.category,
                    "budget": budget.monthly_limit,
                    "spent": float(spent),
                    "remaining": float(cast(Decimal, budget.monthly_limit))
                    - float(spent),
                }
            )

        return result
