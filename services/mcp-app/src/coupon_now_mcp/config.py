"""Runtime configuration for the Coupon Now MCP app."""

from __future__ import annotations

import os
from functools import lru_cache

from pydantic import BaseModel, Field

DATABASE_URL_ENV_VAR = "COUPON_NOW_MCP_DATABASE_URL"
DEFAULT_DATABASE_URL = "postgresql+psycopg://coupon_now:coupon_now@localhost:5432/coupon_now"


class Settings(BaseModel):
    """Configuration read by the MCP runtime."""

    database_url: str = Field(default=DEFAULT_DATABASE_URL)


def normalize_database_url(database_url: str) -> str:
    """Prefer SQLAlchemy's explicit psycopg dialect for bare Postgres URLs."""
    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    return database_url


@lru_cache
def get_settings() -> Settings:
    """Load process configuration from the environment."""
    raw_database_url = os.getenv(DATABASE_URL_ENV_VAR, DEFAULT_DATABASE_URL)
    return Settings(database_url=normalize_database_url(raw_database_url))
