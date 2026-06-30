# Coupon Now

Coupon Now is an MCP app for coupon discovery. The goal is to let AI clients
such as ChatGPT and Claude surface relevant discounts when a user directly asks
for coupons or shows shopping intent during a conversation.

This repository is a Python monorepo managed with `uv`.

## Subprojects

- `apps/web`: Next.js coupon search website for affiliate approval and public
  coupon discovery.
- `services/etl`: ingestion pipelines for coupons, affiliate links, merchant
  feeds, and provider-specific normalization.
- `services/mcp-app`: FastMCP application that exposes coupon search tools,
  resources, prompts, and other AI-client-facing capabilities.

## Principles

- Keep the system simple until real requirements force complexity.
- Separate ingestion, storage, ranking, and MCP presentation concerns.
- Prefer clear, local code over premature shared abstractions.
- Make agent-facing context explicit in docs and ADRs.
- Ask before changing product direction, data contracts, infrastructure, or
  cross-service boundaries.

## Local setup

```bash
uv sync
docker compose up -d postgres
```

The repo targets Python 3.14. Python does not use an LTS label in the same way
some ecosystems do; Python 3.14 is the latest stable bugfix branch at project
setup time. The latest official patch release at setup time is Python 3.14.6.

## Repo map

```text
.
├── AGENTS.md
├── apps/
│   └── web/
├── CONTEXT.md
├── docs/
│   ├── adr/
│   ├── agents/
│   └── project/
├── infra/
│   └── postgres/
└── services/
    ├── etl/
    └── mcp-app/
```
