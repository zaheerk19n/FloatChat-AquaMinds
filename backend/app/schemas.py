from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    password: str
    role: Optional[str] = "user"

class UserOut(BaseModel):
    id: int
    email: str
    role: str

    class Config:
        orm_mode = True

class ProfileOut(BaseModel):
    profile_id: int
    float_id: str
    timestamp: datetime
    latitude: float
    longitude: float

    class Config:
        orm_mode = True

class MeasurementOut(BaseModel):
    measurement_id: int
    profile_id: int
    depth: float
    temperature: Optional[float]
    salinity: Optional[float]
    oxygen: Optional[float]

    class Config:
        orm_mode = True

class ChatRequest(BaseModel):
    query: str
