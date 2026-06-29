# ETL Service

Owns ingestion and normalization of coupons, affiliate links, merchant data, and
provider metadata.

## Responsibilities

- Provider adapters for feed-specific parsing and authentication.
- Pipeline orchestration for imports, validation, and freshness checks.
- Normalization into the shared database model.
- ETL-specific tests and fixtures.

## Non-responsibilities

- MCP tool definitions.
- AI-client wording or prompt behavior.
- Coupon ranking presentation rules beyond raw data quality signals.

