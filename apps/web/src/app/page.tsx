import type { Metadata } from "next";
import { CouponFeed } from "@/components/CouponFeed";
import { JsonLd } from "@/components/JsonLd";
import { SearchBar } from "@/components/SearchBar";
import { getLatestCoupons } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Coupon Now — Verified Coupon Search for AI Shopping",
  description:
    "Search verified coupon codes, merchant offers, and affiliate-supported store links with clear expiry dates and simple savings guidance.",
  path: "/",
});

const valueCards = [
  {
    title: "Verified coupon search",
    description:
      "Find active promo codes by merchant, product category, or coupon keyword before checkout.",
  },
  {
    title: "Clear offer context",
    description:
      "See discount values, expiration dates, and merchant details without sorting through noisy results.",
  },
  {
    title: "AI-client ready",
    description:
      "Coupon Now is structured for shopping assistants that need reliable coupon discovery.",
  },
];

const steps = [
  "Search for a merchant or coupon keyword.",
  "Compare active offers with clear expiry dates.",
  "Copy the code or visit the store through an affiliate-supported link.",
];

const faq = [
  {
    question: "What is Coupon Now?",
    answer:
      "Coupon Now is a coupon discovery site for finding verified promo codes, merchant offers, and affiliate-supported store links.",
  },
  {
    question: "How does Coupon Now help AI shopping assistants?",
    answer:
      "Coupon Now keeps coupon information in structured HTML so AI clients can understand merchant names, discount details, expiration dates, and shopping intent.",
  },
  {
    question: "Do coupon terms change?",
    answer:
      "Yes. Coupon availability, eligibility, and expiration dates can change, so shoppers should confirm terms at checkout.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Coupon Now",
  url: getSiteUrl(),
  potentialAction: {
    "@type": "SearchAction",
    target: `${getSiteUrl()}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  const coupons = await getLatestCoupons(12);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:py-16 lg:px-12">
      <JsonLd data={[websiteJsonLd, faqJsonLd]} />
      <section className="relative overflow-hidden rounded-[calc(var(--radius)*2)] border border-[var(--border)] bg-[var(--card)] px-6 py-14 md:px-12 md:py-20">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[var(--accent)] opacity-20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
              Coupon discovery for modern shopping
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
              Find verified coupon codes before checkout.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
              Coupon Now helps shoppers and AI assistants search active promo codes, compare
              merchant offers, and understand coupon terms in plain language.
            </p>
            <div className="mt-8 max-w-2xl">
              <SearchBar variant="hero" />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">
              Search by merchant, coupon code, or shopping category. Results include clear
              expiration dates and affiliate-supported store links.
            </p>
          </div>

          <aside
            aria-label="Coupon Now summary"
            className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted)] p-6"
          >
            <p className="text-sm font-medium text-[var(--muted-foreground)]">Today on Coupon Now</p>
            <dl className="mt-6 grid gap-4">
              <div className="rounded-[var(--radius)] bg-[var(--card)] p-4">
                <dt className="text-sm text-[var(--muted-foreground)]">Active coupon feed</dt>
                <dd className="mt-1 text-3xl font-semibold text-[var(--foreground)]">
                  {coupons.length}
                </dd>
              </div>
              <div className="rounded-[var(--radius)] bg-[var(--card)] p-4">
                <dt className="text-sm text-[var(--muted-foreground)]">Primary action</dt>
                <dd className="mt-1 text-base font-semibold text-[var(--foreground)]">
                  Search, copy, save
                </dd>
              </div>
              <div className="rounded-[var(--radius)] bg-[var(--card)] p-4">
                <dt className="text-sm text-[var(--muted-foreground)]">Designed for</dt>
                <dd className="mt-1 text-base font-semibold text-[var(--foreground)]">
                  Shoppers and AI clients
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section aria-labelledby="coupon-now-summary-heading" className="py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            Plain-language summary
          </p>
          <h2
            id="coupon-now-summary-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
          >
            Coupon Now makes coupon search easier to trust.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted-foreground)]">
            The homepage focuses on one task: helping people and AI shopping assistants find
            relevant coupons quickly. Every offer is presented with stable merchant names,
            readable discount text, and clear next steps.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {card.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-it-works-heading" className="grid gap-8 py-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
          >
            Three steps from search to savings.
          </h2>
        </div>
        <ol className="grid gap-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-5 text-base leading-7 text-[var(--muted-foreground)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-sm font-semibold text-[var(--secondary-foreground)]">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="comparison-heading" className="py-10">
        <div className="max-w-3xl">
          <h2
            id="comparison-heading"
            className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
          >
            Built for clarity, not coupon clutter.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">
            Coupon Now keeps important shopping information in readable HTML for people,
            search engines, and AI assistants.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--muted)] text-[var(--foreground)]">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Need
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Coupon Now approach
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--muted-foreground)]">
              <tr>
                <td className="px-5 py-4 font-medium text-[var(--foreground)]">Fast search</td>
                <td className="px-5 py-4">Merchant and coupon keyword search from the hero.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-[var(--foreground)]">Offer trust</td>
                <td className="px-5 py-4">Discount text, code, merchant, and expiry date shown together.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-[var(--foreground)]">AI readability</td>
                <td className="px-5 py-4">Semantic sections, descriptive headings, FAQ, and schema data.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="py-10">
        <CouponFeed coupons={coupons} title="Latest verified coupon feed" />
      </div>

      <section aria-labelledby="faq-heading" className="py-16">
        <div className="max-w-3xl">
          <h2
            id="faq-heading"
            className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
          >
            Coupon Now FAQ
          </h2>
          <div className="mt-6 divide-y divide-[var(--border)] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            {faq.map((item) => (
              <article key={item.question} className="p-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.question}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
