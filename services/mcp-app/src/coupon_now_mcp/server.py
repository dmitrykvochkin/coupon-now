"""FastMCP server entrypoint for Coupon Now."""

from __future__ import annotations

from fastmcp import FastMCP

from coupon_now_mcp.prompts import register_coupon_prompts
from coupon_now_mcp.tools import register_coupon_tools


def create_server() -> FastMCP:
    """Create and configure the Coupon Now MCP server."""
    server = FastMCP("Coupon Now")
    register_coupon_tools(server)
    register_coupon_prompts(server)
    return server


mcp = create_server()


def main() -> None:
    """Run the server with FastMCP's default transport."""
    mcp.run()


if __name__ == "__main__":
    main()
