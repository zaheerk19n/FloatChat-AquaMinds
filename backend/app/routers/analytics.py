from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
from typing import Dict
import pandas as pd

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/summary")
def summary(start: str = None, end: str = None, db: Session = Depends(get_db)):
    # simple stats: average temperature/salinity over last N profiles
    query = db.query(models.Measurement.temperature, models.Measurement.salinity)
    df = pd.read_sql(query.statement, db.bind)
    return {"avg_temperature": float(df['temperature'].mean()) if not df.empty else None,
            "avg_salinity": float(df['salinity'].mean()) if not df.empty else None}