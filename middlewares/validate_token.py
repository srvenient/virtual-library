from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from libs.jwt import decode_access_token


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path in ["/api/login", "/api/register", "/docs", "/openapi.json"]:
            return await call_next(request)

        token = request.cookies.get("access_token")
        if not token:
            return JSONResponse(
                status_code=401,
                content={"detail": "No access token provided"},
            )


        if token.startswith("Bearer "):
            token = token[len("Bearer "):]

        try:
            payload = decode_access_token(token)
            request.state.user = payload.get("sub")
        except Exception as e:
            return JSONResponse(
                status_code=401,
                content={"detail": f"Invalid token: {str(e)}"},
            )

        response = await call_next(request)
        return response