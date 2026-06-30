import type { FAQ } from "@/lib/data/types";

interface MerchantFAQProps {
  merchantName: string;
  faq: FAQ[];
}

export function MerchantFAQ({ merchantName, faq }: MerchantFAQProps) {
  if (faq.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="merchant-faq-heading" className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h2 id="merchant-faq-heading" className="text-2xl font-semibold text-zinc-900">
        {merchantName} coupon FAQ
      </h2>
      <dl className="mt-6 space-y-5">
        {faq.map((item) => (
          <div key={item.question}>
            <dt className="text-base font-medium text-zinc-900">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-600">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
