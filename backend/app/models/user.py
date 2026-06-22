from sqlalchemy import Column, Integer, String, Numeric, DateTime

from sqlalchemy.sql import func

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(255))

    email = Column(String(255), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    user_income = Column(Numeric(30, 2), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
