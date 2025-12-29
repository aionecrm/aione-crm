from sqlalchemy import Column, String, Integer, Boolean, Date, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    monthly_amount = Column(Integer, nullable=False)

    due_date = Column(Date, nullable=False)

    priority = Column(Boolean, default=False)
    status = Column(String, default="active")
    created_at = Column(TIMESTAMP, server_default=func.now())
