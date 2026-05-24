# ADR 0003 — Vertical inicial: coffee equipment

**Fecha:** 2026-05-13
**Estado:** Aceptada (revisión obligatoria a los 90 días con datos en mano)

## Contexto

Tras research del agente "Niche shortlist research" (ver
`market/niches/shortlist.md`, commit `ab5c5a1`), 3 verticales emergieron
como finalistas:

| # | Vertical | Score agente | Recomendación agente |
|---|---|---|---|
| 1 | Outdoor cooking (pellet smokers, BBQ) | 26/30 | Sí (primera elección del agente) |
| 2 | Coffee equipment (espresso, grinders, accesorios) | 25/30 | Segundo |
| 3 | Aquariums / fishkeeping | 24/30 | Tercero |

Claude analizó la recomendación del agente y propuso al operador elegir
**coffee** sobre **outdoor cooking**. Operador aceptó la recomendación.

## Decisión

**Vertical inicial: coffee equipment.**

Sub-segmentos cubiertos: máquinas espresso (consumer + prosumer),
grinders, accesorios (tampers, scales, knock boxes, filters, descalers),
brewing methods adyacentes (pour over, AeroPress, French press) según
muestre datos.

## Razones para preferir coffee sobre outdoor cooking

1. **Estacionalidad alineada con timeline de revenue.** Coffee tiene
   curva plana todo el año + pico discreto Black Friday/Christmas,
   justo cuando deberíamos estar viendo primer tráfico orgánico (mes
   5-7). Outdoor cooking entra en off-season en otoño-invierno US, mal
   timing para nuestro target de revenue <6 meses.

2. **Buyer iterativo > buyer único.** Comprador de espresso compra
   máquina ($300-500), después grinder ($150-300), después accesorios,
   y al año hace upgrade ($800-1500). Cada upgrade dispara nueva
   sesión orgánica. Pellet smoker es típicamente compra única + algunos
   accesorios menores. El comprador iterativo compone 3-5x más revenue
   por sesión orgánica sobre 12-24 meses.

3. **Dataset técnico más denso.** Coffee specs (boiler type, group head,
   PID, bar pressure, pre-infusion, burr material, motor watts, step vs
   stepless) son más comparables y nuanced que outdoor cooking (BTU,
   sq.in., hopper capacity). Más atributos comparables = más
   combinaciones programáticas con valor real, mejor encaje con perfil
   data scientist.

4. **Mercado global, no solo US.** Espresso es fenómeno mundial con
   comunidad fuerte en Europa, Australia, LatAm, Asia. Pellet smokers
   son ~95% mercado US. Permite expansión geográfica futura (Amazon ES,
   Amazon UK, programas afiliados europeos) sin pivotar contenido.

5. **Backbone narrativo: operador colombiano.** Origen del operador
   en país productor de café genera credibilidad orgánica latente. No
   es factor crítico de SEO ahora — el contenido inicial será
   técnico-comparativo, no editorial — pero es palanca activable más
   adelante para: "about us" del sitio, contenido sobre granos
   específicos, colaboraciones futuras con productores colombianos,
   expansión a un sitio adyacente sobre coffee origins, etc.

## Trade-offs aceptados

- **Competencia SERP más fuerte** que outdoor cooking. coffeegeek
  (DR estimada ~50+), tomsguide (DR 80+), wirecutter dominan algunas
  queries cabeza. Mitigación: foco en KGR long-tail (allintitle <10)
  donde la SERP está vacía, no en head terms. El propio research
  confirmó SERP empty para "Breville Bambino vs Gaggia Classic",
  "best espresso machine under 300 with grinder", etc.
- **Precio promedio típico menor** ($150-1500 coffee vs $300-1500
  outdoor cooking). Compensado por buyer iterativo + volumen agregado
  mayor del nicho.
- **Comunidad técnica olfatea AI content sin valor.** Mitigación: cada
  página parte de datos reales (specs verificables) y proporciona
  herramienta de decisión (matrices, filtros), no opiniones generadas.

## Criterios de éxito (revisión obligatoria a 90 días)

| Mes | KPI mínimo aceptable |
|---|---|
| 1 | Sitio publicado, ≥100 páginas indexadas. **NO aplicar a Amazon Associates todavía** (ver Update abajo). |
| 2 | ≥500 páginas indexadas, primer click orgánico. |
| 3 | ≥1000 impresiones/día Search Console, ≥500 visitas/mes documentadas. **Aplicar a Amazon Associates US ahora.** |
| 4 | Aplicación Associates aprobada condicionalmente; primer revenue ($1-50). |
| 5-9 | Reloj de 180 días / 3 ventas calificadas corriendo. |

## Update 2026-05-13 — ajuste de timing por research de issues #16/#17

Tras research consolidado (ver `research/amazon-associates-from-panama.md`
y `research/payment-receivers-panama.md`), dos hallazgos cambian el
timing operativo sin cambiar la decisión de vertical:

1. **Aplicación a Associates se mueve de mes 1 a mes 3-4.** Amazon
   Associates US tiene regla de **3 ventas calificadas en 180 días**
   post-aprobación condicional, o cierre automático sin appeal. Aplicar
   demasiado temprano (sin tráfico orgánico aún) gasta el reloj de 180
   días en un sitio que recién está indexándose. Esperar a tener ≥500
   visitas/mes documentadas antes de aplicar maximiza las chances de
   cumplir el threshold de 3 ventas.

2. **Payment method en fases.**
   - **Fase 1 (payouts <$200/mes, meses 4-6)**: configurar Amazon
     Associates pago como **Gift Card** ($10 mínimo, $0 fees). Saldo
     se usa para reinvertir en compras del proyecto (herramientas,
     suscripciones, productos de coffee equipment para reseñas
     auténticas).
   - **Fase 2 (payouts >$500/mes, meses 7+)**: abrir cuenta **Payoneer**
     (única opción confirmada para residentes Panamá; Wise no opera
     allí, Global66 zona gris con reportes de bloqueos). Configurar
     Amazon como direct deposit a virtual US account de Payoneer.
     Retirar a banco panameño USD cuando saldo acumulado >$500-1000.

3. **W-8BEN — respuesta crítica.** En el tax interview de Amazon,
   responder **"No"** a "Do you perform services in the United States?".
   Esto clasifica las comisiones como non-US source income (IRC §861)
   y resulta en **0% withholding**. Panamá NO tiene tax treaty con US,
   pero este mecanismo funciona sin treaty. **No marcar treaty benefits
   en Part II del W-8BEN** (sería incorrecto y puede gatillar review).

4. **Tributación Panamá**: aunque withholding US sea 0%, las comisiones
   generadas por trabajo prestado desde Panamá pueden ser tributables
   localmente. Régimen territorial es ambiguo en este caso. **Consultar
   contador panameño antes de mes 6 cuando empiecen los payouts**.

## Condiciones de pivot dentro del vertical

- Mes 3 con <100 impresiones/día → cambiar de sub-segmento (de espresso
  a manual brewing methods, p.ej.) antes de pivotar vertical completo.
- Mes 4 sin revenue → considerar pivot a vertical #2 (outdoor cooking)
  reutilizando infra técnica.

## Validaciones pendientes antes de generar contenido a escala

Tracked en issues separadas:

1. Verificar comisión Kitchen (4.5%? 3%?) en Amazon Associates Central
   tras login del operador.
2. Run Ubersuggest free tier (o KeywordTool.io) sobre 15 keywords
   cabeza de coffee para confirmar volúmenes reales.
3. Sample manual de 10 long-tails con `allintitle:` confirmando KGR <10.

Hasta resolver estas 3, no comprometemos build de infra ni generación
masiva de contenido.

## Alternativas descartadas

- **Outdoor cooking**: ver razones para preferir coffee. Queda como
  vertical #2 disponible si pivot del mes 4.
- **Aquariums**: comisión Pet Products con mayor incertidumbre
  (3% vs 8% según fuente), tickets más bajos en sub-segmentos
  accesibles (heaters, filtros HOB), riesgo de devoluciones por damage
  en tanks grandes.
