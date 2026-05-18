# 07 — Roadmap a 90 días

> Plan accionable desde **lunes 18 de mayo 2026** hasta **domingo 16 de agosto 2026**. Fechas reales, no relativas. Pensado para los dos solos, sin equipo, con trabajos / vida actual de fondo.
>
> **Objetivo realista a día 90 (16 agosto 2026):** primer cliente firmado del producto 2, funnel operativo end-to-end probado al menos una vez, 5 000-12 000 € facturados.

## Estado de partida (lunes 18 mayo)

Lo que YA está hecho y no requiere tiempo:
- Nicho confirmado: inmobiliario España para inversores LATAM
- Cami adentro (confirmado 18 mayo)
- 11 documentos de estrategia y operación
- 11 plantillas operativas redactadas (top, mid y bottom funnel)
- Landing v1 construida en Next.js
- Marca y naming: top 3 candidatos identificados

Lo que NO está hecho y bloquea avanzar:
- Marca final y dominio comprado
- Estructura legal y fiscal de la entidad
- Contrato revisado por abogado
- Setup técnico (Supabase, email, Stripe, n8n)
- PDF lead magnet diseñado y exportado
- Primer tráfico

## Vista de pájaro de los 90 días

| Mes | Fechas | Tema | Resultado esperado |
|---|---|---|---|
| Mes 1 | 18 may - 14 jun | Setup legal + técnico + brand | Sistema listo para captar primer lead |
| Mes 2 | 15 jun - 14 jul | Tráfico + primeras llamadas | 30-60 aplicaciones, 5-10 llamadas, 1-3 propuestas |
| Mes 3 | 15 jul - 16 ago | Primera firma + ejecución | 1-2 contratos firmados, retainer ofrecido a referidos cero |

---

## MES 1 — Setup (lun 18 may → dom 14 jun)

### Semana 1: 18-24 mayo — Decisiones que destraban todo

**Owner principal:** Andrés y Cami juntos.

- [ ] **Lun 18 may** — Llamada de kickoff (90 min): los dos revisan el index, alinean visión y miedos.
- [ ] **Mar 19 may** — Decidir marca final entre los 3 candidatos de `09-marca-naming.md`. Verificar disponibilidad de dominio `.com` y handles sociales.
- [ ] **Mié 20 may** — Comprar dominio (~15 €/año) + reservar handles Instagram, LinkedIn, X, YouTube.
- [ ] **Jue 21 may** — Contactar 3 abogados mercantiles colegiados en Málaga/Madrid para presupuesto de revisión de contrato + asesoría de estructura societaria.
- [ ] **Vie 22 may** — Reunión de seguimiento de los dos (30 min). Cami queda con un abogado para reunirse la próxima semana.
- [ ] **Sáb-Dom** — Andrés escribe el deck de 1 página para el abogado: qué hacemos, cómo facturamos, jurisdicciones involucradas.

**Hito de semana:** dominio asegurado y abogado contactado.

### Semana 2: 25-31 mayo — Estructura legal

**Owner principal:** Cami (España), Andrés en apoyo.

- [ ] **Lun 26 may** — Reunión con abogado elegido (1h, ~150 €). Validar:
  - Estructura societaria recomendada (SL española vs autónomo)
  - Régimen fiscal (IVA, IRPF, retenciones)
  - Compatibilidad de prestación remota desde LATAM
  - Necesidad de registro como API en CCAA
  - Revisión del contrato base
- [ ] **Mar 27 may** — Cami inicia trámites de constitución de la entidad recomendada (notario, registro mercantil). ~500-1 000 € en gastos notariales, 2-3 semanas hasta tener CIF operativo.
- [ ] **Mié 28 may** — Andrés gestiona estructura en su lado LATAM si aplica (autónomo en Colombia o estructura paralela).
- [ ] **Jue 29 may** — Andrés contacta 2 asesores fiscales LATAM-España (con experiencia en convenios de doble imposición).
- [ ] **Vie 30 may** — Reunión asesor fiscal (~150 €). Definir flujo de facturación, retenciones y obligaciones cruzadas.
- [ ] **Sáb-Dom** — Cami trabaja en política de privacidad, cookies y términos del sitio web (usar Iubenda o redactar a mano y validar con abogado).

**Hito de semana:** trámites de entidad en curso, política de privacidad lista para publicar.

### Semana 3: 1-7 junio — Setup técnico

**Owner principal:** Andrés.

- [ ] **Lun 1 jun** — Cuentas creadas: Supabase, Vercel, Stripe (modo test), MailerLite, Cal.com, Notion workspace, Tally, Documenso o PandaDoc, Telegram bot.
- [ ] **Mar 2 jun** — Conectar dominio comprado a Vercel. Configurar email transaccional (Resend o Mailgun) con dominio propio.
- [ ] **Mié 3 jun** — Subir landing v1 al dominio definitivo. Configurar Google Analytics 4, Microsoft Clarity, píxel de Meta y Google Ads (todavía no se enciende).
- [ ] **Jue 4 jun** — Configurar el cuestionario en Tally con copy de `plantillas/03-cuestionario-aplicacion.md`. Conectar webhook a n8n.
- [ ] **Vie 5 jun** — Configurar n8n con el flujo de cualificación: Tally → Supabase → Claude API → routing email. Probar con 3 leads ficticios.
- [ ] **Sáb 6 jun** — Cargar secuencia de 5 emails de nurture en MailerLite.
- [ ] **Dom 7 jun** — End-to-end test: aplicar al cuestionario uno mismo, verificar que el cuestionario → cualificación → email automático funciona.

**Hito de semana:** stack técnico funcional probado end-to-end con datos ficticios.

### Semana 4: 8-14 junio — Lead magnet y polish final

**Owner principal:** Andrés (contenido), Cami (revisión).

- [ ] **Lun 8 jun** — Andrés diseña el PDF "8 errores" en Canva con copy de `plantillas/01-pdf-8-errores.md`.
- [ ] **Mar 9 jun** — Cami revisa contenido del PDF y valida datos legales/fiscales con el abogado.
- [ ] **Mié 10 jun** — Exportar PDF final. Subir a almacenamiento. Configurar entrega automática vía MailerLite.
- [ ] **Jue 11 jun** — Cami recibe propuesta del abogado del contrato revisado (presupuesto estimado 1 000-1 500 €). Pagar y agendar entrega para semana siguiente.
- [ ] **Vie 12 jun** — Crear plantilla maestra del Notion del cliente con la estructura de `plantillas/09-plantilla-notion-cliente.md`.
- [ ] **Sáb 13 jun** — Stripe en modo producción. Crear productos: "Honorarios producto 2 - 50% inicial" (4 500 €), "Honorarios producto 2 - 50% final" (4 500 €), "Retainer mensual" (300 €).
- [ ] **Dom 14 jun** — Revisión integral del sistema. Lista de checks pendientes y bloqueadores.

**Hito de fin de mes 1:** sistema completo operativo, listo para recibir el primer lead real. Cero clientes todavía, cero ingresos. Coste estimado mes 1: 1 500-2 500 € (dominio, notario, abogado, asesor fiscal, herramientas SaaS primeros pagos).

---

## MES 2 — Tráfico y primeras llamadas (lun 15 jun → lun 14 jul)

### Semana 5: 15-21 junio — Encendido de tráfico orgánico + ads conservadores

**Owner principal:** Andrés.

- [ ] **Lun 15 jun** — Contrato revisado por abogado en mano. Cami valida que la versión final no rompe el modelo. Subir a Documenso como plantilla con variables.
- [ ] **Mar 16 jun** — Activar Google Ads con presupuesto inicial **30 €/día** (no 50, conservador). Solo 1 grupo de anuncios al principio: keywords de geografía LATAM + España (ver `11-flujo-captura-cierre.md` etapa 1).
- [ ] **Mié 17 jun** — Andrés publica primer post largo en LinkedIn explicando la golden visa post-extinción y las alternativas reales. Link al PDF.
- [ ] **Jue 18 jun** — Cami graba primer Reel/Short en España: caminata por barrio premium con comentario sobre €/m² real. Subir a Instagram + LinkedIn + YouTube Shorts.
- [ ] **Vie 19 jun** — Revisión semanal de métricas: CPC, CTR, captures por canal.
- [ ] **Sáb-Dom** — Empezar a redactar 5 artículos largos para el blog: "Golden visa eliminada: ¿y ahora?", "8 errores...", "Comprar piso en España desde México paso a paso", "Marbella micromercados", "Estructura fiscal LATAM-España".

**Hito de semana:** primer tráfico real fluyendo. Objetivo: 5-15 emails capturados.

### Semana 6: 22-28 junio — Iterar y nutrir

**Owner principal:** Andrés.

- [ ] **Lun 22 jun** — Análisis de cohorte primera semana: qué keywords convierten, qué landing variant funciona mejor, qué emails de nurture tienen mejor open rate.
- [ ] **Mar 23 jun** — Si CTR <2% en Google Ads, ajustar keywords y copy de anuncios. Si CPC >3 €, restringir match types.
- [ ] **Mié 24 jun** — Publicar primer artículo largo del blog (1 500-2 500 palabras, SEO-optimizado).
- [ ] **Jue 25 jun** — Andrés segunda intervención en LinkedIn. Cami segundo Reel.
- [ ] **Vie 26 jun** — Si hay primera aplicación al cuestionario: validar que el sistema funciona end-to-end con caso real. Si la app es tier A, agendar primera llamada de diagnóstico.
- [ ] **Sáb-Dom** — Primer "ultra check" del sistema: ¿algún bug, fricción, abandono inesperado?

**Hito de semana:** 15-30 emails capturados acumulados, 1-3 aplicaciones al cuestionario.

### Semana 7: 29 jun - 5 jul — Primeras llamadas

**Owner principal:** Andrés (llamadas) + Cami (preparación de listings).

- [ ] **Lun 29 jun** — Subir presupuesto Google Ads a **50 €/día** si CAC en email se mantiene <5 €.
- [ ] **Mar 30 jun** — Primera llamada de diagnóstico real. Usar script de `plantillas/05-script-llamada-diagnostico.md`. Grabar con consentimiento.
- [ ] **Mié 1 jul** — Post-mortem de la llamada con Cami. ¿Qué funcionó del script, qué hay que ajustar?
- [ ] **Jue 2 jul** — Si la llamada fue positiva, enviar propuesta dentro de 24h.
- [ ] **Vie 3 jul** — Tercer post en LinkedIn. Tercer Reel.
- [ ] **Sáb-Dom** — Publicar segundo artículo de blog.

**Hito de semana:** 1-2 propuestas enviadas, 2-5 llamadas de diagnóstico hechas.

### Semana 8: 6-12 julio — Cerrar el ciclo

**Owner principal:** Andrés + Cami.

- [ ] **Lun 6 jul** — Análisis de mes 2 completo: cuántos emails, aplicaciones, llamadas, propuestas, firmas.
- [ ] **Mar 7 jul** — Si hay propuestas pendientes, seguimiento día 4 según `plantillas/07-email-propuesta.md`.
- [ ] **Mié 8 jul** — Tercer artículo de blog.
- [ ] **Jue 9 jul** — Si NO hay ninguna propuesta firmada al cerrar mes 2: análisis crítico. ¿Es el copy de las propuestas? ¿El honorario? ¿La calidad de los leads? ¿La conversión de la llamada?
- [ ] **Vie 10 jul** — Reunión Andrés-Cami de revisión de mes 2. Decisiones de ajuste para mes 3.
- [ ] **Sáb-Dom** — Si hubo firma: iniciar onboarding del primer cliente. Si no: refinamiento del funnel.

**Hito de fin de mes 2:** 30-80 emails acumulados, 5-15 aplicaciones, 3-8 llamadas, 1-3 propuestas, 0-1 firma. Coste mes 2: ~1 500 € en ads + ~200 € en herramientas. Ingresos potenciales: 0-4 500 € (un primer plazo si hay firma).

---

## MES 3 — Primer cliente firmado y ejecución (mar 15 jul → dom 16 ago)

### Semana 9: 13-19 julio — Onboarding del primer cliente

**Owner principal:** Andrés (briefing) + Cami (ejecución).

- [ ] **Lun 13 jul** — Si ya hay firma desde mes 2: sesión de briefing con el primer cliente (90 min). Llenar plantilla de `plantillas/09-plantilla-notion-cliente.md`.
- [ ] **Mar 14 jul** — Si NO hay firma: doblar esfuerzos en tráfico. Subir Google Ads a 70 €/día. Tres días intensos de outreach en LinkedIn 1-a-1 a perfiles relevantes.
- [ ] **Mié 15 jul** — Cami arranca búsqueda activa de inmuebles del cliente firmado. Mín 10 inmuebles revisados en 5 días.
- [ ] **Jue 16 jul** — Cuarto artículo de blog.
- [ ] **Vie 17 jul** — Bitácora semanal del cliente actualizada. Llamada con cliente (30 min).
- [ ] **Sáb-Dom** — Andrés trabaja en YouTube primer video largo (10-15 min): "Cómo comprar piso en España desde LATAM en 2026".

**Hito de semana:** primer cliente en fase de búsqueda activa.

### Semana 10: 20-26 julio — Escalar lo que funciona

**Owner principal:** Andrés y Cami balanceando lead nuevo + ejecución.

- [ ] **Lun 20 jul** — Si métricas de mes 2 son saludables, subir Google Ads a **70-100 €/día** (~2 000-3 000 €/mes presupuesto).
- [ ] **Mar 21 jul** — Cliente firmado en semana 6 de búsqueda (si firmó a tiempo). Shortlist de 8-10 inmuebles presentada.
- [ ] **Mié 22 jul** — Publicar primer YouTube. Promover en LinkedIn, Instagram y newsletter inicial.
- [ ] **Jue 23 jul** — Si hay nuevas firmas, repetir ciclo de onboarding.
- [ ] **Vie 24 jul** — Quinto artículo de blog.
- [ ] **Sáb-Dom** — Refinar plantillas según aprendizajes reales con clientes (probable: cuestionario, script de llamada, email de propuesta).

**Hito de semana:** 2-3 clientes en pipeline distintas etapas, primer YouTube publicado.

### Semana 11: 27 jul - 2 ago — Pulir y proteger calidad

**Owner principal:** Cami (ejecución), Andrés (sistemas).

- [ ] **Lun 27 jul** — Primera revisión real del retainer como producto: ¿se sostiene el precio de 300 €/mes con la carga operativa que vemos? Ajustar si necesario.
- [ ] **Mar 28 jul** — Cami avanza primer cliente hacia visitas físicas. Documentar el proceso para futuras automatizaciones.
- [ ] **Mié 29 jul** — Andrés trabaja en automatizaciones que no se hicieron en mes 1: pago vía Stripe sin fricción, webhooks Documenso → Notion → email bienvenida.
- [ ] **Jue 30 jul** — Análisis de los costes operativos reales por cliente. ¿Cuánto está costando atender al primer cliente realmente?
- [ ] **Vie 31 jul** — Sexto artículo de blog.
- [ ] **Sáb-Dom** — Andrés escribe primer email para newsletter mensual (los que no aplicaron al cuestionario quedan ahí).

**Hito de semana:** sistema más robusto, calidad del servicio del primer cliente vigilada.

### Semana 12: 3-9 agosto — Cierre de los 90 días

**Owner principal:** Andrés y Cami juntos.

- [ ] **Lun 3 ago** — Mini-retreat estratégico (4h videollamada): ¿qué aprendimos en 90 días? ¿qué seguir, ajustar, cortar?
- [ ] **Mar 4 ago** — Definir KPIs del trimestre siguiente con números concretos basados en data real, no aspiracionales.
- [ ] **Mié 5 ago** — Decidir si arrancar a redactar el curso digital de 497 € (producto 1) en mes 4. Solo si producto 2 está fluyendo.
- [ ] **Jue 6 ago** — Publicar segundo YouTube.
- [ ] **Vie 7 ago** — Andrés graba video testimonial con el primer cliente (si está avanzado en la operación y dispuesto).
- [ ] **Sáb-Dom** — Hacer balance financiero de los 90 días.

**Hito de fin de mes 3 (sáb 16 ago):** primer ciclo cerrado. Sistema validado. Decisiones del trimestre 2 tomadas con base en data.

---

## Resultados esperados al día 90 (sáb 16 agosto 2026)

### Camino "vamos bien"
- 1-3 contratos firmados del producto 2
- 5 000-12 000 € facturados (primeros plazos)
- 80-200 emails en lista
- Funnel completo probado end-to-end al menos una vez
- Andrés y Cami con energía, sin resentimiento, con claridad para trimestre 2

### Camino "ajustar"
- 0 contratos pero pipeline real: 5+ propuestas enviadas, 10+ llamadas hechas
- Aprendizajes claros sobre qué cuesta convertir
- Iterar mensaje, oferta o canal

### Camino "stop & reset"
- 0 propuestas enviadas porque 0 llamadas con encaje
- Funnel matemáticamente roto: <30 emails capturados en todo el periodo
- Conflictos entre los dos sin resolver
- Conversación honesta: pivotar nicho dentro del mismo dominio (de inmobiliario inversor a inmobiliario migrante por ejemplo), o cierre limpio sin orgullo herido

---

## Inversión total estimada en 90 días

| Concepto | Coste estimado |
|---|---|
| Constitución entidad + notario | 500-1 000 € |
| Abogado mercantil (consulta + revisión contrato) | 1 000-1 500 € |
| Asesor fiscal (consulta inicial) | 150-300 € |
| Dominio + handles + hosting + email | 100-200 € |
| Herramientas SaaS 3 meses | 200-400 € |
| Google Ads 3 meses | 2 500-4 500 € |
| Diseño PDF y materiales (Canva Pro, fotos) | 100-200 € |
| Imprevistos | 500 € |
| **Total** | **~5 000-8 600 €** |

**Punto de equilibrio:** 1-2 contratos firmados con primer plazo cobrado (4 500-9 000 €) cubre el setup. A partir del cliente 3 ya hay beneficio operativo claro.

---

## Después del día 90

Si vamos bien:
- **Día 90-180 (16 ago - 15 nov 2026):** doblar canal que funciona, redactar curso digital producto 1, primer cliente en retainer, primer referido firmado.
- **Día 180-365 (16 nov 2026 - 18 may 2027):** curso digital lanzado, ~5 clientes producto 2 activos mensualmente, primer empleado part-time (VA o asistente de Cami).
- **Año 2 (mayo 2027 - mayo 2028):** 10 clientes/mes producto 2 + 30-50 clientes producto 1, MRR retainer 8-12 k€, sistema funcionando sin atadura 24/7.

**La meta del año 1 NO es llegar a 20 k€/mes.** Es llegar a 5 000-8 000 €/mes consistente con margen sano, los dos disfrutando, y bases para llegar a 20 k€ en año 2 sin reventarse.
