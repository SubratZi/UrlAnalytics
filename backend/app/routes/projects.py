from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.users import User
from app.models.models import Project, Variation
from app.schemas import ProjectCreate, ProjectOut, VariationOut, ProjectUpdate
from app.redis_client import get_click_count
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/projects", tags=["projects"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl = '/api/auth/login')

def get_auth_user(token:str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(401, "Not authenticated")
    return user

@router.post("", response_model = ProjectOut)
def create_project(payload: ProjectCreate, db:Session = Depends(get_db), user: User= Depends(get_auth_user)):
    if len(payload.variations)<1:
        raise HTTPException(400, "At least one variation is required")
    
    project = Project(name= payload.name, user_id = user.id)
    db.add(project)
    db.flush()

    for v in payload.variations:
        variation = Variation(project_id = project.id, label = v.label, target_url = v.target_url)
        db.add(variation)
    
    db.commit()
    db.refresh(project)
    return _serialize_project(project)

@router.get("", response_model=list[ProjectOut])
def list_projects(db:Session = Depends(get_db), user: User = Depends(get_auth_user)):
    projects = db.query(Project).filter(Project.user_id == user.id).order_by(Project.created_at.desc()).all()
    return [_serialize_project(p) for p in projects]

@router.get("/{project_id}", response_model = ProjectOut)
def get_project(project_id:str, db: Session = Depends(get_db), user: User = Depends(get_auth_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == user.id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    return _serialize_project(project)

@router.delete("/{project_id}")
def delete_project(project_id: str, db: Session = Depends(get_db), user: User = Depends(get_auth_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == user.id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    
    db.delete(project)
    db.commit()
    return{"message":"Project deleted successfully"}

def _serialize_project(project:Project) -> ProjectOut:
    variations_out = []
    for v in project.variations:
        count = get_click_count(v.id)
        if count == -1:
            count = len(v.clicks)
        variations_out.append(
            VariationOut(
                id= v.id, label=v.label, short_code = v.short_code, target_url= v.target_url, click_count=count)
        )
    return ProjectOut(id = project.id, name = project.name, created_at = project.created_at, variations = variations_out)

@router.patch("/{project_id}", response_model = ProjectOut)
def update_project(project_id:str, payload: ProjectUpdate, db:Session = Depends(get_db), user: User =Depends(get_auth_user) ):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == user.id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    
    if payload.name:
        project.name = payload.name

    if payload.new_variations:
        for v in payload.new_variations:
            variation = Variation(project_id = project.id, label = v.label, target_url= v.target_url)
            db.add(variation)
    
    db.commit()
    db.refresh(project)
    return _serialize_project(project)
