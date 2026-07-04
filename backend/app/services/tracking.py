import httpx
from user_agents import parse as parse_ua

def parse_device_info(user_agent_string: str) ->dict:
    ua = parse_ua(user_agent_string or "")

    if ua.is_mobile:
        device_type = "mobile"
    elif ua.is_tablet:
        device_type = "tablet"
    elif ua.is_pc:
        device_type = "desktop"
    else:
        device_type = "other"

    return {
        "device_type": device_type,
        "browser": ua.browser.family or "Unknown",
        "os": ua.os.family or "Unknown",
    }

async def resolve_location(ip_address: str)-> dict:
    if not ip_address or ip_address in ("127.0.0.1", "localhost") or ip_address.startswith("192.168."):
        return {"country" : "Unknown", "city": "Unknown"}
    
    try:
        async with httpx.AsyncClient(timeout= 2.0) as client:
            rep = await client.get(f"http://ip-api.com/json/{ip_address}? fields = country,city,status")
            data = resp.json()
            if data.get("status") == "success":
                return{"country": data.get("country", "Unknown"), "city": data.get("city", "Unknown")}
    except Exception:
        pass

    return {"country": "Unknown", "city": "Unknown"}

def get_client_ip(request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"