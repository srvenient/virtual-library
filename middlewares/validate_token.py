from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from libs.jwt import decode_access_token


class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware to validate JWT tokens on protected routes.

    Exempt routes (e.g., login, register, docs, openapi.json) bypass token validation.
    """
    EXEMPT_PATHS = {"/api/login", "/api/register", "/docs", "/openapi.json"}

    async def dispatch(self, request: Request, call_next):
        """
        Process incoming requests, validating the JWT token from cookies unless the request path is exempt.

        Args:
            request (Request): The incoming HTTP request.
            call_next (Callable): The next middleware or endpoint handler.

        Returns:
            Response: The HTTP response from the next middleware or an error response if authentication fails.
        """
        # Skip token validation for exempt paths
        if request.url.path in self.EXEMPT_PATHS:
            return await call_next(request)

        # Retrieve the token from cookies
        token = request.cookies.get("token")
        if not token:
            return JSONResponse(
                status_code=401,
                content={"detail": "No access token provided"},
            )

        # Remove the "Bearer " prefix if present
        if token.startswith("Bearer "):
            token = token[len("Bearer "):]

        try:
            payload = decode_access_token(token)
            # Set the current user's identifier on the request state
            request.state.user = payload.get("sub")
        except Exception as e:
            return JSONResponse(
                status_code=401,
                content={"detail": f"Invalid token: {str(e)}"},
            )


        response = await call_next(request)
        return response
