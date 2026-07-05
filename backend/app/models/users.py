from datetime import datetime
from sqlalchemy import Column, String, DateTime
from app.database import Base
import shortuuid

def gen_id():
    return shortuuid.uuid()[:10]

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=gen_id)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default= datetime.utcnow)
    