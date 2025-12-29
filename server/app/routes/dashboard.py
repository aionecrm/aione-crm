from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.core.database import SessionLocal
from app.models.client import Client

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    today = date.today()

    total_clients = db.query(func.count(Client.id)).scalar()

    active_clients = db.query(func.count(Client.id)).filter(
        Client.status == "active"
    ).scalar()

    pending_amount = db.query(
        func.coalesce(func.sum(Client.monthly_amount), 0)
    ).filter(
        Client.due_date >= today,
        Client.status == "active"
    ).scalar()

    # 🚧 TEMP LOGIC (until payments table exists)
    monthly_revenue = 0

    return {
        "total_clients": total_clients,
        "active_clients": active_clients,
        "pending_amount": pending_amount,
        "monthly_revenue": monthly_revenue
    }
