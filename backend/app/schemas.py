from datetime import datetime
from typing import List,Optional
from pydantic import BaseModel 

class VariationCreate(BaseModel):
    label: str
    target_url:str

class ProjectCreate(BaseModel):
    name:str
    variations: List[VariationCreate]

class VariationOut(BaseModel):
    id:str
    label:str
    short_code:str
    target_url:str
    click_count:int = 0

    class config:
        from_attributes = True

class ProjectOut(BaseModel):
    id:str
    name:str
    created_at: datetime
    variations: List[VariationOut]

    class Config:
        from_attributes = True

class ClickDetail(BaseModel):
    clicked_at : datetime
    device_type: Optional[str]
    browser : Optional[str]
    os:Optional [str]
    country: Optional[str]
    city : Optional[str]
    referrer: Optional[str]

    class Config:
        from_attributes = True
    
class VariationAnalytics(BaseModel):
    id:str
    label:str
    short_code:str
    target_url:str
    total_clicks:int
    click_ratio:float
    device_breakdown:dict
    country_breakdown:dict
    referrer_breakdown:dict

class ProjectAnalytics(BaseModel):
    id:str
    name:str
    total_clicks:int
    winner:Optional[str]
    variations: List[VariationAnalytics]

