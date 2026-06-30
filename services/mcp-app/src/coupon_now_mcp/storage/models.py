"""SQLModel table definitions for MCP coupon reads."""

from __future__ import annotations

from datetime import UTC, datetime

from sqlmodel import Field, SQLModel


def utc_now() -> datetime:
    return datetime.now(UTC)


class Merchant(SQLModel, table=True):
    """Merchant records exposed through coupon search."""

    __tablename__ = "merchants"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, min_length=1, max_length=255)
    slug: str = Field(index=True, min_length=1, max_length=255, unique=True)
    website_url: str | None = Field(default=None, max_length=2048)
    created_at: datetime = Field(default_factory=utc_now, nullable=False)
    updated_at: datetime = Field(default_factory=utc_now, nullable=False)


class Offer(SQLModel, table=True):
    """Normalized offer records queried by the MCP app."""

    __tablename__ = "offers"

    id: int | None = Field(default=None, primary_key=True)
    merchant_id: int = Field(foreign_key="merchants.id", index=True)
    title: str = Field(min_length=1, max_length=500)
    code: str | None = Field(default=None, max_length=100)
    discount_summary: str | None = Field(default=None, max_length=500)
    category: str | None = Field(default=None, index=True, max_length=100)
    affiliate_url: str | None = Field(default=None, max_length=2048)
    terms: str | None = Field(default=None)
    expires_at: datetime | None = Field(default=None, index=True)
    is_active: bool = Field(default=True, index=True)
    freshness_note: str | None = Field(default=None, max_length=500)
    created_at: datetime = Field(default_factory=utc_now, nullable=False)
    updated_at: datetime = Field(default_factory=utc_now, nullable=False)
