import xarray as xr
from app.database import SessionLocal, chroma_client, embed_texts
from app import models
from sqlalchemy.orm import Session
import json
from shapely.geometry import Point
from geoalchemy2.shape import from_shape
import pandas as pd

def ingest_netcdf_to_db(nc_path: str):
    ds = xr.open_dataset(nc_path, decode_times=True)
    db: Session = SessionLocal()
    # NOTE: NetCDF structure differs by file; this is a simplified/generic parser for ARGO-style profiles
    # This function should be adjusted depending on your NetCDF variable names
    try:
        nprof = ds.dims.get('N_PROF', ds.dims.get('N_PROF'))
    except Exception:
        # attempt heuristics
        nprof = ds.dims.get('N_PROF', 1)

    # attempt to parse arrays if typical variables exist
    times = ds.get("TIME") or ds.get("time") or None
    lats = ds.get("LATITUDE") or ds.get("latitude") or None
    lons = ds.get("LONGITUDE") or ds.get("longitude") or None
    temp = ds.get("TEMP") or ds.get("temperature") or None
    sal = ds.get("PSAL") or ds.get("salinity") or None
    # loop by profile
    # for PoC, parse first few profiles
    num = min(10, lats.shape[0] if lats is not None else 0)
    for i in range(num):
        float_id = getattr(ds, "FLOAT_ID", f"float_{i}")
        # ensure float exists
        f = db.query(models.OceanFloat).filter(models.OceanFloat.float_id == float_id).first()
        if not f:
            f = models.OceanFloat(float_id=float_id, region=None, operator=None)
            db.add(f)
            db.commit()
        lat = float(lats[i].values) if lats is not None else None
        lon = float(lons[i].values) if lons is not None else None
        timestamp = None
        if times is not None:
            # xarray timestamp handling
            timestamp = pd.to_datetime(times[i].values)
        profile = models.Profile(float_id=float_id, timestamp=timestamp, latitude=lat, longitude=lon)
        if lat and lon:
            profile.geom = from_shape(Point(lon, lat), srid=4326)
        db.add(profile)
        db.commit()
        db.refresh(profile)

        # measurements: iterate depth axis if present
        if temp is not None:
            sample_temps = temp[i].values
            # depths variable
            depth_var = ds.get("PRES") or ds.get("PRES") or None
            depths = depth_var[i].values if depth_var is not None else [None]*len(sample_temps)
            for j, v in enumerate(sample_temps):
                meas = models.Measurement(profile_id=profile.profile_id,
                                          depth=float(depths[j]) if depths is not None else None,
                                          temperature=float(v) if v is not None else None,
                                          salinity=float(sal[i].values[j]) if sal is not None else None,
                                          qc_flags=None)
                db.add(meas)
        db.commit()

        # Create profile summary and add to chroma
        summary = f"Profile {profile.profile_id}: float={float_id}, time={timestamp}, lat={lat}, lon={lon}"
        chroma_collection = chroma_client.get_collection(name="profiles_collection")
        chroma_collection.add(
            documents=[summary],
            metadatas=[{"profile_id": profile.profile_id, "float_id": float_id, "lat": lat, "lon": lon}],
            ids=[f"profile_{profile.profile_id}"],
            embeddings=embed_texts([summary])
        )
    db.close()