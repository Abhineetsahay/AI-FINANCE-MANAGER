from sqlalchemy.orm import Session
from app.models.expenses import Expense


class ExpenseService:

    @staticmethod
    def create_expense(db: Session, user_id: int, data):

        expense = Expense(
            user_id=user_id,
            amount=data.amount,
            category=data.category,
            description=data.description,
            expense_date=data.expense_date,
        )

        db.add(expense)
        db.commit()
        db.refresh(expense)

        return expense

    @staticmethod
    def get_expenses(db: Session, user_id: int):
        return db.query(Expense).filter(Expense.user_id == user_id).all()

    @staticmethod
    def get_expense(db: Session, expense_id: int, user_id: int):
        return (
            db.query(Expense)
            .filter(Expense.expense_id == expense_id, Expense.user_id == user_id)
            .first()
        )

    @staticmethod
    def delete_expense(db: Session, expense):
        db.delete(expense)
        db.commit()

    @staticmethod
    def update_expense(db: Session, expense, data):

        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(expense, key, value)

        db.commit()
        db.refresh(expense)

        return expense
