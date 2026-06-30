import pytest
from coupon_now_mcp.schemas import CouponSearchRequest
from pydantic import ValidationError


def test_search_request_requires_a_search_term() -> None:
    with pytest.raises(ValidationError, match="At least one"):
        CouponSearchRequest()


def test_search_request_strips_text_and_keeps_limit() -> None:
    request = CouponSearchRequest(query="  shoes  ", limit=3)

    assert request.query == "shoes"
    assert request.limit == 3


def test_search_request_rejects_invalid_limit() -> None:
    with pytest.raises(ValidationError):
        CouponSearchRequest(merchant="Acme", limit=0)
