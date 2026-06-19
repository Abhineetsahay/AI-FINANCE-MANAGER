from sqlalchemy.orm import Session

from app.models.chat_messages import ChatMessage, Role

from app.models.user import User
from app.models.expenses import Expense
from app.models.budget import Budget
from app.models.goals import Goal

from app.services.ai.prompt_builder import build_prompt

from app.services.ai.llm_client import generate_response


class ChatService:

    MAX_MESSAGES = 10

    @staticmethod
    def ask_question(db: Session, user_id: int, question: str):

        user = db.query(User).filter(User.id == user_id).first()

        expenses = db.query(Expense).filter(Expense.user_id == user_id).all()

        budgets = db.query(Budget).filter(Budget.user_id == user_id).all()

        goals = db.query(Goal).filter(Goal.user_id == user_id).all()

        prompt = build_prompt(user, expenses, budgets, goals, question)

        ai_response = generate_response(prompt)

        ChatService.store_message(db, user_id, Role.USER, question)

        ChatService.store_message(db, user_id, Role.ASSISTANT, ai_response)

        ChatService.trim_history(db, user_id)

        return ai_response

    @staticmethod
    def store_message(db, user_id, role, message):

        chat = ChatMessage(user_id=user_id, role=role, message=message)

        db.add(chat)
        db.commit()

    @staticmethod
    def trim_history(db, user_id):

        messages = (
            db.query(ChatMessage)
            .filter(ChatMessage.user_id == user_id)
            .order_by(ChatMessage.created_at.desc())
            .all()
        )

        if len(messages) > ChatService.MAX_MESSAGES:

            extra = messages[ChatService.MAX_MESSAGES :]

            for msg in extra:
                db.delete(msg)

            db.commit()

    @staticmethod
    def get_history(db, user_id):

        return (
            db.query(ChatMessage)
            .filter(ChatMessage.user_id == user_id)
            .order_by(ChatMessage.created_at.asc())
            .all()
        )

    @staticmethod
    def clear_history(db, user_id):

        messages = db.query(ChatMessage).filter(ChatMessage.user_id == user_id).all()

        for msg in messages:
            db.delete(msg)

        db.commit()
