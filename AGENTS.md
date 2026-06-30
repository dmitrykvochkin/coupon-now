# Agent Instructions

## Start here

Read these files before making non-trivial changes:

1. `README.md` for the project overview.
2. `CONTEXT.md` for domain language and boundaries.
3. `docs/adr/` for architectural decisions that may constrain the work.
4. The nearest service README before editing code inside a service.

## Project summary

Coupon Now provides coupon discovery to AI clients through an MCP app. The ETL
service owns ingestion and normalization of coupons and affiliate links. The MCP
app owns the AI-client interface and should not contain provider-specific feed
logic.

## Engineering values

- Prefer KISS and YAGNI. Build the smallest thing that satisfies the current
  need.
- Keep responsibilities explicit. ETL ingests and normalizes; storage persists;
  MCP presentation exposes safe, useful capabilities to clients.
- Use DRY when duplication has become meaningful. Use WET when repetition keeps
  early code clearer.
- Follow SOLID as a design pressure, not as a reason to add abstractions early.
- Keep business logic separate from provider adapters, database access, and MCP
  transport code.
- Ask when product behavior, data contracts, provider strategy, or public MCP
  surface area is unclear. Offer 2-3 options with a recommendation.

## Python and tooling

- Use Python 3.14 for new code.
- Use `uv` for dependency management and workspace commands.
- Use `ruff` for formatting and linting.
- Use `pytest` for tests.
- Prefer typed, boring Python modules with small functions and explicit data
  models.

## Monorepo boundaries

- `services/etl` may depend on provider SDKs, feed parsers, and ingestion
  scheduling code.
- `services/mcp-app` may depend on FastMCP and query/read models needed for the
  public MCP interface.
- Do not introduce a shared package until both services have a real, stable
  need for the same code.
- Keep database schema changes in a clearly named migration area when migrations
  are introduced.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default triage label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This repo currently uses a single root domain context. See
`docs/agents/domain.md`.
