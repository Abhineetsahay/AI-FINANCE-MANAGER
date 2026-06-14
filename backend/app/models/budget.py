from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey

from sqlalchemy.sql import func

from app.core.database import Base


class Budget(Base):
    __tablename__ = "budgets"

    budget_id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    category = Column(String(50))

    monthly_limit = Column(Numeric(10, 2))

    effective_from = Column(Date)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
