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
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold text-[var(--foreground)]">Coupon Now</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">
              Search merchants, discover verified promo codes, and save at checkout with
              clear affiliate-supported store links.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid gap-2 text-sm text-[var(--muted-foreground)] sm:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--foreground)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-xs text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} Coupon Now. Coupon availability and terms may change.
        </p>
      </div>
    </footer>
  );
}
