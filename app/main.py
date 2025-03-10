import uvicorn

from contextlib import asynccontextmanager
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.auth.middlewares.validate_token import AuthMiddleware
from app.auth.routes.auth_routers import router
from app.docs.documentation import tags_metadata
from app.config.database import create_db_and_tables
from app.config.env_variables import ENV, HOST, APP_PORT, ALLOWED_ORIGINS


@asynccontextmanager
async def lifespan(_app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="Virtual Library",
    description="A simple API to manage students",
    version="0.0.1",
    openapi_tags=tags_metadata,
    lifespan=lifespan,
    debug=ENV == "dev"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuthMiddleware)

app.include_router(router=router)

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=APP_PORT, log_level="info", reload=ENV == "dev")
