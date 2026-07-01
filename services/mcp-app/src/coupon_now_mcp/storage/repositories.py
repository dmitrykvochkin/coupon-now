"""Query-side repositories for coupon search."""

from __future__ import annotations

from sqlalchemy import or_
from sqlmodel import Session, select

from coupon_now_mcp.schemas import CouponOffer, CouponSearchRequest
from coupon_now_mcp.storage.models import Merchant, Offer


class CouponOfferRepository:
    """Read normalized coupon offers from the database."""

    def __init__(self, session: Session) -> None:
        self._session = session

    def search_coupons(self, request: CouponSearchRequest) -> list[CouponOffer]:
        statement = (
            select(Offer, Merchant.name)
            .join(Merchant, Offer.merchant_id == Merchant.id)
            .where(Offer.is_active.is_(True))
            .limit(request.limit)
        )

        if request.merchant is not None:
            statement = statement.where(Merchant.name.ilike(self._contains(request.merchant)))

        if request.category is not None:
            statement = statement.where(Offer.category.ilike(self._contains(request.category)))

        if request.query is not None:
            query_pattern = self._contains(request.query)
            statement = statement.where(
                or_(
                    Merchant.name.ilike(query_pattern),
                    Offer.title.ilike(query_pattern),
                    Offer.code.ilike(query_pattern),
                    Offer.discount_summary.ilike(query_pattern),
                    Offer.terms.ilike(query_pattern),
                )
            )

        rows = self._session.exec(statement).all()
        return [
            self._to_coupon_offer(offer=offer, merchant_name=merchant_name)
            for offer, merchant_name in rows
        ]

    @staticmethod
    def _contains(value: str) -> str:
        return f"%{value}%"

    @staticmethod
    def _to_coupon_offer(offer: Offer, merchant_name: str) -> CouponOffer:
        if offer.id is None:
            message = "Persisted offers must have an id."
            raise ValueError(message)

        return CouponOffer(
            id=offer.id,
            merchant_name=merchant_name,
            title=offer.title,
            code=offer.code,
            discount_summary=offer.discount_summary,
            category=offer.category,
            affiliate_url=offer.affiliate_url,
            terms=offer.terms,
            expires_at=offer.expires_at,
            freshness_note=offer.freshness_note,
        )
