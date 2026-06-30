import asyncio
from pathlib import Path
from typing import Any

from fastmcp import Client
from sqlmodel import Session, SQLModel, create_engine

from coupon_now_mcp.config import DATABASE_URL_ENV_VAR, get_settings
from coupon_now_mcp.server import mcp
from coupon_now_mcp.storage.database import get_engine
from coupon_now_mcp.storage.models import Merchant, Offer


def seed_database(database_url: str) -> None:
    engine = create_engine(database_url)
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        session.add(Merchant(id=1, name="Acme", slug="acme"))
        session.add(
            Offer(
                id=1,
                merchant_id=1,
                title="15% off sitewide",
                code="SAVE15",
                discount_summary="15% off",
                category="general",
                affiliate_url="https://example.com/acme",
            )
        )
        session.commit()


def test_server_registers_coupon_tool_and_prompt() -> None:
    async def list_components() -> tuple[set[str], set[str]]:
        async with Client(mcp) as client:
            tools = await client.list_tools()
            prompts = await client.list_prompts()
            return {tool.name for tool in tools}, {prompt.name for prompt in prompts}

    tool_names, prompt_names = asyncio.run(list_components())

    assert "search_coupons" in tool_names
    assert "coupon_search_guidance" in prompt_names


def test_search_coupons_tool_reads_database(tmp_path: Path, monkeypatch: Any) -> None:
    database_url = f"sqlite:///{tmp_path / 'coupon-now.db'}"
    seed_database(database_url)
    monkeypatch.setenv(DATABASE_URL_ENV_VAR, database_url)
    get_settings.cache_clear()
    get_engine.cache_clear()

    async def call_search_tool() -> dict[str, Any]:
        async with Client(mcp) as client:
            result = await client.call_tool("search_coupons", {"merchant": "Acme"})
            assert isinstance(result.data, dict)
            return result.data

    data = asyncio.run(call_search_tool())

    assert data["count"] == 1
    assert data["offers"][0]["merchant_name"] == "Acme"
    assert data["offers"][0]["code"] == "SAVE15"
