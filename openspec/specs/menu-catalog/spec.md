# Especificacion: menu-catalog

## Proposito
Catalogo de 12 platos en 3 categorias, con filtro, glassmorphism puntual en las tarjetas y reveal por IntersectionObserver. Esta es la UNICA seccion donde el glassmorphism es bienvenido (regla anti-slop: "glassmorphism as default" esta prohibido).

## Requisitos

### REQ-MENU-001: Doce platos exactos del brief
La carta SHALL mostrar exactamente 12 platos distribuidos en 3 categorias: De la Parrilla (3), Mar y Sabor (7), Clasicos (2). Los nombres y precios SHALL coincidir con el brief, en pesos colombianos con formato `$XX.XXX`.

#### Escenario: SCENARIO-MENU-001 - Conteo de platos por categoria
- GIVEN la seccion Menu renderizada
- WHEN se cuentan las tarjetas `article.dish`
- THEN hay exactamente 12 articulos
- AND 3 tienen `data-section="parrilla"`, 7 tienen `data-section="mar"`, 2 tienen `data-section="clasicos"`

#### Escenario: SCENARIO-MENU-002 - Platos del brief presentes
- GIVEN los 12 platos listados en el brief
- WHEN se renderiza la carta
- THEN todos aparecen por nombre: Hamburguesa ($32.500), Carne Asada ($48.000), Churrasco ($54.500), Ceviche Chicarron ($42.000), Ceviche de Camaron ($44.500), Aero de Camaron ($39.000), Cazuela de Mariscos ($58.000), Pescado en Salsa de Mariscos ($52.000), Arroz Marinero ($49.500), Arroz de Mariscos ($51.000), Gordon Blue de Pollo ($38.000), Lomo Indio ($46.500)

### REQ-MENU-002: Filtro por categoria
La carta SHALL ofrecer 4 botones de filtro con `role="tab"`: "Todo", "De la Parrilla", "Mar y Sabor", "Clasicos". Al activar uno, SHALL mostrarse solo los platos de esa categoria (o los 12 si es "Todo"), con transicion <= 300ms.

#### Escenario: SCENARIO-MENU-003 - Filtro "De la Parrilla"
- GIVEN la carta cargada con todos los platos visibles
- WHEN el visitante activa el filtro "De la Parrilla"
- THEN solo los 3 platos de esa categoria son visibles
- AND los 9 restantes quedan ocultos (`hidden` o `display: none`)
- AND el filtro "De la Parrilla" queda con `aria-selected="true"`

#### Escenario: SCENARIO-MENU-004 - Filtro "Todo" restaura
- GIVEN un filtro activo distinto de "Todo"
- WHEN el visitante activa "Todo"
- THEN los 12 platos vuelven a ser visibles
- AND la transicion dura <= 300ms

### REQ-MENU-003: Glassmorphism solo en tarjetas de plato
Las tarjetas `article.dish` SHALL usar glassmorphism: `backdrop-filter: blur()` con fondo semi-transparente y un solo borde fino (1px). NO SHALL combinarse con un `box-shadow` de blur > 8px (regla anti-slop: "ghost-card border+shadow"). Ninguna otra seccion de la pagina SHALL usar `backdrop-filter` (excepto `.review.glass` si el diseno lo confirma, ver customer-reviews).

#### Escenario: SCENARIO-MENU-005 - Contraste de la tarjeta
- GIVEN una tarjeta de plato sobre el fondo oscuro
- WHEN se mide el nombre del plato contra el fondo glass
- THEN el contraste es >= 4.5:1 (cuerpo) o >= 3:1 (titulo >= 18px o bold >= 14px)

#### Escenario: SCENARIO-MENU-006 - Sin ghost-card
- GIVEN el CSS de la tarjeta
- WHEN se inspecciona
- THEN la tarjeta tiene 1px de borde o un shadow <= 8px de blur, pero NO ambos juntos como decoracion
- AND el `border-radius` no excede 16px

### REQ-MENU-004: Reveal escalonado por IntersectionObserver
Las tarjetas SHALL aparecer con fade-in y `translateY(8px) -> translateY(0)` al entrar al viewport, escalonadas 50ms entre cada una. El estado final SHALL ser visible sin JS (no gatear contenido en clase-trigger).

#### Escenario: SCENARIO-MENU-007 - Stagger al scrollear
- GIVEN las tarjetas fuera del viewport
- WHEN el visitante scrollea hasta la carta
- THEN las tarjetas aparecen una a una
- AND el delay entre tarjetas consecutivas es 50ms
- AND la duracion de cada fade-in es <= 400ms

#### Escenario: SCENARIO-MENU-008 - Respeto a reduced motion
- GIVEN el sistema con `prefers-reduced-motion: reduce`
- WHEN las tarjetas entran al viewport
- THEN no hay transformacion `translateY`
- AND solo hay crossfade a opacidad 1 o cambio instantaneo
- AND el contenido es visible sin esperar a JavaScript
