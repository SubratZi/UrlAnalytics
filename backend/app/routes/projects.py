from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Project, Variation
from app.schemas import ProjectCreate, ProjectOut, VariationOut
from app.redis_client import get_click_count

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.post("", response_model = ProjectOut)
def create_project(payload: ProjectCreate, db:Session = Depends(get_db)):
    if len(payload.variations)<1:
        raise HTTPException(400, "At least one variation is required")
    
    project = Project(name= payload.name)
    db.add(project)
    db.flush()

    for v in payload.variations:
        variation = Variation(project_id = project.id, label = v.label, target_url = v.target_url)
        db.add(variation)
    
    db.commit()
    db.refresh(project)
    return _serialize_project(project)

@router.get("", response_model=list[ProjectOut])
def list_projects(db:Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return [_serialize_project(p) for p in projects]

@router.get("/{project_id}", response_model = ProjectOut)
def get_project(project_id:str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    return _serialize_project(project)

def _serialize_project(project:Project) -> dict:
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

