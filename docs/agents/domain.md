# Domain Docs

How engineering agents should consume this repo's domain documentation.

## Before exploring, read these

- `CONTEXT.md` at the repo root.
- Relevant ADRs in `docs/adr/`.
- The nearest service README before editing service code.

If a file does not exist yet, proceed silently and use the next available source
of context.

## Current layout

This repo currently uses a single root context:

```text
/
├── CONTEXT.md
├── docs/adr/
└── services/
    ├── etl/
    └── mcp-app/
```

## Use the glossary's vocabulary

When output names a domain concept, use the term as defined in `CONTEXT.md`.
If the concept is missing, note the gap instead of inventing competing language.

## Flag ADR conflicts

If a proposed change contradicts an ADR, surface the conflict explicitly before
implementing it.

