# Proposal: La Carreta Gourmet Landing

> **Design Read**: Reading this as: single-page gourmet restaurant landing for upscale Colombian/Latin coastal diners, with rustic-elegant warm-dark language, leaning toward editorial-typographic-with-glassmorphism-accents.

**Design Dials**:
- **DESIGN_VARIANCE: 6** (balanced/modern). Rustic-elegant needs controlled asymmetry in the About 2-column layout and menu grid rhythm, but not experimental. The brand is welcoming, not avant-garde.
- **MOTION_INTENSITY: 7** (standard scroll/stagger). Fade-in on scroll and smooth scroll are explicit requirements. Staggered menu card reveals and review carousel transitions justify this level. All motion respects `prefers-reduced-motion`.
- **VISUAL_DENSITY: 4** (airy for premium feel). Upscale dining demands generous whitespace. The dark palette (#1a1410 base) needs breathing room to avoid feeling oppressive. Content density stays low per section.

## Intent

Build a production-quality single-page website for La Carreta Gourmet that converts visitors into diners. The restaurant has strong real-world reputation (4.5 stars, 645 reviews) but no digital presence matching its quality. The site must feel like walking into the restaurant: warm wood, golden light, refined but welcoming.

## Scope

### In Scope
- Hero section with full-viewport background, serif headline, rating badge, dual CTA
- About section with 2-column layout (story + ambient photo)
- Menu section with filterable glassmorphism card grid (3 categories, 12 dishes)
- Reviews carousel with star ratings and 3 real customer quotes
- Hours and Info section with schedule, price range, Instagram CTA
- Footer with brand, nav links, Instagram icon
- Smooth scroll navigation, fade-in scroll animations, mobile-first responsive
- Mobile hamburger menu with accessible toggle

### Out of Scope
- Reservations backend or form submission
- Online ordering or payment integration
- CMS or content management
- i18n language switcher
- Blog or events section
- Multi-page navigation

## Capabilities

> Contract between proposal and specs phases.

### New Capabilities
- `landing-hero`: Full-viewport hero with background image, brand headline, rating badge, and dual CTA
- `brand-story`: Two-column about section with narrative copy and ambient photography
- `menu-catalog`: Filterable dish catalog with glassmorphism cards, section tabs, and hover states
- `customer-reviews`: Horizontal carousel with star ratings, blockquotes, and navigation controls
- `visit-info`: Schedule display, price range, and reservation CTA via Instagram
- `site-chrome`: Sticky nav with mobile hamburger, skip-link, and minimal footer

### Modified Capabilities
None (no existing specs in `openspec/specs/`).

## Approach

Pure HTML + CSS + vanilla JS, no build step. The existing `index.html` draft serves as structural reference and will be superseded.

**Color system**: deep charcoal `#1a1410` (base), warm gold `#c9922a` (accent), cream `#f5efe6` (text on dark). One accent locked across all sections.

**Typography**: Playfair Display (headings, serif) + Inter (body, sans). Scale ratio >= 1.25 between steps. `text-wrap: balance` on headings.

**Glassmorphism**: applied ONLY to menu dish cards (purposeful, not decorative default). `backdrop-filter: blur()` with semi-transparent background, single border, no shadow pairing.

**Motion**: IntersectionObserver for fade-in reveals. CSS transitions only (transform + opacity). Custom ease-out curve `cubic-bezier(0.23, 1, 0.32, 1)`. Stagger 50ms per card. `prefers-reduced-motion: reduce` disables all transforms.

**Images**: `picsum.photos` with descriptive seeds as placeholders. `loading="lazy"` below fold, explicit `width`/`height` to prevent CLS.

**Responsive**: mobile-first, breakpoints at 375/768/1024/1440. CSS Grid with `auto-fit` for menu. Flexbox for nav and reviews track.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Complete rewrite of all 6 sections with semantic HTML |
| `styles.css` | New | Full stylesheet: tokens, layout, components, motion, responsive |
| `script.js` | New | Smooth scroll, IntersectionObserver reveals, menu filter, carousel, mobile nav |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| AI-slop patterns (gradient text, eyebrow on every section, identical cards) | High | Anti-slop checklist enforced at pre-flight. No em-dashes. No numbered markers. Glassmorphism scoped to menu cards only. |
| Placeholder images feel generic | Med | Use descriptive picsum seeds. Mark image slots for real asset replacement. |
| No test runner for regression | Med | Manual pre-flight matrix. Playwright screenshots at 4 breakpoints as verification. |
| Glassmorphism cards fail contrast on dark bg | Low | Verify card text >= 4.5:1 against glass background. Bump card opacity if needed. |
| Motion causes accessibility issues | Low | `prefers-reduced-motion` mandatory. No motion on keyboard actions. All animations under 300ms for UI. |

## Rollback Plan

Static site with no build step. Rollback = `git checkout` previous commit. The existing `index.html` is already committed, so any rewrite is a new commit that can be reverted cleanly. No database, no state, no deployment pipeline to unwind.

## Dependencies

- Google Fonts CDN (Playfair Display + Inter)
- `picsum.photos` for placeholder images (no real assets available)
- Instagram URL for footer and reservation CTA

## Success Criteria

- [ ] All 6 sections rendered and functional (Hero, About, Menu, Reviews, Hours/Info, Footer)
- [ ] Responsive at 375px, 768px, 1024px, 1440px with no horizontal scroll
- [ ] `prefers-reduced-motion: reduce` disables all transform-based animation
- [ ] Body text contrast >= 4.5:1 on all backgrounds
- [ ] Zero em-dashes in any visible text
- [ ] No AI-slop absolute bans violated (gradient text, side-stripe borders, ghost cards, eyebrow on every section, numbered markers, scroll cues)
- [ ] Menu filter works across 3 categories with smooth transitions
- [ ] Reviews carousel navigable with prev/next controls
- [ ] Mobile hamburger menu opens/closes with proper aria-expanded
- [ ] Skip-link reaches main content
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1

## Skill Usage

| Skill | Applied To |
|-------|-----------|
| `design-taste` | Overall design system, anti-slop enforcement, pre-flight matrix, motion craft rules |
| `ui-ux-pro-max` | Accessibility checks (contrast, touch targets, aria), responsive breakpoints, animation timing |
| `impeccable` | Color strategy (committed dark theme), typography rules, absolute bans, AI slop test |
| `huashu-design` | Placeholder image strategy (picsum seeds), anti-slop content guidelines, Junior Designer flow |
| `_shared` | SDD phase protocol, persistence contract, artifact conventions |
