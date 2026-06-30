"""Typed request and response models for coupon search."""

from __future__ import annotations

from datetime import datetime
from typing import Self

from pydantic import BaseModel, ConfigDict, Field, model_validator


class CouponSearchRequest(BaseModel):
    """Validated input for searching coupon offers."""

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    query: str | None = Field(default=None, min_length=1, max_length=200)
    merchant: str | None = Field(default=None, min_length=1, max_length=200)
    category: str | None = Field(default=None, min_length=1, max_length=100)
    limit: int = Field(default=10, ge=1, le=25)

    @model_validator(mode="after")
    def require_search_term(self) -> Self:
        if self.query is None and self.merchant is None and self.category is None:
            message = "At least one of query, merchant, or category is required."
            raise ValueError(message)
        return self


class CouponOffer(BaseModel):
    """A coupon offer shaped for MCP clients."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    merchant_name: str
    title: str
    code: str | None = None
    discount_summary: str | None = None
    category: str | None = None
    affiliate_url: str | None = None
    terms: str | None = None
    expires_at: datetime | None = None
    freshness_note: str | None = None


class CouponSearchResponse(BaseModel):
    """Structured response returned by the `search_coupons` tool."""

    query: str | None = None
    merchant: str | None = None
    category: str | None = None
    limit: int
    count: int
    offers: list[CouponOffer]

    @classmethod
    def from_request(
        cls,
        request: CouponSearchRequest,
        offers: list[CouponOffer],
    ) -> CouponSearchResponse:
        return cls(
            query=request.query,
            merchant=request.merchant,
            category=request.category,
            limit=request.limit,
            count=len(offers),
            offers=offers,
        )
