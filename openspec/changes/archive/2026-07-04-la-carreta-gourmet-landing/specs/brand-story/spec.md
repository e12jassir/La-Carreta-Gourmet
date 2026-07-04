# Especificacion: brand-story

## Proposito
Seccion "Nosotros" en dos columnas: narrativa de marca a la izquierda y fotografia ambient a la derecha, con tono calido y sin elementos decorativos de IA.

## Requisitos

### REQ-STORY-001: Layout 2 columnas responsive
La seccion Nosotros SHALL disponer una grilla de 2 columnas en >= 768px (texto a la izquierda, fotografia a la derecha) y SHALL apilar en columna unica en < 768px.

#### Escenario: SCENARIO-STORY-001 - Layout en desktop
- GIVEN un viewport de >= 1024px
- WHEN la seccion Nosotros renderiza
- THEN la columna de texto ocupa el lado izquierdo
- AND la fotografia ocupa el lado derecho
- AND el gap entre columnas es >= 48px

#### Escenario: SCENARIO-STORY-002 - Layout en mobile
- GIVEN un viewport de 375px
- WHEN la seccion Nosotros renderiza
- THEN la grilla colapsa a una sola columna
- AND no aparece scroll horizontal
- AND la imagen conserva su relacion de aspecto (no recortada de forma agresiva)

### REQ-STORY-002: Copia en espanol, sin em-dash
El texto narrativo SHALL estar escrito en espanol profesional neutro, en maximo 2 parrafos, y SHALL NOT contener guion largo (`-`) ni en-dash (`-`) en ningun texto visible.

#### Escenario: SCENARIO-STORY-003 - Texto sin guion decorativo
- GIVEN la copia de Nosotros renderizada
- WHEN se inspecciona el texto visible (incluyendo `<p>`, `<h2>`, `<em>`)
- THEN no aparece ningun caracter `-` ni `-` (em-dash o en-dash)
- AND se usan comas, puntos, dos puntos o parentesis como separadores

#### Escenario: SCENARIO-STORY-004 - Longitud del texto
- GIVEN la copia de Nosotros
- WHEN se cuentan los parrafos
- THEN hay exactamente 2 parrafos
- AND cada parrafo mantiene <= 75 caracteres por linea visible

### REQ-STORY-003: Sin kicker, sin marcadores, sin borde lateral
La seccion Nosotros SHALL NOT llevar kicker encima del titulo, SHALL NOT usar marcadores numerados `01 / 02`, y SHALL NOT usar bordes laterales de color como acento (regla anti-slop: "side-stripe borders").

#### Escenario: SCENARIO-STORY-005 - Ausencia de elementos AI-slop
- GIVEN la seccion Nosotros renderizada
- WHEN se inspecciona visualmente
- THEN no aparece un eyebrow encima del H2
- AND no aparece "01 / Nosotros" ni numeracion similar
- AND no hay un `border-left` o `border-right` mayor a 1px con color de acento
