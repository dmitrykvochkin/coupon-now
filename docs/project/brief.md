# Project Brief

## One-sentence summary

Coupon Now is an MCP app that helps AI clients find relevant coupons and
affiliate discounts during shopping conversations.

## Product outcome

Users should be able to add Coupon Now to their AI client and receive useful
discount suggestions when they explicitly search for coupons or when their
conversation has clear shopping intent.

## Business outcome

Coupon Now should create value for users through savings and for the business
through affiliate-attributed traffic and conversions.

## Initial scope

- Ingest coupon and affiliate data into Postgres.
- Normalize provider-specific data into a consistent offer model.
- Expose a FastMCP app with coupon search capabilities.
- Keep early architecture small, inspectable, and easy for agents to navigate.

## Out of scope for the first pass

- Multiple databases.
- A separate shared package.
- Complex ranking or personalization.
- Real-time scraping unless a provider requires it and the tradeoff is approved.

