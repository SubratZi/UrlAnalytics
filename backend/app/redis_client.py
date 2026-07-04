import redis
try:
    redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_reponses= True)
    redis_client.ping()
    REDIS_AVAILABLE = True
except Exception:
    redis_client = None
    REDIS_AVAILABLE = False

def incr_click(variation_id:str) -> int:
    if not REDIS_AVAILABLE:
        return -1
    key = f"clicks:{variation_id}"
    return redis_client.incr(key)

def get_click_count(variation_id:str) -> int:
    if not REDIS_AVAILABLE:
        return -1 
    key = f"clicks: {variation_id}"
    val = redis_client.get(key)
    return int(val) if val else 0