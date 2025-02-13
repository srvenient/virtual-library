from fastapi import FastAPI

import student.routers.controller as student

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Virtual Library",
    description="A simple API to manage students",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # O "*" para permitir cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student.router, prefix="/api")  # Include the routers from controller.py


@app.get("/")
async def root():
    return {"message": "Hello World"}
