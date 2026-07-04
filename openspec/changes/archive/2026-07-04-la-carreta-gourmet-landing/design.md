# Design: La Carreta Gourmet Landing

## Enfoque tecnico

Landing estatica de una sola pagina, stack puro HTML + CSS + JS vanilla. Tres archivos monoliticos (`index.html`, `styles.css`, `script.js`). El HTML ya existe con estructura semantica solida; el diseno especifica los sistemas de CSS y JS que faltan, mas las modificaciones al HTML existente para cumplir los 29 requisitos del spec.

## Decisiones de arquitectura

| Opcion | Compromiso | Decision |
|--------|-----------|----------|
| 3 archivos monoliticos vs modulos separados | Un solo CSS/JS es mas simple para sitio estatico sin build; modulos anadirian complejidad sin beneficio | **3 archivos**: `index.html`, `styles.css`, `script.js` |
| Kickers por seccion vs kicker unico | Kicker en cada seccion es patron AI-slop (55-95% de generaciones); spec REQ-HERO-004 exige solo hero | **Kicker unico** en hero; eliminar `.kicker` de about, menu, reviews, visit |
| Glassmorphism global vs solo menu cards | Glass por defecto es ban anti-slop; spec REQ-MENU-003 limita a `.dish` | **Solo `.dish.glass`** en seccion menu |
| Carrusel con wrap-around vs limites | Wrap desorienta al usuario; botones deshabilitados en extremos dan feedback claro | **Sin wrap**; deshabilitar prev/next en bordes |
| Menu filter vacio: ocultar vs mensaje | Mensaje guia al usuario cuando filtro no tiene resultados | **Mensaje empty-state** oculto por defecto, visible si cero matches |
| Mobile nav: `<dialog>` vs div con hidden | `<dialog>` nativo tiene focus trap y Escape gratis; pero soporte de anchor positioning es limitado | **`<div hidden>`** con focus trap manual JS (compatibilidad amplia) |

## Arquitectura de archivos

```
la-carreta-gourmet/
  index.html      (modificar: eliminar kickers no-hero, ajustar atributos)
  styles.css      (crear: tokens, layout, componentes, responsive, motion)
  script.js       (crear: reveal, filter, carousel, mobile nav, smooth scroll)
```

### Estructura DOM por seccion

```
body
  a.skip-link
  header.nav[data-nav]
    nav__brand / nav__links / nav__cta / nav__burger
  div.mobile-menu[data-mobile-menu][hidden]
  main
    section.hero#inicio
    section.about#nosotros
    section.menu#menu
    section.reviews#resenas
    section.visit#visitanos
  footer.footer
```

Cada seccion usa `<section>` con `aria-labelledby` apuntando a su `<h2>`. El hero usa `<h1>`. Jerarquia h1 > h2 > h3 sin saltos.

## Tabla de tokens CSS

### Colores

| Token | Valor | Uso | Contraste vs charcoal |
|-------|-------|-----|----------------------|
| `--charcoal` | `#1a1410` | Fondo base, texto en superficies claras | - |
| `--charcoal-raised` | `#241b15` | Superficies elevadas (hours-card) | - |
| `--gold` | `#c9922a` | Acento, CTAs, links, estrellas | 6.6:1 |
| `--gold-soft` | `#a87820` | Hover de gold, estados activos | 4.7:1 |
| `--cream` | `#f5efe6` | Texto principal sobre oscuro | 16.0:1 |
| `--cream-dim` | `rgba(245, 239, 230, 0.7)` | Texto secundario/muted | 8.2:1 |
| `--border` | `rgba(245, 239, 230, 0.12)` | Bordes sutiles en glass y divisores | - |
| `--glass-bg` | `rgba(26, 20, 16, 0.65)` | Fondo semi-transparente de glass cards | - |
| `--glass-blur` | `12px` | Valor de backdrop-filter para glass | - |

### Tipografia

| Token | Valor | Justificacion |
|-------|-------|---------------|
| `--font-display` | `'Playfair Display', Georgia, serif` | Serif editorial para marca y titulos; spec REQ-HERO-002 |
| `--font-body` | `'Inter', system-ui, sans-serif` | Sans-serif legible para cuerpo; spec REQ-CHROME-005 |
| `--text-xs` | `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` | Notas de plato, labels (12-14px) |
| `--text-sm` | `clamp(0.875rem, 0.8rem + 0.35vw, 1rem)` | Cuerpo secundario (14-16px) |
| `--text-base` | `clamp(1rem, 0.925rem + 0.35vw, 1.125rem)` | Cuerpo principal (16-18px) |
| `--text-lg` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` | Subtitulos (18-22px) |
| `--text-xl` | `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)` | Titulos de seccion (24-36px) |
| `--text-2xl` | `clamp(2rem, 1.4rem + 2.5vw, 3.75rem)` | Hero h1 (32-60px, max < 6rem) |
| `--leading-tight` | `1.15` | Titulos display |
| `--leading-body` | `1.6` | Cuerpo de texto |
| `--tracking-tight` | `-0.02em` | Titulos display (floor >= -0.04em) |

### Espaciado (base 4/8)

| Token | Valor |
|-------|-------|
| `--space-2` | `0.5rem` (8px) |
| `--space-4` | `1rem` (16px) |
| `--space-6` | `1.5rem` (24px) |
| `--space-8` | `2rem` (32px) |
| `--space-12` | `3rem` (48px) |
| `--space-16` | `4rem` (64px) |
| `--space-20` | `5rem` (80px) |
| `--space-24` | `6rem` (96px) |

### Radios, sombras, motion, z-index

| Token | Valor | Razon |
|-------|-------|-------|
| `--radius-sm` | `8px` | Tags, pills, botones pequenos |
| `--radius-md` | `12px` | Cards (tope anti-slop: 12-16px) |
| `--radius-full` | `999px` | Pills, avatares circulares |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.3)` | Max 8px blur; sin border+shadow combo |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Curva fuerte para entradas UI |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Movimiento en pantalla |
| `--dur-fast` | `150ms` | Feedback de botones, hover |
| `--dur-base` | `220ms` | Transiciones estandar UI |
| `--dur-slow` | `400ms` | Revelas de seccion, carrusel |
| `--z-nav` | `10` | Nav sticky |
| `--z-mobile-menu` | `20` | Menu movil superpuesto |
| `--z-skip` | `30` | Skip-link en foco |

## Receta de glassmorphism

Aplica **unicamente** a `.dish.glass` (tarjetas del menu). No se aplica a nav, hero, reviews, visit ni footer.

```css
.dish.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  /* SIN box-shadow: anti-slop prohibe border + shadow > 8px combo */
}
```

**Justificacion de restriccion**: glassmorphism como default es ban anti-slop. Limitarlo a las tarjetas del menu crea un momento visual puntual que refuerza la identidad (transparencia = humo/brasa) sin saturar la pagina. El nav usa fondo solido opaco para garantizar legibilidad sobre el hero.

## Sistema de reveal con IntersectionObserver

```
initReveal()
  |
  +--> prefers-reduced-motion? --> SI: añadir .is-visible a todo, salir
  |
  +--> NO: crear IntersectionObserver (threshold: 0.15, rootMargin: "0px 0px -60px 0px")
       |
       +--> callback: para cada entry.isIntersecting
            |
            +--> añadir .is-visible al elemento
            +--> si tiene hijos con [data-stagger], aplicar delay incremental (50ms)
            +--> observer.unobserve(entry.target)
```

**Selectores**: `[data-reveal]` en el HTML mapea a la clase `.reveal` en CSS. Estado inicial: `opacity: 0; transform: translateY(8px)`. Estado `.is-visible`: `opacity: 1; transform: translateY(0)` con `transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)`.

**Stagger**: cuando multiples tarjetas `.dish` entran juntas, cada una recibe `transition-delay: calc(var(--stagger-index, 0) * 50ms)`. El JS asigna `--stagger-index` como custom property inline al observar el grupo.

**Reduced motion**: `@media (prefers-reduced-motion: reduce)` anula transforms; contenido visible inmediatamente sin esperar JS. El JS verifica `matchMedia` antes de crear el observer.

## Maquina de estados del filtro de menu

```
Estados: [all] [parrilla] [mar] [clasicos]
                |
                v
  click en boton[data-filter]
    |
    +--> actualizar aria-selected (true/false) en todos los botones
    +--> actualizar clase .is-active
    +--> para cada .dish[data-section]:
    |     |
    |     +--> si filter == "all" o dish.section == filter: mostrar (opacity 1, scale 1)
    |     +--> si no: ocultar (opacity 0, scale 0.95, pointer-events none)
    |
    +--> si cero platos visibles: mostrar [data-menu-note]
    +--> si hay platos visibles: ocultar [data-menu-note]
```

Transicion de filtrado: `opacity` + `transform` con `var(--dur-base)` y `var(--ease-out)`. Maximo 300ms (REQ-MENU-002). Los platos ocultos mantienen `position: absolute` o `display: none` despues de la transicion para no ocupar espacio en el grid.

**ARIA**: `role="tablist"` en contenedor, `role="tab"` en cada boton, `aria-selected` toggled. El grid de platos tiene `role="tabpanel"` implicito (region viva).

## Arquitectura del carrusel de resenas

```
reviews__track (display: flex, overflow-x: auto, scroll-snap-type: x mandatory)
  |
  +-- figure.review (scroll-snap-align: start, flex: 0 0 85%, min-width: 280px)
  +-- figure.review
  +-- figure.review
```

**Controles**: botones prev/next fuera del track, con `aria-label`. Al hacer click, `track.scrollBy({ left: cardWidth, behavior: 'smooth' })`.

**Limites**: `scrollend` event listener verifica `scrollLeft`. Si `scrollLeft <= 0`, deshabilitar prev. Si `scrollLeft >= scrollWidth - clientWidth - 1`, deshabilitar next. Sin wrap-around.

**Teclado**: track con `tabindex="0"`, flechas izquierda/derecha hacen `scrollBy`. Botones prev/next son focuseables y activables con Enter/Space.

**Reduced motion**: `scroll-behavior: auto` en lugar de `smooth`.

**Sin pistas de scroll**: cero texto "Desliza" o iconos de mouse (REQ-REVIEWS-003).

## Navegacion movil

```
Estado: CERRADO (default)
  |
  +--> click burger --> ABRIR
       |
       +--> burger.aria-expanded = "true"
       +--> mobile-menu.hidden = false
       +--> body.style.overflow = "hidden" (prevenir scroll)
       +--> focus primer link del menu
       +--> activar focus trap (Tab cicla dentro del menu)
       |
       +--> click link / click fuera / Escape --> CERRAR
            |
            +--> burger.aria-expanded = "false"
            +--> mobile-menu.hidden = true
            +--> body.style.overflow = ""
            +--> devolver foco al burger
```

**Focus trap**: keydown listener en document. Si Tab y el foco esta en el ultimo elemento, mover al primero. Si Shift+Tab y el foco esta en el primero, mover al ultimo. Solo activo cuando menu esta abierto.

**Click fuera**: `pointerdown` listener en document; si el target no esta dentro de `[data-mobile-menu]` ni `[data-burger]`, cerrar.

## Breakpoints responsive

Mobile-first. Queries exactos:

| Breakpoint | Hero | About | Menu grid | Reviews track | Visit |
|-----------|------|-------|-----------|---------------|-------|
| `< 768px` | 100dvh, padding `var(--space-6)`, CTAs stack vertical | 1 col, imagen arriba texto abajo | 1 col | 1 card visible (85% width) | 1 col, hours-card debajo |
| `>= 768px` | 100dvh, padding `var(--space-12)`, CTAs inline | 2 cols (texto izq, foto der), gap `var(--space-12)` | 2 cols | 2 cards visibles | 2 cols (info izq, hours der) |
| `>= 1024px` | max-width contenido `1200px` | gap `var(--space-16)` | 3 cols | 2-3 cards visibles | gap `var(--space-16)` |
| `>= 1440px` | max-width contenido `1320px` | sin cambio | 3 cols, cards mas anchas | 3 cards visibles | sin cambio |

Nav: links inline en `>= 768px`, burger en `< 768px`. Footer: inline en `>= 768px`, stack en mobile.

## Checklist anti-slop pre-flight

Matriz adaptada para este build, a ejecutar en fase de verificacion:

| # | Check | Estado |
|---|-------|--------|
| 1 | Cero em-dash (U+2014) y en-dash (U+2013) en HTML y atributos | Pendiente |
| 2 | Kicker solo en hero; cero `.kicker` en about/menu/reviews/visit | Pendiente |
| 3 | Cero marcadores numerados `01/02/03` como scaffolding | Pendiente |
| 4 | Glassmorphism solo en `.dish.glass`; cero en nav/hero/reviews/footer | Pendiente |
| 5 | Cero `border` + `box-shadow > 8px blur` en mismo elemento | Pendiente |
| 6 | Cards con `border-radius <= 12px` | Pendiente |
| 7 | Cero `background-clip: text` con gradiente | Pendiente |
| 8 | Cero grid 3-columnas identicas (reviews es track horizontal, no grid) | Pendiente |
| 9 | Cero SVGs sketchy (`feTurbulence`/`feDisplacementMap`) | Pendiente |
| 10 | Cero texto "Scroll to explore" / "Desliza" / iconos de mouse | Pendiente |
| 11 | Cero `border-left/right > 1px` como acento lateral | Pendiente |
| 12 | Contraste cuerpo >= 4.5:1, texto grande >= 3:1 | Pendiente |
| 13 | `prefers-reduced-motion` desactiva transforms | Pendiente |
| 14 | Solo `transform` y `opacity` en animaciones | Pendiente |
| 15 | Imagenes con `width`/`height`, `loading="lazy"`, desde picsum.photos | Pendiente |
| 16 | Sin scroll horizontal en 375/768/1024/1440 | Pendiente |
| 17 | Skip-link visible en foco de teclado | Pendiente |
| 18 | Touch targets >= 44x44px en mobile | Pendiente |

## Cambios a archivos

| Archivo | Accion | Descripcion |
|---------|--------|-------------|
| `index.html` | Modificar | Eliminar `.kicker` de about (L119), menu (L159), reviews (L254), visit (L315). Añadir `width`/`height` a imagenes que falten. Añadir `data-stagger` al menu grid. Ajustar `data-reveal` en secciones. |
| `styles.css` | Crear | Tokens CSS, reset minimo, layout por seccion, componentes (nav, hero, about, menu, dish, reviews, visit, footer), glass recipe, reveal animations, responsive queries, reduced-motion, focus-visible. |
| `script.js` | Crear | initReveal (IntersectionObserver), initFilters (menu state machine), initCarousel (scroll track + controls), initMobileNav (burger + focus trap + escape + click-outside), initSmoothScroll (anclas con offset de nav), initYear (copyright dinamico). |

## Estrategia de pruebas

| Capa | Que probar | Enfoque |
|------|-----------|---------|
| Visual | Responsive en 4 breakpoints | Playwright screenshots a 375/768/1024/1440 |
| Accesibilidad | Contraste, ARIA, keyboard nav, skip-link | Lighthouse + verificacion manual |
| Anti-slop | 18 checks de la matriz pre-flight | Revision manual + grep automatizado |
| Funcional | Filtro menu, carrusel, nav movil, smooth scroll | Playwright E2E o manual |
| Motion | reduced-motion desactiva transforms | DevTools emulation + verificacion |
| Performance | LCP < 2.5s, CLS < 0.1 | Lighthouse Performance audit |

## Migracion / Rollout

No se requiere migracion. Sitio estatico sin estado. Rollback: `git checkout` del commit anterior.

## Preguntas abiertas

- [ ] Confirmar URL real de Instagram para reemplazar `https://instagram.com` placeholder
- [ ] Decidir si las imagenes de picsum se reemplazan por fotos reales antes del lanzamiento
- [ ] Confirmar si el estado "Abierto ahora" debe calcularse con JS (hora real del navegador) o mantenerse estatico
