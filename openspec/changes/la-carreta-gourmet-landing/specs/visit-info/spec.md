# Especificacion: visit-info

## Proposito
Seccion "Visitanos" con horario completo, rango de precio, estado abierto/cerrado y CTA de reserva por Instagram. La seccion no lleva kicker y no usa marcadores numerados.

## Requisitos

### REQ-VISIT-001: Horario completo de 7 dias
La seccion SHALL listar el horario de lunes a domingo (12:00 a 23:00) y SHALL mostrar el estado actual del restaurante ("Abierto" + "cierra 23:00").

#### Escenario: SCENARIO-VISIT-001 - Lista de 7 dias
- GIVEN la seccion Visitanos renderizada
- WHEN se cuentan los dias listados
- THEN aparecen los 7 dias de la semana (Lunes a Domingo)
- AND cada dia muestra el rango "12:00 - 23:00" usando guion normal

#### Escenario: SCENARIO-VISIT-002 - Estado visible y no solo por color
- GIVEN la seccion Visitanos
- WHEN el visitante ve el estado
- THEN aparece el texto "Abierto" y "cierra 23:00"
- AND el estado no depende solo de un color (se usa texto + opcionalmente un punto neutro)

### REQ-VISIT-002: Rango de precio en COP
La seccion SHALL mostrar el rango "$40.000 - $60.000 COP por persona" usando guion normal, sin em-dash ni en-dash.

#### Escenario: SCENARIO-VISIT-003 - Rango visible
- GIVEN la seccion Visitanos renderizada
- WHEN se busca el dato de precio
- THEN aparece el texto "$40.000 - $60.000 COP por persona"
- AND no se usan numeros fake-perfectos (99.99% o similares)

### REQ-VISIT-003: CTA de reserva por Instagram
La seccion SHALL incluir un enlace a Instagram (con `target="_blank"` y `rel="noopener noreferrer"`) etiquetado "Escribenos por Instagram" o "Reservar tu mesa", con `aria-label` descriptivo y area tocable >= 44x44 px.

#### Escenario: SCENARIO-VISIT-004 - Enlace Instagram accesible
- GIVEN la seccion Visitanos
- WHEN el visitante activa el enlace de reserva
- THEN abre Instagram en una pestana nueva
- AND el enlace tiene `rel="noopener noreferrer"`
- AND el area tocable es >= 44x44 px

#### Escenario: SCENARIO-VISIT-005 - Texto del enlace sin em-dash
- GIVEN el texto del CTA de reserva
- WHEN se inspecciona el texto visible
- THEN no contiene `-` ni `-` (em-dash o en-dash)
- AND el texto es uno de: "Escribenos por Instagram" o "Reservar tu mesa"
