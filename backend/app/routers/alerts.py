from fastapi import APIRouter
from app.services.anomaly import detect_anomalies
from app.database import SessionLocal
from app import models

router = APIRouter()

@router.get("/recent")
def recent_alerts():
    # PoC: compute simple anomaly on latest profiles' surface temperature
    db = SessionLocal()
    profiles = db.query(models.Profile).order_by(models.Profile.timestamp.desc()).limit(100).all()
    temps = []
    profile_ids = []
    for p in profiles:
        # get measurement near surface (min depth)
        m = min(p.measurements, key=lambda x: x.depth or 0, default=None)
        if m and m.temperature is not None:
            temps.append(m.temperature)
            profile_ids.append(p.profile_id)
    inds = detect_anomalies(temps)
    alerts = [{"profile_id": profile_ids[i], "temp": temps[i]} for i in inds]
    db.close()
    return {"alerts": alerts}
