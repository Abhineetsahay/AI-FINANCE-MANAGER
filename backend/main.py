from fastapi import FastAPI

from app.core.database import Base
from app.core.database import engine

from app.models import user, expenses, receipts, budget, goals, chat_messages
from app.api.auth import router as auth_router
from app.api.expenses import router as expense_router
from app.api.budgets import router as budget_router
from app.api.goals import router as goal_router
from app.api.dashboard import router as dashboard_router
from app.api.chat import router as chat_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)
app.include_router(expense_router)


app.include_router(budget_router)
app.include_router(goal_router)
app.include_router(dashboard_router)


app.include_router(chat_router)
