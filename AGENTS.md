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

- Use Python 3.13 for new code.
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

## Cursor Cloud specific instructions

This is a `uv`-managed Python 3.13 monorepo. Standard commands live in
`README.md` and `pyproject.toml`; the notes below are the non-obvious caveats.

- Installing dependencies: plain `uv sync` (the README command) only installs
  the root `dev` group (`pytest`, `ruff`) because the root project is
  `package = false` and has no dependencies. It does NOT install the service
  deps (`fastmcp`, `psycopg`, `pydantic`). To get everything, use
  `uv sync --all-packages --no-install-workspace`.
- Do not run `uv sync --all-packages` without `--no-install-workspace`: it tries
  to build wheels for the workspace members and fails on `mcp-app` because the
  source dir `services/mcp-app/src/coupon_now_mcp` does not match the project
  name `coupon-now-mcp-app` (hatchling: "Unable to determine which files to
  ship"). Building the wheels is unnecessary anyway — see the next point.
- Imports without installed wheels: tests resolve packages via
  `[tool.pytest.ini_options].pythonpath` in `pyproject.toml`, so `uv run pytest`
  works without building/installing the service packages. To run an ad-hoc
  script against a service package, set e.g.
  `PYTHONPATH=services/mcp-app/src` (or `services/etl/src`).
- Lint/format: `uv run ruff check .` passes. `uv run ruff format --check .`
  currently reports the committed source files as unformatted (pre-existing);
  do not treat that as an environment problem.
- Postgres (optional infra, currently unused by code): the Docker daemon is not
  running by default — start it with `sudo dockerd &`. The committed
  `docker compose up -d postgres` FAILS because `compose.yaml` mounts the volume
  at the legacy path `/var/lib/postgresql/data`, which `postgres:18-alpine`
  rejects. Workaround without editing compose: add `PGDATA=/var/lib/postgresql/data/pgdata`
  to the container env (e.g. `docker run -e PGDATA=/var/lib/postgresql/data/pgdata ...`).
- The MCP app has no server entrypoint yet (the package only exposes
  `__version__`). The product is built on FastMCP; a tool call exercised via the
  in-memory `fastmcp.Client` is the smallest end-to-end check of the stack.

