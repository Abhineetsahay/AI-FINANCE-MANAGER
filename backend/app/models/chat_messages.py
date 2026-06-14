import enum
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey, Enum

from sqlalchemy.sql import func

from app.core.database import Base


class Role(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    message_id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    role = Column(Enum(Role), nullable=False)

    message = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
