from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.models.users import User

SECRET_KEY = '4234@#$@@insiasdahdwhatiittinta@13@!#!#'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 10

pwd_context = CryptContext(schemas=['bcrypt'], deprecated = "auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain:str, hashed:str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data:dict) -> str:
    to_encode =data.copy()
    expire = datetime.utc() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, SECRET_KEY)
        return payload.get('sub')
    except JWTError:
        return None
    
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_current_user(token:str, db:Session) -> Optional[User]:
    user_id = decode_token(token)
    if not user_id:
        return None 
    return db.query(User).filter(User.id == user_id).first()