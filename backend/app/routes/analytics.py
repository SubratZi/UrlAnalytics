from collections import Counter
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Project
from app.models.users import User
from app.schemas import ProjectAnalytics, VariationAnalytics
from app.services.auth import get_current_user

router  = APIRouter(prefix = "/api/analytics", tags = ["analytics"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')

def get_auth_user(token:str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    user = get_current_user(token,db)
    if not user:
        raise HTTPException(401, "Not authenticated")
    return user


@router.get("/{project_id}", response_model = ProjectAnalytics)
def get_project_analytics(project_id:str, db: Session  = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    
    total_clicks = sum(len(v.clicks) for v in project.variations)
    variations_analytics = []
    winner_label, winner_clicks = None, -1

    for v in project.variations:
        clicks = v.clicks
        n =len(clicks)
        ratio = round((n/ total_clicks*100),2 ) if total_clicks > 0 else 0.0

        device_breakdown = dict(Counter(c.device_type for c in clicks if c.device_type))
        country_breakdown = dict(Counter(c.country for c in clicks if c.country))
        referrer_breakdown = dict(Counter(c.referrer for c in clicks if c.referrer))

        variations_analytics.append(
            VariationAnalytics(
                id = v.id, label = v.label, short_code= v.short_code, target_url = v.target_url,
                total_clicks = n, click_ratio = ratio,
                device_breakdown = device_breakdown,
                country_breakdown = country_breakdown,
                referrer_breakdown = referrer_breakdown,
            )
        )
        if n> winner_clicks:
            winner_clicks = n
            winner_label = v.label
    click_counts = [len (v.clicks) for v in project.variations]
    if total_clicks ==0 or click_counts.count(max(click_counts))> 1:
        winner_label= None
    return ProjectAnalytics(
        id= project.id, name = project.name, total_clicks = total_clicks, winner= winner_label, variations = variations_analytics
    )
    