# Postgres

Local Postgres is defined in `compose.yaml`.

```bash
docker compose up -d postgres
```

Default local connection:

```text
postgresql://coupon_now:coupon_now@localhost:5432/coupon_now
```

Keep schema migrations near the service or migration tool that owns them once
the migration approach is chosen.

