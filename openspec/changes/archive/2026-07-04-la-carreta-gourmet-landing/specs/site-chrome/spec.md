# Especificacion: site-chrome

## Proposito
Navegacion sticky, footer minimal y todas las reglas transversales de diseno, accesibilidad, motion y anti-slop que aplican a la pagina completa. Esta capacidad absorbe los "global constraints" del brief (paleta, fuentes, motion, contraste, responsive, anti-slop) para que las demas capacidades hereden por contrato.

## Requisitos (chrome visible)

### REQ-CHROME-001: Skip-link visible al foco
La pagina SHALL incluir un enlace "Saltar al menu" (o al contenido principal) que se vuelve visible al recibir foco de teclado.

#### Escenario: SCENARIO-CHROME-001 - Skip-link funcional
- GIVEN un usuario con teclado llega a la pagina
- WHEN presiona Tab desde la URL
- THEN el skip-link aparece visualmente (no solo en outline)
- AND al activarlo, el foco salta al `<main>` o al primer encabezado de seccion

### REQ-CHROME-002: Nav sticky con hamburger accesible
El nav SHALL ser sticky en la parte superior y SHALL colapsar a un boton hamburger en < 768px. El hamburger SHALL usar `aria-expanded` y `aria-controls` correctos, y el area tocable SHALL ser >= 44x44 px.

#### Escenario: SCENARIO-CHROME-002 - Desktop con enlaces
- GIVEN un viewport de >= 1024px
- WHEN la pagina renderiza
- THEN el nav muestra enlaces Inicio, Nosotros, Menu, Resenas, Visitanos
- AND el boton hamburger esta oculto visualmente (`display: none` o `hidden`)

#### Escenario: SCENARIO-CHROME-003 - Mobile con hamburger
- GIVEN un viewport de 375px
- WHEN la pagina renderiza
- THEN los enlaces principales del nav estan ocultos
- AND solo se ve el boton hamburger
- AND el boton tiene `aria-expanded="false"` y `aria-controls="mobile-menu"` inicialmente

#### Escenario: SCENARIO-CHROME-004 - Apertura del menu mobile
- GIVEN el menu mobile cerrado
- WHEN el visitante toca el hamburger
- THEN el menu se expande
- AND `aria-expanded` cambia a "true"
- AND el foco se mueve al primer enlace del menu o se mantiene en el toggle

### REQ-CHROME-003: Footer minimal
El footer SHALL contener: marca en texto, 4 enlaces de navegacion, icono de Instagram con `aria-label`, y linea de copyright con el ano dinamico. NO SHALL tener redes sociales adicionales, formulario, ni logos de partners.

#### Escenario: SCENARIO-CHROME-005 - Contenido del footer
- GIVEN el footer renderizado
- WHEN se inspecciona su contenido
- THEN contiene la marca, 4 enlaces y un icono Instagram
- AND aparece la linea de copyright con el ano actual

## Requisitos transversales (diseno, accesibilidad, anti-slop)

### REQ-CHROME-004: Stack puro sin frameworks ni build
La pagina SHALL construirse solo con HTML + CSS + JavaScript vanilla. NO SHALL haber frameworks (React, Vue, Svelte), ni build step (webpack, vite), ni package manager. Las unicas dependencias externas SHALL ser Google Fonts y picsum.photos.

#### Escenario: SCENARIO-CHROME-006 - Sin dependencias de framework
- GIVEN el repositorio
- WHEN se inspecciona el codigo
- THEN no hay `package.json`, `node_modules`, `webpack.config`, ni `vite.config`
- AND los unicos recursos externos en el HTML son Google Fonts y picsum.photos

### REQ-CHROME-005: Paleta y tipografia fijas, sin gradiente en texto
La pagina SHALL usar exclusivamente: charcoal `#1a1410` (base), gold `#c9922a` (acento), cream `#f5efe6` (texto sobre oscuro). Tipografia: Playfair Display (headings) + Inter (body) desde Google Fonts. NO SHALL haber `background-clip: text` con gradiente, ni colores fuera de la paleta.

#### Escenario: SCENARIO-CHROME-007 - Sin gradientes en texto
- GIVEN el CSS compilado
- WHEN se busca `background-clip: text` combinado con `linear-gradient` o `radial-gradient`
- THEN no hay resultados en selectores de tipografia

#### Escenario: SCENARIO-CHROME-008 - Contraste de cuerpo y titulos
- GIVEN cualquier texto visible sobre fondo oscuro
- WHEN se mide el contraste
- THEN el cuerpo cumple >= 4.5:1
- AND los titulos grandes (>= 18px o bold >= 14px) cumplen >= 3:1

### REQ-CHROME-006: Cero em-dash y cero en-dash en cualquier texto visible
La pagina SHALL NOT contener guion largo (`-`) ni en-dash (`-`) en titulos, cuerpo, CTAs, alt text, aria-label ni metadata visible. Solo SHALL permitirse el guion normal (`-`).

#### Escenario: SCENARIO-CHROME-009 - Cero guion decorativo
- GIVEN el HTML renderizado y el CSS
- WHEN se busca `-` o `-` en texto visible y atributos (`aria-label`, `alt`, `title`)
- THEN no hay resultados

### REQ-CHROME-007: prefers-reduced-motion respetado
La pagina SHALL respetar `prefers-reduced-motion: reduce`. Las animaciones de fade-in, stagger y transformaciones SHALL desactivarse o reducirse a crossfade o cambio instantaneo. El contenido SHALL ser visible sin esperar a JavaScript.

#### Escenario: SCENARIO-CHROME-010 - Animaciones desactivadas
- GIVEN el sistema con reduced motion activo
- WHEN el visitante scrollea
- THEN las secciones aparecen sin `translateY`
- AND los elementos son visibles al cargar (no ocultos por una clase que dependa de JS para removerse)

### REQ-CHROME-008: Responsive mobile-first a 4 breakpoints
La pagina SHALL disearse mobile-first y SHALL verse correctamente en 375px, 768px, 1024px y 1440px sin scroll horizontal. La tipografia SHALL usar `clamp()` para escalar entre breakpoints.

#### Escenario: SCENARIO-CHROME-011 - Sin scroll horizontal
- GIVEN los 4 breakpoints de prueba (375, 768, 1024, 1440)
- WHEN se mide `document.documentElement.scrollWidth` y `window.innerWidth`
- THEN `scrollWidth <= innerWidth` en todos los casos
- AND no aparece overflow horizontal

### REQ-CHROME-009: Sin patrones AI-slop (catalogo match-and-refuse)
La pagina SHALL NOT usar: bordes laterales de color (`border-left` o `border-right` > 1px como acento), ni kicker en cada seccion (ya cubierto en REQ-HERO-004), ni marcadores numerados `01 / 02 / 03` (ya cubierto), ni SVGs dibujados a mano o sketchy (filtros `feTurbulence` o `feDisplacementMap` con efecto papel), ni numeros fake-perfectos (99.99%, 100%), ni nombres startup-slop.

#### Escenario: SCENARIO-CHROME-012 - Sin bordes laterales decorativos
- GIVEN el CSS
- WHEN se buscan `border-left` o `border-right` mayores a 1px con color de acento en selectores de UI
- THEN no aparecen como elemento decorativo (pueden existir separadores 1px neutros)

#### Escenario: SCENARIO-CHROME-013 - Sin SVGs sketchy
- GIVEN los SVG del proyecto
- WHEN se inspeccionan sus clases y filtros
- THEN no hay clases `loose-sketch`, `doodle`, `sketch` ni filtros `feTurbulence` o `feDisplacementMap` aplicados con efecto "papel"

#### Escenario: SCENARIO-CHROME-014 - Sin numeros fake-perfectos
- GIVEN todo el texto visible de la pagina
- WHEN se busca el patron `99.99%`, `100%`, `10x` o similar
- THEN no aparece en contenido de marketing (los datos reales como "4.5 estrellas" y "645 resenas" son validos por venir del brief)

### REQ-CHROME-010: Imagenes optimizadas, sin CLS, sin Unsplash roto
Toda imagen SHALL incluir `width` y `height` explicitos para reservar espacio, SHALL usar `loading="lazy"` salvo que sea above-the-fold, y SHALL provenir de `picsum.photos` con seeds descriptivos (no enlaces Unsplash rotos, no `<div>` simulando screenshots).

#### Escenario: SCENARIO-CHROME-015 - Cero CLS por imagen
- GIVEN todas las imagenes de la pagina
- WHEN se mide Cumulative Layout Shift en Lighthouse
- THEN CLS < 0.1
- AND cada `<img>` tiene atributos `width` y `height` (o `aspect-ratio` en CSS)

#### Escenario: SCENARIO-CHROME-016 - Origen de imagenes
- GIVEN todas las URLs de imagen en el HTML
- WHEN se inspeccionan
- THEN todas provienen de `https://picsum.photos/seed/{descriptive-seed}/...`
- AND no hay enlaces a Unsplash con foto-id crudo
- AND no hay `<div>` que simule un screenshot de producto

### REQ-CHROME-011: Smooth scroll accesible
Los enlaces de ancla SHALL usar scroll suave (`scroll-behavior: smooth` o handler JS que respete reduced motion). El handler SHALL compensar la altura del nav sticky al calcular el destino.

#### Escenario: SCENARIO-CHROME-017 - Click en ancla del nav
- GIVEN el visitante hace clic en un enlace del nav (ej. "Menu")
- WHEN se procesa el clic
- THEN la pagina scrollea suavemente hasta la seccion Menu
- AND el destino no queda oculto por el nav sticky
- AND respeta `prefers-reduced-motion` (sin animacion si esta activo)
