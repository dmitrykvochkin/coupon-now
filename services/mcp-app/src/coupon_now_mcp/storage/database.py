"""Database engine and session helpers for MCP read queries."""

from __future__ import annotations

from collections.abc import Iterator
from contextlib import contextmanager
from functools import lru_cache

from sqlalchemy.engine import Engine
from sqlmodel import Session, create_engine

from coupon_now_mcp.config import get_settings, normalize_database_url


@lru_cache
def get_engine(database_url: str) -> Engine:
    """Create and cache SQLAlchemy engines by normalized database URL."""
    return create_engine(normalize_database_url(database_url))


@contextmanager
def session_scope(database_url: str | None = None) -> Iterator[Session]:
    """Yield a SQLModel session for one query operation."""
    resolved_url = (
        normalize_database_url(database_url) if database_url else get_settings().database_url
    )
    with Session(get_engine(resolved_url)) as session:
        yield session
