from pydantic import BaseModel
from datetime import date
from uuid import UUID

class ClientCreate(BaseModel):
    name: str
    phone: str
    monthly_amount: int
    paid_amount: int = 0
    unpaid_amount: int = 0
    due_date: date
    priority: bool = False


class ClientResponse(ClientCreate):
    id: UUID
    unpaid_amount: int     # ✅ NEW
    status: str

    class Config:
        from_attributes = True
