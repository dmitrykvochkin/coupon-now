# Frontend Design Guidelines

## Objective

Build a premium B2B SaaS interface inspired by Harvey AI's minimalism while
adopting the warm visual identity of PostHog.

## Core principles

- `shadcn/ui` is the design system.
- Magic UI is used only for subtle marketing enhancements.
- Prefer clarity over decoration.
- Every component should have a purpose.
- Optimize for speed, accessibility, SEO, and LLM discoverability.

## Component strategy

### `shadcn/ui` foundation

Use `shadcn/ui` for application components:

- Buttons
- Inputs
- Cards
- Dialogs
- Navigation
- Tables
- Forms
- Tabs
- Sheets
- Badges

Never replace a perfectly good `shadcn/ui` component with a more decorative
alternative.

### Magic UI enhancements

Use Magic UI only for:

- Hero backgrounds
- Animated gradient text
- Logo marquee
- Soft glow effects
- Background beams

Target an 80% `shadcn/ui` and 20% Magic UI ratio. Avoid animations inside
dashboards or forms.

## Design tokens

Use these PostHog-inspired tokens by default:

```css
--background: #fff7ed;
--foreground: #1c1917;

--card: #ffffff;
--card-foreground: #1c1917;

--primary: #f54e00;
--primary-foreground: #ffffff;

--secondary: #fed7aa;
--secondary-foreground: #431407;

--muted: #f5f5f4;
--muted-foreground: #57534e;

--accent: #fdba74;
--border: #e7e5e4;
--ring: #f54e00;

--radius: 0.75rem;
```

Use warm neutral backgrounds, reserve orange for primary actions, avoid more
than one accent color, and prefer subtle borders over heavy shadows.

## Typography

- Primary font: Geist
- Fallbacks: Inter, `ui-sans-serif`, `system-ui`
- Hero: 56-72px
- Section heading: 36-48px
- H2: 30-36px
- H3: 24px
- Body: 16-18px
- Small text: 14px

Prefer larger headings with fewer words. Keep content widths under 70
characters. Use 1.1-1.2 line-height for headings and 1.6 for body text. Never
justify text.

## Responsive layout

Breakpoints:

- Mobile: less than 640px
- Tablet: 640-1023px
- Desktop: 1024-1439px
- Wide: 1440px and up

Rules:

- Develop mobile first.
- Use single-column layouts on mobile.
- Never rely on horizontal scrolling.
- Keep navigation shallow.
- Use a 1280px max content width.
- Use section horizontal padding of 24px mobile, 32px tablet, and 48px desktop.
- Keep button touch targets at least 44px high.

## Motion

Use subtle fade, small translate, gentle glow, and slow marquee motion only.
Avoid bounce, spin, large parallax, and flashing effects.

## SEO

Every page should include a unique title, unique meta description, canonical
URL, Open Graph tags, and Twitter Card tags.

Use semantic HTML with one `h1`, logical `h2`/`h3` hierarchy, `header`, `main`,
`nav`, `section`, `article`, and `footer` where appropriate.

Always add descriptive alt text, lazy-load below-the-fold images, optimize Core
Web Vitals, and prefer server-rendered content for important pages.

## LLM optimization

- Every page should answer one primary topic clearly.
- Use descriptive headings instead of clever marketing copy.
- Explain concepts in plain language before adding marketing language.
- Include concise summaries near the top of long pages.
- Use structured lists and comparison tables where appropriate.
- Give products, features, and concepts stable names.
- Keep URLs descriptive and human-readable.
- Add FAQ sections for important pages.
- Prefer complete sentences over keyword stuffing.
- Ensure important content exists in HTML rather than only in client-side
  interactions.

## AI agent instructions

When generating UI:

1. Use `shadcn/ui` by default.
2. Add Magic UI only when it improves perceived quality.
3. Maintain generous whitespace.
4. Prefer fewer components.
5. Keep layouts visually calm.
6. Use the design tokens above.
7. Follow responsive rules.
8. Generate semantic HTML.
9. Optimize every page for SEO and LLM discoverability.
10. If uncertain, choose the simpler implementation.
