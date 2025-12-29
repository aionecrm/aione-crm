from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import SessionLocal
from app.models.client import Client
from app.schemas.client import ClientCreate

router = APIRouter(prefix="/clients", tags=["Clients"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_clients(db: Session = Depends(get_db)):
    return db.query(Client).all()

@router.post("/")
def create_client(payload: ClientCreate, db: Session = Depends(get_db)):
    client = Client(**payload.dict())
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

@router.put("/{client_id}")
def update_client(
    client_id: UUID,
    payload: ClientCreate,
    db: Session = Depends(get_db),
):
    client = db.query(Client).filter(Client.id == client_id).first()

    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    client.name = payload.name
    client.phone = payload.phone
    client.monthly_amount = payload.monthly_amount
    client.due_date = payload.due_date
    client.priority = payload.priority

    db.commit()
    db.refresh(client)
    return client

@router.delete("/{client_id}")
def delete_client(client_id: UUID, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()

    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    db.delete(client)
    db.commit()
    return {"success": True}
