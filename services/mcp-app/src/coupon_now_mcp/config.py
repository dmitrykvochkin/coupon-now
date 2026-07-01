"""Runtime configuration for the Coupon Now MCP app."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

SERVICE_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DATABASE_URL = "postgresql+psycopg://coupon_now:coupon_now@localhost:5432/coupon_now"
DATABASE_URL_ENV_VAR = "COUPON_NOW_MCP_DATABASE_URL"


class Settings(BaseSettings):
    """Configuration loaded from environment variables and optional `.env` files."""

    model_config = SettingsConfigDict(
        env_prefix="COUPON_NOW_MCP_",
        env_file=SERVICE_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
        frozen=True,
    )

    database_url: str = Field(default=DEFAULT_DATABASE_URL)

    @field_validator("database_url", mode="after")
    @classmethod
    def normalize_database_url(cls, value: str) -> str:
        return normalize_database_url(value)


def normalize_database_url(database_url: str) -> str:
    """Prefer SQLAlchemy's explicit psycopg dialect for bare Postgres URLs."""
    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    return database_url


@lru_cache
def get_settings() -> Settings:
    """Load and cache settings from environment variables and optional `.env` files."""
    return Settings()
