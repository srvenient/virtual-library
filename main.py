from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from db import create_db_and_tables
from middlewares.validate_token import AuthMiddleware
from routers import auth_routers
from logging_config import logger

app = FastAPI(
    title="Virtual Library",
    description="A simple API to manage students",
    version="0.0.1"
)

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust as necessary for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include authentication-related routes from auth_routers
app.include_router(auth_routers.router)

# Add custom authentication middleware to validate JWT tokens
app.add_middleware(AuthMiddleware)


@app.on_event("startup")
async def on_startup():
    """
    Startup event handler: creates the database tables and logs the event.
    """
    create_db_and_tables()
    logger.info("Database created")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5173)
