from sqlmodel import Session, SQLModel, create_engine

from coupon_now_mcp.schemas import CouponSearchRequest
from coupon_now_mcp.storage.models import Merchant, Offer
from coupon_now_mcp.storage.repositories import CouponOfferRepository


def build_session() -> Session:
    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)
    return Session(engine)


def seed_offers(session: Session) -> None:
    acme = Merchant(id=1, name="Acme", slug="acme")
    beta = Merchant(id=2, name="Beta", slug="beta")
    session.add(acme)
    session.add(beta)
    session.add(
        Offer(
            id=1,
            merchant_id=1,
            title="10% off running shoes",
            code="RUN10",
            discount_summary="10% off",
            category="shoes",
            affiliate_url="https://example.com/acme",
            terms="Online only",
            freshness_note="Recently verified",
        )
    )
    session.add(
        Offer(
            id=2,
            merchant_id=2,
            title="20% off trail gear",
            code="TRAIL20",
            discount_summary="20% off",
            category="outdoors",
        )
    )
    session.add(
        Offer(
            id=3,
            merchant_id=1,
            title="Expired inactive deal",
            category="shoes",
            is_active=False,
        )
    )
    session.commit()


def test_repository_searches_active_offers_by_merchant() -> None:
    with build_session() as session:
        seed_offers(session)
        repository = CouponOfferRepository(session)

        offers = repository.search_coupons(CouponSearchRequest(merchant="Acme"))

    assert [offer.id for offer in offers] == [1]
    assert offers[0].merchant_name == "Acme"
    assert offers[0].code == "RUN10"


def test_repository_searches_by_query_and_category() -> None:
    with build_session() as session:
        seed_offers(session)
        repository = CouponOfferRepository(session)

        offers = repository.search_coupons(CouponSearchRequest(query="trail", category="outdoors"))

    assert [offer.id for offer in offers] == [2]


def test_repository_returns_empty_list_when_no_rows_match() -> None:
    with build_session() as session:
        seed_offers(session)
        repository = CouponOfferRepository(session)

        offers = repository.search_coupons(CouponSearchRequest(query="not present"))

    assert offers == []
