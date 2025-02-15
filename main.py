from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers import auth_controllers
from db import create_db_and_tables
from middlewares.validate_token import AuthMiddleware

app = FastAPI(
    title="Virtual Library",
    description="A simple API to manage students",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_controllers.router)  # Include the routers from controller.py

app.add_middleware(AuthMiddleware)

@app.on_event("startup")
async def on_startup():
    create_db_and_tables()
    print("Database created")