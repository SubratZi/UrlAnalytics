from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.users import User
from app.services.auth import(
    hash_password, verify_password,
    create_access_token, get_user_by_email, get_current_user
)

router = APIRouter(prefix="/api/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = '/api/auth/login')

class RegisterPayload(BaseModel):
    email: str
    password:str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: str
    email: str

@router.post("/register", response_model=TokenOut)
def register(payload: RegisterPayload,db: Session = Depends(get_db)):
    if get_user_by_email(db, payload.email):
        raise HTTPException(400, "Email already registered")
    
    user = User(email= payload.email, hashed_password = hash_password(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.id})
    return TokenOut(access_token=token)

@router.post("/login", response_model=TokenOut)
def login(form: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = get_user_by_email(db, form.username)
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(491, "Invalid email or password")
    
    token = create_access_token({'sub': user.id})
    return TokenOut(access_token=token)

@router.get('/me', response_model=UserOut)
def me(token:str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
    user = get_current_user(token,db)
    if not user:
        raise HTTPException(401, 'Not Authenticated')
    return UserOut(id = user.id, email = user.email)