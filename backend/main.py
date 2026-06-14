from fastapi import FastAPI

from app.core.database import Base
from app.core.database import engine

from app.models import user
from app.models import expenses
from app.models import receipts
from app.models import budget
from app.models import goals
from app.models import chat_messages

Base.metadata.create_all(bind=engine)

app = FastAPI()
