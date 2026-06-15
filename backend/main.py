from fastapi import FastAPI

from app.core.database import Base
from app.core.database import engine

from app.models import user, expenses, receipts, budget, goals, chat_messages
from app.api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)
