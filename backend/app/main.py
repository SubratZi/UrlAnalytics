# This is fastAPI application entry point

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models.models import Base
from app.models.users import User
from app.routes import projects,redirect,analytics
from app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="UrlAnalytics",
    description="URL Shortener with Variation Analytics",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://urlanalytics.vercel.app"],
    allow_credentials = True,
    allow_orgins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(redirect.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {"message": "UrlAnalytics API is running"}