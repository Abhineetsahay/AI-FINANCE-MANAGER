from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    Numeric,
    DateTime,
    ForeignKey,
)

from sqlalchemy.sql import func

from app.core.database import Base


class Receipt(Base):
    __tablename__ = "receipts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    expensed_id = Column(Integer, ForeignKey("users.id"))

    file_url = Column(Text, nullable=False)

    extracted_amount = Column(Numeric(10, 2))
    extracted_category = Column(String(100))
    extracted_text = Column(Text)

    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
