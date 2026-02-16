from fastapi import Header, HTTPException
from core.security.auth import decode_token

def require_jwt(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing or invalid Authorization header")

    token = authorization.split(" ", 1)[1]
    payload = decode_token(token)
    return payload
