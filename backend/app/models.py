from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.orm import relationship, declarative_base
from geoalchemy2 import Geometry

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")

class OceanFloat(Base):
    __tablename__ = "floats"
    float_id = Column(String, primary_key=True, index=True)
    deploy_date = Column(TIMESTAMP, nullable=True)
    region = Column(String, nullable=True)
    operator = Column(String, nullable=True)

    profiles = relationship("Profile", back_populates="ocean_float")

class Profile(Base):
    __tablename__ = "profiles"
    profile_id = Column(Integer, primary_key=True, autoincrement=True)
    float_id = Column(String, ForeignKey("floats.float_id"))
    timestamp = Column(TIMESTAMP)
    latitude = Column(Float)
    longitude = Column(Float)
    geom = Column(Geometry("POINT", srid=4326))

    measurements = relationship("Measurement", back_populates="profile")
    ocean_float = relationship("OceanFloat", back_populates="profiles")

class Measurement(Base):
    __tablename__ = "measurements"
    measurement_id = Column(Integer, primary_key=True, autoincrement=True)
    profile_id = Column(Integer, ForeignKey("profiles.profile_id"))
    depth = Column(Float)
    temperature = Column(Float)
    salinity = Column(Float)
    oxygen = Column(Float, nullable=True)
    qc_flags = Column(JSON, nullable=True)

    profile = relationship("Profile", back_populates="measurements")