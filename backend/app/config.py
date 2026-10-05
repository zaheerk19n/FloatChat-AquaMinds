# app/config.py
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from typing import Optional

class Settings(BaseSettings):
    # App
    app_name: str = "FloatChat"
    debug: bool = False

    # Database
    database_url: str  # required

    # JWT
    jwt_secret: str  # required
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440

    # APIs
    gemini_api_key: Optional[str] = None

    # Chroma
    chroma_persist_dir: str = "./chroma_db"

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="forbid"  # optional: reject extra env vars
    )

settings = Settings()