import json

from datetime import datetime
from datetime import timedelta
from typing import cast
from decimal import Decimal
from sqlalchemy.orm import Session

from app.models.aiInsight import AIInsight
from app.models.user import User
from app.models.expenses import Expense
from app.models.budget import Budget
from app.models.goals import Goal

from app.services.ai.groq_service_ai_insight import (
    generate_financial_insight,
)


class InsightService:

    @staticmethod
    def get_ai_insights(
        db: Session,
        user_id: int,
    ):

        cached = db.query(AIInsight).filter(AIInsight.user_id == user_id).first()

        if cached:

            age = datetime.utcnow() - cached.created_at.replace(tzinfo=None)

            if age < timedelta(hours=24):
                return cached.insight_data

        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            raise ValueError("User not found")

        expenses = db.query(Expense).filter(Expense.user_id == user_id).all()
        budgets = db.query(Budget).filter(Budget.user_id == user_id).all()
        goals = db.query(Goal).filter(Goal.user_id == user_id).all()
        income = cast(Decimal, user.user_income)

        total_expense = sum(cast(Decimal, exp.amount) for exp in expenses)

        savings = income - total_expense

        savings_rate = (
            round(
                (savings / income) * 100,
                2,
            )
            if income > 0
            else 0
        )

        budget_data = [
            {
                "category": budget.category,
                "limit": float(cast(Decimal, budget.monthly_limit)),
            }
            for budget in budgets
        ]

        goal_data = [
            {
                "goal": goal.goal,
                "target": float(cast(Decimal, goal.target_amount)),
                "saved": float(cast(Decimal, goal.saved_amount)),
            }
            for goal in goals
        ]

        finance_context = f"""
Monthly Income: {income}

Monthly Expense: {total_expense}

Savings: {savings}

Savings Rate: {savings_rate}%

Budgets:
{json.dumps(budget_data)}

Goals:
{json.dumps(goal_data)}
"""

        insight = generate_financial_insight(finance_context)

        if cached:
            cached.insight_data = insight
        else:
            cached = AIInsight(
                user_id=user_id,
                insight_data=insight,
            )
            db.add(cached)

        db.commit()

        return insight
