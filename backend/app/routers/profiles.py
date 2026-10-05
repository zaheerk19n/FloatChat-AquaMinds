from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
from typing import List, Optional
from geoalchemy2.functions import ST_Point

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.ProfileOut])
def list_profiles(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    profiles = db.query(models.Profile).order_by(models.Profile.timestamp.desc()).offset(offset).limit(limit).all()
    return profiles

@router.get("/{profile_id}", response_model=schemas.ProfileOut)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.profile_id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.get("/nearby", response_model=List[schemas.ProfileOut])
def nearby(lat: float = Query(...), lon: float = Query(...), radius_km: float = 50.0, db: Session = Depends(get_db)):
    # simple bounding box fallback (production: use ST_DWithin)
    min_lat = lat - 0.5
    max_lat = lat + 0.5
    min_lon = lon - 0.5
    max_lon = lon + 0.5
    q = db.query(models.Profile).filter(
        models.Profile.latitude.between(min_lat, max_lat),
        models.Profile.longitude.between(min_lon, max_lon)
    ).limit(200)
    return q.all()
