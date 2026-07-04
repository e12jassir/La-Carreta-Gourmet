# Especificacion: landing-hero

## Proposito
Hero de pantalla completa que convierte visitantes en comensales: ambiente dramatico, marca en serif y dos CTAs claros. El hero es la unica seccion de la pagina que puede llevar kicker descriptivo (regla anti-slop).

## Requisitos

### REQ-HERO-001: Cobertura de viewport
La seccion hero SHALL ocupar al menos 100dvh en todos los breakpoints, con imagen de fondo (picsum seed `carreta-brasa-ambiance`) y un scrim oscuro que asegure legibilidad.

#### Escenario: SCENARIO-HERO-001 - Carga inicial en cualquier viewport
- GIVEN un visitante llega a la pagina
- WHEN la pagina renderiza en cualquier breakpoint (375, 768, 1024, 1440)
- THEN la seccion hero ocupa al menos 100dvh
- AND la imagen de fondo se ve con un scrim oscuro superpuesto
- AND el texto blanco-crema sobre el scrim cumple contraste >= 4.5:1

#### Escenario: SCENARIO-HERO-002 - Sin scroll horizontal en mobile
- GIVEN un viewport de 375px
- WHEN el hero se renderiza
- THEN no aparece scroll horizontal
- AND los dos CTAs son visibles sin desplazar la pagina

### REQ-HERO-002: Marca y tagline en serif con carga robusta
El nombre del restaurante SHALL mostrarse en Playfair Display (peso 700) con un tagline descriptivo en espanol. Las fuentes SHALL venir de Google Fonts con `font-display: swap` y `preconnect` para evitar FOIT largo.

#### Escenario: SCENARIO-HERO-003 - Carga de tipografia sin FOIT
- GIVEN el navegador del visitante sin fuentes en cache
- WHEN Playfair Display o Inter no han terminado de descargar
- THEN una fuente de fallback del sistema se ve primero
- AND al cargar la fuente real, el texto cambia sin reflow visible (altura reservada)

#### Escenario: SCENARIO-HERO-004 - Tagline legible
- GIVEN el hero renderizado
- WHEN se mide el tagline
- THEN la longitud de linea no excede 75 caracteres
- AND el line-height del tagline es >= 1.5

### REQ-HERO-003: Dos CTAs exactos
El hero SHALL mostrar exactamente dos CTAs: "Ver Menu" (estilo ghost, secundario) y "Reserva tu mesa" (estilo gold, primario). NO SHALL existir un tercer boton en el hero.

#### Escenario: SCENARIO-HERO-005 - CTAs en desktop
- GIVEN el hero renderizado en >= 1024px
- WHEN el visitante ve la pagina
- THEN "Ver Menu" esta visible como boton ghost (borde fino, fondo transparente)
- AND "Reserva tu mesa" esta visible como boton gold (relleno dorado, texto oscuro)

#### Escenario: SCENARIO-HERO-006 - CTAs tocables en mobile
- GIVEN un viewport de 375px
- WHEN el hero renderiza
- THEN ambos CTAs son visibles sin scroll
- AND el area tocable de cada CTA es >= 44x44 px (Apple HIG) o >= 48x48 dp (Material)

### REQ-HERO-004: Kicker unico y cero marcadores numerados
El hero SHALL usar un unico kicker descriptivo (no mas de 6 palabras). Ninguna otra seccion SHALL usar kicker encima del titulo, y ninguna seccion SHALL usar marcadores numerados `01 / 02 / 03` como eyebrow (regla anti-slop: "eyebrow on every section" y "numbered section markers").

#### Escenario: SCENARIO-HERO-007 - Limite de kickers
- GIVEN cualquier seccion de la pagina renderizada
- WHEN se inspecciona el DOM
- THEN solo la seccion hero contiene un kicker en mayusculas con tracking
- AND las secciones Nosotros, Menu, Resenas, Visitanos NO llevan kicker

#### Escenario: SCENARIO-HERO-008 - Cero marcadores numerados
- GIVEN cualquier seccion de la pagina
- WHEN se renderiza
- THEN no aparece ningun "01", "02", "03", "00", "001" como eyebrow o etiqueta de seccion
- AND el orden de las secciones se percibe por proximidad, no por numeros
