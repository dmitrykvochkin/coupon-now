"""Prompt registration for coupon discovery guidance."""

from __future__ import annotations

from fastmcp import FastMCP


def register_coupon_prompts(mcp: FastMCP) -> None:
    """Register prompts that guide AI clients during coupon discovery."""

    @mcp.prompt
    def coupon_search_guidance(shopping_context: str) -> str:
        """Guide an AI client on when and how to search for coupons."""
        return (
            "Use Coupon Now when the user explicitly asks for coupons, discounts, "
            "promo codes, or shows clear shopping intent.\n\n"
            f"Shopping context: {shopping_context}\n\n"
            "When calling search_coupons, prefer a merchant name when one is known. "
            "If results are returned, explain that coupon availability, terms, and "
            "expiration can change. If no results are returned, say that no matching "
            "coupon offers were found instead of inventing discounts."
        )
