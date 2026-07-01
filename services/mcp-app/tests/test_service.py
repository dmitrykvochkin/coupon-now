from coupon_now_mcp.schemas import CouponOffer, CouponSearchRequest
from coupon_now_mcp.service import CouponQueryService


class StubRepository:
    def __init__(self, offers: list[CouponOffer]) -> None:
        self.offers = offers

    def search_coupons(self, request: CouponSearchRequest) -> list[CouponOffer]:
        return self.offers


def test_query_service_preserves_repository_order() -> None:
    first = CouponOffer(id=2, merchant_name="Beta", title="Second DB result")
    second = CouponOffer(id=1, merchant_name="Acme", title="First DB result")
    request = CouponSearchRequest(query="coupon")
    service = CouponQueryService(StubRepository([first, second]))

    response = service.search_coupons(request)

    assert response.count == 2
    assert response.offers == [first, second]
