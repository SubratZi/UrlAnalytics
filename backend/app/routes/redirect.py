from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Variation,Click
from app.redis_client import incr_click
from app.services.tracking import parse_device_info,resolve_location, get_client_ip

router = APIRouter(tags=["redirect"])

@router.get("/r/{short_code}")
async def redirect_short_url(short_code:str, request: Request, db: Session = Depends(get_db)):
    variation = db.query(Variation).filter(Variation.short_code == short_code).first()
    if not variation:
        raise HTTPException(404, "Short URL not found")
    
    ip = get_client_ip(request)
    user_agent = request.headers.get("user-agent", "")
    referrer = request.headers.get("referer", "direct")
    device_info = parse_device_info(user_agent)
    location = await resolve_location(ip)

    click = Click(
        variation_id = variation.id,
        device_type = device_info["device_type"],
        browser = device_info["browser"],
        os = device_info["os"],
        country = location["country"],
        city = location["city"],
        referrer = referrer,
        ip_address = ip,
    )

    db.add(click)
    db.commit()
    incr_click(variation.id)

    return RedirectResponse(url = variation.target_url, status_code=302)