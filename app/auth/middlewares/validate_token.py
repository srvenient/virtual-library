from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from app.auth.libs.jwt import decode_access_token
from jwt import ExpiredSignatureError, InvalidTokenError


class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware to validate JWT tokens on protected routes.

    Exempt routes (e.g., login, register, docs, openapi.json) bypass token validation.
    """
    EXEMPT_PATHS = frozenset({"/api/login", "/api/register", "/docs", "/openapi.json"})

    async def dispatch(self, request: Request, call_next):
        """
        Process incoming requests, validating the JWT token from cookies or Authorization header unless the request path is exempt.

        Args:
            request (Request): The incoming HTTP request.
            call_next (Callable): The next middleware or endpoint handler.

        Returns:
            Response: The HTTP response from the next middleware or an error response if authentication fails.
        """
        if request.url.path in self.EXEMPT_PATHS:
            return await call_next(request)

        # Extract token from Authorization header or cookies
        token = request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token[len("Bearer "):]  # Remove "Bearer " prefix
        else:
            token = request.cookies.get("token")

        if not token:
            return JSONResponse(
                status_code=401,
                content={"detail": "No access token provided"},
            )

        try:
            payload = decode_access_token(token)
            setattr(request.state, "user", payload.get("sub"))  # Store user ID in request state
        except ExpiredSignatureError:
            return JSONResponse(status_code=401, content={"detail": "Token has expired"})
        except InvalidTokenError:
            return JSONResponse(status_code=401, content={"detail": "Invalid token"})
        except Exception as e:
            return JSONResponse(status_code=401, content={"detail": f"Authentication error: {str(e)}"})

        return await call_next(request)
