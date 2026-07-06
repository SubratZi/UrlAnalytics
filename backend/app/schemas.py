from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, field_validator, ConfigDict


class VariationCreate(BaseModel):
    label: str
    target_url: str

    @field_validator("target_url")
    @classmethod
    def ensure_https(cls, v):
        if not v.startswith("http://") and not v.startswith("https://"):
            return "https://" + v
        return v


class ProjectCreate(BaseModel):
    name: str
    variations: List[VariationCreate]


class VariationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    label: str
    short_code: str
    target_url: str
    click_count: int = 0


class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    created_at: datetime
    variations: List[VariationOut]


class ClickDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    clicked_at: datetime
    device_type: Optional[str]
    browser: Optional[str]
    os: Optional[str]
    country: Optional[str]
    city: Optional[str]
    referrer: Optional[str]


class VariationAnalytics(BaseModel):
    id: str
    label: str
    short_code: str
    target_url: str
    total_clicks: int
    click_ratio: float
    device_breakdown: dict
    country_breakdown: dict
    referrer_breakdown: dict


class ProjectAnalytics(BaseModel):
    id: str
    name: str
    total_clicks: int
    winner: Optional[str]
    variations: List[VariationAnalytics]


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    new_variations: Optional[List[VariationCreate]] = None