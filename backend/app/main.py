from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine
from app.routers import auth, chat, profiles, analytics, reports, alerts

# create DB tables (for PoC)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="FloatChat Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])
app.include_router(alerts.router, prefix="/alerts", tags=["alerts"])

@app.get("/")
def root():
    return {"message": "🌊 FloatChat Backend Running"}
