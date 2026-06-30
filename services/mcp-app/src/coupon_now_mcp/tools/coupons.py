"""Coupon search tool registration."""

from __future__ import annotations

from fastmcp import FastMCP

from coupon_now_mcp.schemas import CouponSearchRequest, CouponSearchResponse
from coupon_now_mcp.service import CouponQueryService
from coupon_now_mcp.storage.database import session_scope
from coupon_now_mcp.storage.repositories import CouponOfferRepository


def register_coupon_tools(mcp: FastMCP) -> None:
    """Register coupon-related tools on a FastMCP server."""

    @mcp.tool
    def search_coupons(
        query: str | None = None,
        merchant: str | None = None,
        category: str | None = None,
        limit: int = 10,
    ) -> CouponSearchResponse:
        """Search active coupon offers by query text, merchant, or category."""
        request = CouponSearchRequest(
            query=query,
            merchant=merchant,
            category=category,
            limit=limit,
        )

        with session_scope() as session:
            repository = CouponOfferRepository(session)
            service = CouponQueryService(repository)
            return service.search_coupons(request)
