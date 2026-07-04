from datetime import datetime
from sqlalchemy import Column,String,Integer,DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import shortuuid

def gen_id():
    return shortuuid.uuid()[:10]

def gen_short_code():
    return shortuuid.uuid()[:7]

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    variations = relationship("Variation", back_populates="project", cascade="all, delete-orphan")

class Variation(Base):
    __tablename__ = "variations"
    id = Column(String, primary_key=True, default=gen_id)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    label = Column(String, nullable=False)
    short_code = Column(String, unique=True, index=True, default= gen_short_code)
    target_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates= "variations")
    clicks = relationship("Click", back_populates="variations", cascade="all, delete-orphan")

class Click(Base):
    __tablename__ = "clicks"

    id = Column(Integer, primary_key = True, autoincrement=True)
    variation_id = Column(String, ForeignKey("variations.id"), nullable = False)
    clicked_at = Column (DateTime, default=datetime.utcnow)
    device_type = Column(String, nullable=True)
    browser = Column(String, nullable=False)
    os = Column(String, nullable=True)
    country = Column(String, nullable=True)
    city = Column(String, nullable=True)
    referrer = Column(String, nullable=False)
    ip_address = Column(String, nullable=True)

    variations = relationship("Variation", back_populates="clicks")
    