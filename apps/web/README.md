# Coupon Now

Coupon Now is a search-first coupon discovery website — "Google for Coupons."

## Local development

```bash
cd apps/web
npm install
npm run generate:fixtures   # optional: regenerate mock data
npm run dev
```

Open http://localhost:3000.

## Mock data

The app uses local JSON fixtures in `src/fixtures/`:

- `merchants.json` — 250 merchants
- `coupons.json` — 900+ coupons
- `categories.json` — 22 categories

Regenerate fixtures:

```bash
npm run generate:fixtures
```

All pages read data through `src/lib/data/index.ts`, which is the single integration seam for a future FastAPI backend.

## Future API integration

When the FastAPI service is ready, set `NEXT_PUBLIC_API_URL` and update `src/lib/data/index.ts` to fetch from:

- `GET /search?q=`
- `GET /merchants/{slug}`
- `GET /coupons/latest`
- `GET /categories`

Pages and components should remain unchanged.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, and robots.txt |
| `NEXT_PUBLIC_API_URL` | Future FastAPI base URL (not required for mock phase) |

## Deployment (Vercel)

1. Create a Vercel project with root directory `apps/web`.
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
3. Deploy — SSL is handled by Vercel.

`vercel.json` is included for monorepo root-directory deployment.

## Routes

- `/` — Homepage with search and latest coupon feed
- `/search?q=` — Merchant and coupon search
- `/merchant/[slug]` — Merchant detail page
- `/about`, `/contact`, `/privacy`, `/terms`, `/disclosure` — Static pages
- `/sitemap.xml`, `/robots.txt` — SEO assets
- `/llms.txt`, `/llms-full.txt` — LLM discovery files
