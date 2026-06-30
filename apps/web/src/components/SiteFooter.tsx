import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclosure", label: "Affiliate Disclosure" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold text-zinc-900">Coupon Now</p>
            <p className="mt-2 max-w-md text-sm text-zinc-600">
              Google for Coupons — search merchants, discover verified promo codes, and save at
              checkout.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-zinc-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Coupon Now. Coupon availability and terms may change.
        </p>
      </div>
    </footer>
  );
}
