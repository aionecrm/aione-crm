from pydantic import BaseModel
from datetime import date
from uuid import UUID

class ClientCreate(BaseModel):
    name: str
    phone: str
    monthly_amount: int
    due_date: date
    priority: bool = False

class ClientResponse(ClientCreate):
    id: UUID
    status: str

    class Config:
        from_attributes = True
