# Especificacion: customer-reviews

## Proposito
Carrusel horizontal con 3 resenas reales del brief, estrellas, controles prev/next accesibles y sin pistas de scroll decorativas.

## Requisitos

### REQ-REVIEWS-001: Tres resenas exactas del brief
La seccion SHALL mostrar exactamente 3 resenas (Andres M., James T. y Carolina R.), cada una con 5 estrellas y atribucion "Google Resenas" o "Google Reviews". El texto SHALL ser el del brief y SHALL NOT contener guion largo ni en-dash.

#### Escenario: SCENARIO-REVIEWS-001 - Conteo y autoria
- GIVEN la seccion Resenas renderizada
- WHEN se cuentan los elementos `figure.review`
- THEN hay exactamente 3
- AND aparece el nombre del autor visible en cada uno
- AND cada uno muestra 5 estrellas (icono o pseudo-elemento, no emoji)

#### Escenario: SCENARIO-REVIEWS-002 - Texto sin em-dash
- GIVEN el contenido de las 3 resenas
- WHEN se inspecciona el texto visible de los `blockquote`
- THEN ninguno contiene `-` ni `-` (em-dash o en-dash)
- AND los tres textos coinciden con el brief aprobado

### REQ-REVIEWS-002: Controles prev/next accesibles
La seccion SHALL ofrecer dos botones: "Resena anterior" y "Resena siguiente", con `aria-label` descriptivo y area tocable >= 44x44 px. Al activarlos, SHALL avanzarse o retrocederse en el carrusel, con foco visible (`:focus-visible` con outline 2px).

#### Escenario: SCENARIO-REVIEWS-003 - Avance con siguiente
- GIVEN el carrusel mostrando la resena 1 de 3
- WHEN el visitante activa "Resena siguiente"
- THEN la resena 2 de 3 queda visible en el viewport
- AND el boton mantiene foco visible (outline 2px o equivalente)

#### Escenario: SCENARIO-REVIEWS-004 - Borde inferior del carrusel
- GIVEN el carrusel mostrando la resena 3 de 3
- WHEN el visitante activa "Resena siguiente"
- THEN el comportamiento queda en la ultima resena (sin wrap) o vuelve a la 1
- Y el comportamiento exacto queda documentado en diseno y tareas

### REQ-REVIEWS-003: Sin pistas de scroll decorativas
La seccion SHALL NOT contener texto tipo "Scroll to explore", "Desliza", "Explora" ni un icono animado de mouse/wheel (regla anti-slop: "scroll cues"). Tampoco SHALL llevar kicker encima del titulo.

#### Escenario: SCENARIO-REVIEWS-005 - Sin texto de pista
- GIVEN la seccion Resenas renderizada
- WHEN se inspecciona el texto visible y los iconos SVG
- THEN no aparece "Scroll", "Desliza", "Explora" como instruccion
- AND no hay un icono de mouse/wheel animado

### REQ-REVIEWS-004: Track horizontal, no grilla 3-columnas identicas
La disposicion SHALL ser un track horizontal unico (`display: flex` con `overflow-x: auto` o transformaciones), NO una grilla `repeat(3, 1fr)` con 3 tarjetas identicas lado a lado (regla anti-slop: "identical card grid" y "3-column equal feature cards").

#### Escenario: SCENARIO-REVIEWS-006 - Track unico
- GIVEN el CSS de la seccion Resenas
- WHEN se inspecciona la disposicion
- THEN existe un contenedor con `display: flex` o scroll horizontal
- AND no es una grilla fija de 3 columnas con tarjetas homogeneas en desktop
- AND la primera resena queda enfocada al cargar la pagina
