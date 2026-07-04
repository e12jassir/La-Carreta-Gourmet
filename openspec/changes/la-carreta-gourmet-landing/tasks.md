# Tasks: La Carreta Gourmet Landing

## Review Workload Forecast

Estimated changed lines: ~950
New files: 2
Modified files: 1
Chained PRs recommended: Yes
Suggested split: PR 1 foundation+chrome+hero+about; PR 2 menu+reviews; PR 3 visit/footer+motion+responsive+preflight

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

- PR 1: Foundation, HTML cleanup, chrome, hero, about (base: main)
- PR 2: Menu filter/glass cards, reviews carousel (base: PR 1)
- PR 3: Motion, responsive, visit/footer, pre-flight (base: PR 2)

## Phase 1: Foundation and HTML

- [x] **TASK-001: Design tokens and reset (`styles.css`)**: add custom properties per design.md; base typography; contrast >=4.5:1 (REQ-CHROME-005). `feat(css): design tokens and reset`

- [x] **TASK-002: Clean up `index.html`**: remove non-hero kickers (REQ-HERO-004, REQ-STORY-003); align CTAs to "Ver Menú" / "Reserva tu mesa" (REQ-HERO-003); add image sizes (REQ-CHROME-010); add reveal/stagger hooks. `refactor(html): remove non-hero kickers and align CTAs`

## Phase 2: Global chrome

- [x] **TASK-003: Skip-link and sticky nav (`styles.css`)**: skip-link on focus, sticky nav, desktop links, burger >=768px, 44x44 tap area (REQ-CHROME-001, REQ-CHROME-002). `feat(css): skip-link and sticky nav`

- [x] **TASK-004: Mobile menu (`script.js`, `styles.css`, `index.html`)**: toggle `aria-expanded`/`hidden`, focus trap, close on Escape/click outside/anchor (REQ-CHROME-002). `feat(js): accessible mobile menu`

- [x] **TASK-005: Smooth scroll and footer (`script.js`, `styles.css`, `index.html`)**: anchor scroll with nav offset, reduced motion (REQ-CHROME-011); footer brand, 4 links, Instagram icon, dynamic year (REQ-CHROME-003). `feat: smooth scroll and footer`

## Phase 3: Sections

- [x] **TASK-006: Hero section (`styles.css`)**: full-viewport bg with scrim/grain, Playfair title with `<em>`, ghost "Ver Menú" and gold "Reserva tu mesa" CTAs, rating block (REQ-HERO-001..003). `feat(css): hero section`

- [x] **TASK-007: About section (`styles.css`)**: 2-col >=768px / 1-col below, framed photo with seal, stats strip, 2 paragraphs no em-dash (REQ-STORY-001, REQ-STORY-002). `feat(css): about section`

- [x] **TASK-008: Menu filter and glass cards (`styles.css`, `script.js`)**: glass only on `.dish.glass` (1px border, no shadow), tab filter with `aria-selected`, empty state, 12 dishes in 3 categories, tags (REQ-MENU-001..003). `feat: menu filter and glass cards`

- [x] **TASK-009: Star ratings (`script.js`, `styles.css`)**: render `[data-rating]` to SVG stars, support 4.5, no emoji (REQ-HERO-001, REQ-REVIEWS-001). `feat(js): star ratings`

- [x] **TASK-010: Reviews carousel (`styles.css`, `script.js`)**: horizontal scroll-snap track, 3 reviews, prev/next disabled at bounds, keyboard nav, no scroll cues (REQ-REVIEWS-001..004). `feat: reviews carousel`

- [x] **TASK-011: Visit section (`styles.css`)**: 2-col grid, hours dl, price "$40.000 - $60.000 COP por persona", Instagram CTA, 7-day hours card with status dot (REQ-VISIT-001..003). `feat(css): visit section`

## Phase 4: Motion, responsive and pre-flight

- [x] **TASK-012: Scroll reveal (`script.js`, `styles.css`)**: IntersectionObserver toggles `.is-visible`, stagger 50ms via `--stagger-index`, reduced-motion instant visible (REQ-CHROME-007, REQ-MENU-004). `feat(js): scroll reveal system`

- [x] **TASK-013: Responsive breakpoints (`styles.css`)**: mobile-first queries at 768/1024/1440; collapse hero/about/visit to 1 col, menu 1->2->3, no horizontal scroll at 375px (REQ-CHROME-008). `feat(css): responsive breakpoints`

- [x] **TASK-014: Pre-flight and final verification (`index.html`, `styles.css`, `script.js`)**: run anti-slop matrix (em-dash grep, kickers, glass scope, border+shadow, radius, contrast, picsum seeds, image sizes) (REQ-CHROME-006, REQ-CHROME-009, REQ-CHROME-010); verify all sections, filter, carousel, mobile menu, skip-link, Lighthouse LCP <2.5s, CLS <0.1. `chore: pre-flight and final verification`
