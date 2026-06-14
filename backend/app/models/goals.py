from sqlalchemy import Column, Integer, String, Numeric, Boolean, DateTime, ForeignKey

from sqlalchemy.sql import func

from app.core.database import Base


class Goal(Base):
    __tablename__ = "goals"

    goal_id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    goal = Column(String(200))

    target_amount = Column(Numeric(10, 2))

    saved_amount = Column(Numeric(10, 2), default=0)

    is_achieved = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
