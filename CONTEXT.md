# Coupon Now Context

## Mission

Coupon Now helps AI clients find relevant discounts while users shop or ask for
coupons. The product should feel useful, trustworthy, and unobtrusive: surface
deals when there is shopping intent, avoid noisy results, and make it clear when
a coupon may be conditional or expired.

## Business goal

Build an MCP app that users can add to AI clients such as ChatGPT or Claude. The
app should expose coupon search capabilities that help users save money and
generate affiliate revenue when appropriate.

## System shape

- ETL ingests coupons and affiliate links from provider feeds.
- Postgres stores normalized merchants, offers, provider metadata, and
  freshness signals.
- The MCP app exposes AI-client-facing tools, resources, and prompts backed by
  the normalized coupon data.

## Glossary

- AI client: A product such as ChatGPT or Claude that can connect to an MCP app.
- Affiliate link: A monetized URL for a merchant or offer.
- Coupon: A discount code, promotion, sale, or offer surfaced to a user.
- Merchant: A store, brand, marketplace seller, or service that can have offers.
- Offer: A normalized coupon-like record that may include a code, discount,
  merchant, URL, expiry, and terms.
- Provider: A source of coupons or affiliate links.
- Shopping intent: A user signal that they may be evaluating or purchasing a
  product, service, merchant, or category.

## Boundaries

- Provider-specific parsing belongs in ETL provider adapters.
- Coupon search presentation belongs in the MCP app.
- Database access should be behind small repository/query modules, not scattered
  through tools or parsers.
- Ranking and eligibility rules should be isolated from MCP transport details.

## Open decisions

- Initial coupon providers and affiliate networks.
- Canonical offer schema and freshness rules.
- MCP tool names, descriptions, and safety behavior.
- Ranking strategy for competing offers.
- Deployment target and scheduling model for ETL.

