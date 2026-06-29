# ADR 0001: Initial Monorepo Shape

## Status

Accepted

## Context

Coupon Now needs two related Python subprojects: an ETL pipeline for coupon and
affiliate ingestion, and an MCP app for AI-client-facing coupon search. The
project is new, so the repository should optimize for clarity, low ceremony, and
agent-friendly navigation.

## Decision

- Use a single Python monorepo managed by `uv`.
- Target Python 3.13 at setup time.
- Place the two initial subprojects under `services/etl` and
  `services/mcp-app`.
- Use Postgres as the initial database.
- Avoid a shared package until duplication or a stable cross-service contract
  makes one worthwhile.

## Consequences

- Dependency resolution is shared through one workspace.
- Each service keeps its own package metadata and tests.
- Cross-service contracts must be documented before code starts depending on
  them.
- Adding providers or MCP tools should not require changing unrelated layers.

