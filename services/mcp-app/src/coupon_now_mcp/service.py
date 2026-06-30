"""Transport-independent coupon query service."""

from __future__ import annotations

from typing import Protocol

from coupon_now_mcp.schemas import CouponOffer, CouponSearchRequest, CouponSearchResponse


class CouponSearchRepository(Protocol):
    """Repository behavior required by the coupon query service."""

    def search_coupons(self, request: CouponSearchRequest) -> list[CouponOffer]:
        """Return offers in database/repository order."""


class CouponQueryService:
    """Coordinate coupon search without applying MCP-specific behavior."""

    def __init__(self, repository: CouponSearchRepository) -> None:
        self._repository = repository

    def search_coupons(self, request: CouponSearchRequest) -> CouponSearchResponse:
        offers = self._repository.search_coupons(request)
        return CouponSearchResponse.from_request(request=request, offers=offers)
