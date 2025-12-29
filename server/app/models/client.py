from sqlalchemy import Column, String, Integer, Boolean, Date
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class Client(Base):
    __tablename__ = "clients"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)

    monthly_amount = Column(Integer, nullable=False)
    paid_amount = Column(Integer, nullable=False, default=0)    # ✅ NEW
    unpaid_amount = Column(Integer, nullable=False, default=0)  # ✅ NEW

    due_date = Column(Date, nullable=False)
    priority = Column(Boolean, default=False)
    status = Column(String, default="active")
