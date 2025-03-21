import secrets
from typing import Any, Literal, Annotated

from pydantic import AnyUrl, BeforeValidator, computed_field, HttpUrl, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore"
    )
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:5173"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field  # type: ignore[prop-decorator]
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    PROJECT_NAME: str = "Virtual Library"
    PROJECT_DESCRIPTION: str = "A simple API to manage virtual library"
    PROJECT_VERSION: str = "0.1.0"
    SENTRY_DSN: HttpUrl | None = None
    POSTGRES_USER: str = "library_owner"
    POSTGRES_PASSWORD: str = "npg_jLdbhi7x1Ycv"
    POSTGRES_SERVER: str = "ep-withered-fog-a8jq1uxt-pooler.eastus2.azure.neon.tech"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "library"
    POSTGRES_SSLMODE: str = "require"

    @computed_field  # type: ignore[prop-decorator]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
            query="sslmode=" + self.POSTGRES_SSLMODE
        )


settings = Settings()
