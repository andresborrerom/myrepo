# Interactions log — operator ↔ Claude sessions building baristapath

> **Propósito**: capturar los momentos pedagógicamente valiosos de las sesiones operador↔Claude. NO es un changelog de código (eso vive en git log). Es un registro del **razonamiento**, los **pivots**, los **debates** y los **takeaways** que vale la pena enseñar a alguien que quiera construir su propio activo afiliado con IA como co-pilot.
>
> **Audiencia**: el agente generador de cursos (`courses-source/AGENT_PROMPT.md`) usa este log como input principal. También sirve como retrospectiva interna del operador.
>
> **Convención de entry**:
>
> ```
> ## YYYY-MM-DD — <título corto>
>
> **Contexto**: qué problema apareció / qué decisión había que tomar.
> **Decisión / acción**: qué se hizo concretamente.
> **Razonamiento**: el WHY (la parte que se enseña).
> **Resultado**: qué pasó después.
> **Takeaway pedagógico**: lección generalizable para un estudiante.
> ```
>
> Las entries marcadas (retroactiva) se reconstruyeron después del hecho desde commits + ADRs + memoria de las sesiones. A partir de 2026-05-25, las entries se van escribiendo en caliente al final de cada sesión clave.
>
> **Mapeo a capítulos del curso**: cada entry pertenece a uno de 7 capítulos temáticos (ver índice al final del archivo). El agente generador del curso (`courses-source/AGENT_PROMPT.md`) usa ese mapeo para organizar las lecciones. Cuando se agrega una entry nueva, anotarla en el índice del final.

---

## 2026-05-13 — Decisión inicial del nicho: por qué coffee equipment (retroactiva)

**Contexto**: el operador llegó con ambición de armar un activo afiliado pero sin nicho elegido. Tres candidatos en mesa: cocina, café, productividad. Tentación de elegir "el que más le gustaba" (productividad).

**Decisión / acción**: rechazamos elegir por preferencia personal. Despachamos research en 11 verticales con scoring 30 puntos sobre 6 ejes (volumen, comisión, competencia, autoridad needed, AOV, longevidad). Coffee equipment ganó 26/30.

**Razonamiento**: cuando arrancás un negocio basado en SEO, tu propio sesgo de "lo que me gusta" es ruido. La data importa más que la pasión, especialmente cuando vas a producir cientos de páginas. Coffee equipment ganó porque (a) AOV ~$300-1,500 cubre comisión 3-4.5% con menos volumen, (b) buying intent denso y verificable, (c) nicho "explicable" (specs > opinión), (d) baja diferenciación de competidores top → hueco para entrar.

**Resultado**: ADR 0003 firmado. Compromiso de no pivotear de nicho hasta mes 6 (revisión 90 días). Si pivoteamos, ya tenemos shortlist de respaldo (outdoor cooking estaba 2do).

**Takeaway pedagógico**: el primer ejercicio del curso debería ser "vamos a probar que tu nicho preferido NO es el mejor para vos, según data". El framework de scoring es replicable. La disciplina de no elegir por gusto es la lección.

---

## 2026-05-13 — Stack técnico: por qué Astro + Cloudflare Pages, no WordPress (retroactiva)

**Contexto**: la elección default del nicho "afiliados" es WordPress (millones de tutoriales, plugins de afiliados, themes listos). El operador tenía background técnico (data scientist), no editorial.

**Decisión / acción**: Astro 5 estático + Cloudflare Pages, código en monorepo Git. ADR 0004 lo formalizó.

**Razonamiento**: WordPress es un excelente CMS y un MAL host de assets estáticos. Para SEO programático con 500-1,000 páginas, querés (a) tiempo de carga <1s sin optimización (Astro static lo da gratis), (b) deploys reproducibles con CI (Astro + GitHub Actions vs WordPress backups), (c) ningún plugin que se actualice y rompa cosas, (d) cero costo de hosting hasta tráfico serio (CF Pages free tier). El "costo" es que necesitás background técnico — perfecto para perfil del operador, INVÁLIDO para 95% del mercado de cursos.

**Resultado**: stack quedó fijo. Build time consistente <2s para 268 páginas. CI verde semanas seguidas. Tested: bajamos a 0 errores de deploy después del setup inicial.

**Takeaway pedagógico**: si el curso es para perfil técnico, esta elección es lección. Si es para perfil no-técnico, hay que armar versión paralela con un CMS más amigable (Webflow + Make? Framer? un wrapper de Astro tipo Pages CMS?). NO se debe forzar la elección Astro al estudiante no-técnico.

---

## 2026-05-14 — KGR validation antes de escalar contenido (retroactiva)

**Contexto**: tentación de empezar a publicar páginas inmediatamente después de elegir nicho. Velocity > validation. Claude propuso parar primero.

**Decisión / acción**: dos research issues bloqueantes — #20 (Ubersuggest volumes sobre 15 keywords) y #21 (allintitle KGR sobre 12 long-tails). Operador hizo ambas a mano (15-30 min cada una). Resultado: 12/12 KGR <0.25 (golden) en long-tails. Volúmenes 100-1,000/mes consistentes.

**Razonamiento**: KGR (Keyword Golden Ratio) = `allintitle / volume`. <0.25 significa que hay menos de un cuarto de páginas dedicadas al keyword vs el volumen mensual. Es proxy crudo pero efectivo de "low competition, real demand". Sin verificar, podés gastar 50 horas escribiendo páginas que nunca rankeen. Con verificar, sabés que el patrón funciona ANTES de invertir.

**Resultado**: validación verde permitió escalar a 51 → 268 páginas con confianza. Si hubieran salido rojas, habríamos pivoteado de nicho con $0 invertido (vs $0 + 50 horas perdidas).

**Takeaway pedagógico**: KGR validation es **el gate** que separa cursos honestos de cursos predatorios. Cualquier curso que te diga "escribí 500 páginas y el tráfico llega" sin enseñarte primero validar KGR es estafa.

---

## 2026-05-14 — Dominio: Cloudflare Registrar over GoDaddy/Namecheap (retroactiva)

**Contexto**: comprar dominio. Defaults populares son GoDaddy ($12-15/año con upsells agresivos) y Namecheap ($11/año, limpio). Operador no conocía Cloudflare Registrar.

**Decisión / acción**: Cloudflare Registrar at-cost $10.44/año, auto-renew, WHOIS privacy gratis. Compra de `baristapath.com` en 5 min.

**Razonamiento**: Cloudflare vende dominios al costo del registry (sin markup) como loss-leader de su stack. Para nosotros, además de ahorrar $2-5/año, el integration con CF Pages es 0-friction (DNS auto-detected, SSL auto-provisioned). Para registrars con markup, ahorrarías $3 pero perderías 30 min configurando nameservers.

**Resultado**: dominio + SSL + DNS funcionando en <10 min. No tuvimos que tocar DNS manualmente nunca. Cuando vinimos a comprar `filamentpath.com` (mes después), repetimos exactamente el mismo flow.

**Takeaway pedagógico**: la primer compra del proyecto es señal de cómo vas a operar. Si caes en upsells de GoDaddy desde día 0, vas a caer en upsells todo el camino. Elegir registrar at-cost es alineación filosófica + ahorro real.

---

## 2026-05-15 — Design benchmark research ANTES de rediseño UX (retroactiva)

**Contexto**: el operador percibió "el sitio se ve básico". Tentación: empezar a tocar CSS, agregar fotos, cambiar paleta. Claude propuso research primero.

**Decisión / acción**: despachado agente con WebFetch a 8 sitios afiliados top (Wirecutter, Serious Eats, Home Grounds, RTINGS, etc.). Output: doc `research/design-benchmark.md` con tabla de patterns table-stakes (90% del nicho los tiene) vs diferenciadores (10% del nicho los tiene). Recomendaciones priorizadas por ROI.

**Razonamiento**: los patterns table-stakes son los que SI te faltan, te hacen ver no-profesional (verdict box, byline, methodology link, multi-tier picks, related content). Los diferenciadores son donde podés ganar (calculator, quiz, glossary). Sin benchmark, gastarías tiempo en lo bonito vs lo necesario.

**Resultado**: 4 commits siguientes (UX batch A, batch B, calculator, quiz) implementaron table-stakes + 2 diferenciadores únicos del nicho. Sitio dejó de "verse básico" en ~4 horas de trabajo.

**Takeaway pedagógico**: AI brilla en tareas de benchmarking estructurado. Despachar agente a "mirá 8 competidores y dame una tabla priorizada" es uso óptimo. Operador NO debería estar visitando 8 sitios y tomando notas manuales. Esa hora se invierte mejor en decidir qué implementar.

---

## 2026-05-17 — robots.txt FLIPPED a Allow: el momento "soft launch" (retroactiva)

**Contexto**: el sitio había estado en `robots.txt = Disallow:*` desde día 1 como protección durante construction. ¿Cuándo dar el flip?

**Decisión / acción**: cuando llegamos a 176 páginas + autolink glossary corriendo + methodology page publicada + privacy + about. Flip + sitemap referenciado en robots.txt.

**Razonamiento**: Google sólo te da una primera impresión de tu sitio. Si te indexa con 50 páginas medias-vacías, te clasifica como "thin content site" y es difícil revertir esa percepción. Mejor esperar a tener masa crítica + señales de calidad (methodology, glossary, autolinking) y dar el flip cuando "se ve completo". El threshold mental fue 175+ páginas + 3 señales de E-E-A-T.

**Resultado**: Gate 1 del deployment-to-revenue runbook cerrado. Sitio empezó a indexarse con perfil "calidad razonable". Diferencia de cuánto se ranquea aún por verse (mes 1-3 del clock).

**Takeaway pedagógico**: contra-intuitivamente, NO querés exposure temprana en SEO. El "build in silence, launch when solid" aplica más fuerte en sitios de contenido que en SaaS. Lección anti-FOMO crítica.

---

## 2026-05-24 — Amazon Associates conditional approval + el reloj de 180 días (retroactiva)

**Contexto**: aplicamos a Amazon Associates US. Aprobaron conditional. Status: Unblocked. Pero hay un asterisco: **3 sales en 180 días o cancelan la cuenta**.

**Decisión / acción**: tag real `baristapath79-20` reemplazado en todos los links del sitio (commit `cabc10a`). W-8BEN signed (Income type: Service, US presence: No). Method de payment: Gift Card (mínimo $10 vs $100 wire transfer).

**Razonamiento**: el reloj de 180 días es **la métrica más importante del proyecto** durante los primeros 6 meses. NO es revenue, NO es páginas, NO es backlinks. Es: ¿llegamos a 3 sales antes de que cierre el clock? Si no, todo el resto del trabajo se evapora (cuenta cancelada → tag se invalida → hay que aplicar de cero en 60 días de espera).

**Resultado**: el reloj corre. A día de cierre del sprint (2026-05-25), 0 sales. Quedan ~175 días.

**Takeaway pedagógico**: **Amazon Associates no es "free money"**. Es un programa con ToS estrictos. Las versiones "rich quick" del nicho no enseñan esto. El curso debe enseñar: aplicá CON un sitio ya construido y con tráfico potencial, no como primera acción.

---

## 2026-05-24 — Refactor a monorepo `affiliate/` cuando aparece 2do nicho (retroactiva)

**Contexto**: ADR 0005 aprobó 2do vertical (3D printing). Pregunta: ¿repo separado o monorepo? Tentación inicial: fork para "claridad".

**Decisión / acción**: monorepo `affiliate/baristapath/` + `affiliate/filamentpath/` + `affiliate/SCAFFOLD.md` + `affiliate/CLAUDE.md` (cross-niche protocols). NO se creó código abstracto compartido — sólo conventions documentadas. Refactor en 1 commit.

**Razonamiento**: la regla del repo es "no abstraer hasta 3 nichos sufran la duplicación". Con 2 nichos, escribir un component compartido es over-engineering: estás adivinando qué patterns van a recurrir. Con 3+, ya tenés evidencia. El monorepo te da TODO el upside (un solo CI, una sola Vercel/CF cuenta, fácil cross-pollination de patterns) sin el downside (lock-in arquitectural prematuro).

**Resultado**: 2do nicho arrancable sin "qué hago, otro repo o el mismo". CI verde una semana después del refactor con 0 ajustes.

**Takeaway pedagógico**: la decisión "monorepo vs fork" no es teológica. Es función de cuánta evidencia tenés de duplicación. El curso debe enseñar la regla de los 3, no la dogma de un campo.

---

## 2026-05-25 — Sprint: descubrimiento accidental de que `master` es otro proyecto

**Contexto**: B5 (CF Pages build path). El operador veía deploys fallando en CF Pages. Diagnóstico inicial mío fue "configuración mal". Empezamos a investigar.

**Decisión / acción**: al chequear `git log origin/master`, descubrí que `master` era un proyecto TOTALMENTE distinto (app de cartas / árbol genealógico). Toda la app de baristapath vive solo en la rama `claude/amazon-resale-project-t7o0P`. Production de CF Pages apuntaba a esa rama de Claude — funcional, pero estructuralmente peligroso (si la rama se borra, el sitio desaparece).

**Razonamiento**: este tipo de estructura "rama feature como prod" pasa cuando un repo se usa para múltiples experimentos. NO es necesariamente malo (el sitio funciona), pero es technical debt que hay que reconocer. Saltar a "arreglemoslo ya" sería resolución prematura — primero hay que ENTENDER por qué quedó así y si el flip a la convención normal (master = prod) tiene riesgos.

**Resultado**: flagged como issue para resolver en sprint futuro. No tocamos hoy. El sitio sigue funcionando.

**Takeaway pedagógico**: a veces descubrís estructura del repo que es "weird but functional". El instinto correcto NO es arreglarlo en el momento — es documentarlo, evaluar el blast radius del fix, y planearlo. Disciplina sobre velocity. (En el curso esto se puede enseñar como caso de "technical debt accounting".)

---

## 2026-05-25 — Bug CSS: el selector que nunca matcheaba

**Contexto**: operador screenshotea el home mostrando que el nav del header se veía como bullet list (no horizontal). Reflejo del operador: "perdió formato, ¿qué pasó?".

**Decisión / acción**: leí el HTML real (`<ul class="primary-nav">`) y el CSS real (`.primary-nav ul { list-style: none; display: flex; ... }`). El selector buscaba `<ul>` DENTRO de algo con clase `primary-nav` — pero la clase está EN el `<ul>` mismo. Selector NUNCA matcheaba. Fix de 1 carácter: `.primary-nav ul` → `.primary-nav`.

**Razonamiento**: el bug "siempre estuvo ahí". El sitio se veía con bullets desde el commit inicial. El operador acababa de notarlo. La tentación es debuggear lo que "cambió" recientemente — pero NADA cambió. La pregunta correcta es: ¿qué asumimos que funcionaba sin verificar?

**Resultado**: 1 commit, deploy en 3 min, header arreglado. Tomamos nota: hacer audit visual cross-templates antes de cada major announcement.

**Takeaway pedagógico**: cuando un usuario reporta "X se rompió", verificá primero si X realmente estaba funcionando antes. Muchos bugs son "siempre estuvieron" y nadie los miró. Para el curso: enseñar a leer el HTML real vs lo que pensás que el HTML dice.

---

## 2026-05-25 — Polish visual: agente para diagnosticar "se ve pobre"

**Contexto**: post-fix del CSS bug, operador insistió: "sigue viéndose pobre, ¿podemos comparar con páginas similares?". Tentación: empezar a tocar tipografía, paleta, cards.

**Decisión / acción**: despachado agente con WebFetch (en background, no blocking) a 8 sitios afiliados top. Mientras corría, operador pudo avanzar B7. Output del agente: el problema NO era tipografía ni paleta — era **densidad de información visual**. Las cards eran rectángulos blancos idénticos sin fotos/scores/badges. Top 3 quick wins: trust strip cuantitativo + pricing chips + alternating section backgrounds + author byline.

**Razonamiento**: el operador identificó un síntoma ("se ve pobre"), no la causa. AI brilla diagnosticando síntomas vs causas en dominios visuales porque puede comparar contra base de conocimiento extensa. Implementación basada en síntoma → tocás cosas al azar. Implementación basada en causa → cambiás 3 cosas específicas y resolvés.

**Resultado**: trust strip + backgrounds alternados + author byline implementados en ~45 min. Sitio dejó de verse "pobre". El operador validó visualmente y aprobó.

**Takeaway pedagógico**: usar AI para **diagnóstico** antes que para **implementación**. La mejor pregunta para hacerle al agente NO es "implementame X" — es "decime por qué Y se ve así y qué patterns no estoy aplicando". Lección de meta-process crítica para el curso.

---

## 2026-05-25 — GSC alerts: somos affiliate, no merchant

**Contexto**: 2 emails de Google Search Console reportando 8 issues estructurados en `baristapath.com/`. 1 crítico (falta `image`), 7 no críticos (`hasMerchantReturnPolicy`, `shippingDetails`, `review`, `aggregateRating`, etc.).

**Decisión / acción**: leí los templates de schema. Estábamos emitiendo `Product` con bloque `Offer` (precio, availability) en 6 templates. Eso le decía a Google "soy merchant". Drop del `Offer` block en los 6 templates → Google deja de tratarnos como merchant → 0 issues. Documenté el incidente en `affiliate/baristapath/ops/alerts-log.md` (nuevo archivo).

**Razonamiento**: las 4 cosas que Google nos pedía completar (return policy, shipping details, etc.) son datos del **vendedor**. Nosotros somos **affiliate**. Inventar esos datos sería **anti-gray-hat violation**. La opción honesta era: dejar de pretender ser merchant en el schema. Eso AUTOMÁTICAMENTE resuelve todas las warnings. Si Google ve `Offer` con precio pero sin merchant info, asume que sos un merchant que llenó mal el formulario. Sin `Offer`, Google asume que estás describiendo un producto editorialmente.

**Resultado**: 1 commit toca 6 templates + 1 nuevo archivo (alerts-log.md). Tests verdes, build verde. Pendiente operador: pedir re-validación en GSC (24-48h response).

**Takeaway pedagógico**: schema.org es semantic web. Si mentís en el schema (te declarás merchant siendo affiliate), Google te castiga; si decís verdad acotada (sólo afirmás lo que es verdad), Google te respeta y muestra rich results apropiados. El instinto anti-gray-hat resuelve dilemas técnicos también, no sólo éticos.

---

## 2026-05-25 — Pivot mid-sprint: ConvertKit → MailerLite

**Contexto**: durante setup de B6 (activar email capture), descubrimos que ConvertKit (ahora "Kit") movió el "incentive email" (welcome automation) a planes pagos ~$29-49/mes. El plan original asumía free tier con welcome email incluido.

**Decisión / acción**: NO pagamos $40/mes. Tampoco implementamos workaround. **Pivot completo**: investigamos alternativas (MailerLite, Beehiiv, Brevo) y migramos a MailerLite free (500 subs / 12K emails / welcome email incluido / API similar). Refactor del `subscribe.ts` para usar MailerLite API: ~20 min. Actualización docs `email-strategy.md` + `tareas-operador.md` reflejando nuevo provider.

**Razonamiento**: tres opciones tenía el operador: (a) pagar $40/mes desde día 0 sin revenue, (b) seguir sin welcome email (degradación de UX), (c) migrar de provider. Opción (a) viola "no gastar antes de validar". Opción (b) deja value sobre la mesa. Opción (c) cuesta 20 min de código + 10 min de setup operador. Era no-brainer.

**Resultado**: migración completa en una sesión. End-to-end testeado: subscriber llegó a MailerLite, `mode: "mailerlite"` confirmado, success state renderizado en página. Bonus: descubrimos un UI bug (`"Sending..."` stuck en form) que arreglamos en commit subsiguiente.

**Takeaway pedagógico**: **el pivot mid-sprint NO es fracaso, es disciplina**. La habilidad de cortar pérdidas + migrar rápidamente cuando el contexto cambia separa proyectos exitosos de proyectos zombie. Lección para el curso: vendor-agnostic abstractions (nuestro `subscribe.ts` aisla la API call a una función con interfaz simple) hacen pivots baratos. Hard-coded a un proveedor en 5 lugares → pivot caro.

---

## 2026-05-25 — MailerLite friction: mobile UI vs desktop UI

**Contexto**: operador estaba en mobile intentando crear el Group + API token de MailerLite. Sufría: UI mobile esconde botones críticos, "Generate token" no aparecía, parecía "cuenta no aprobada".

**Decisión / acción**: paramos. Le pedí que pasara a desktop. En desktop, en 5 min llegó al token. La cuenta SÍ estaba aprobada — solo el UI mobile de MailerLite es deficiente para tareas de setup.

**Razonamiento**: 30 min se habían perdido intentando workarounds en mobile. La pregunta correcta no era "cómo hago esto en mobile" — era "este flow específico debería hacerse en mobile?". Setup admin de cuentas es flow que históricamente ocurre en desktop. Hay valor en reconocer cuándo cambiar de medium.

**Resultado**: 5 min en desktop resolvieron lo que 30 min en mobile no resolvieron.

**Takeaway pedagógico**: no toda fricción tiene fix técnico. A veces el fix es "cambiá de canal". Para el curso: hay tareas que el estudiante ABSOLUTAMENTE necesita hacer en desktop (CF Pages settings, Amazon Associates application, API token generation). Documentarlo upfront ahorra horas.

---

## 2026-05-25 — Seguridad: el token que pasó por chat

**Contexto**: operador me pasó el API token de MailerLite en mensaje de chat plaintext para que yo escribiera la integración. Procedimiento "rápido" pero subóptimo desde seguridad.

**Decisión / acción**: usé el token solo para validar la integración. INMEDIATAMENTE después de confirmar que funciona, le pedí al operador: (a) regenerar el token en MailerLite (invalida el que pasó por chat), (b) actualizar la env var en CF Pages con el nuevo, (c) NO pasármelo de nuevo. Documenté el procedimiento en `progreso.md` y en este log.

**Razonamiento**: el chat es **canal de logs persistentes**. Cualquier credencial que pase por ahí queda en histórico (mío, del operador, de los providers de IA). NO es vector inmediato pero es mala higiene. La regla correcta es: API keys jamás por chat. Si una crisis lo hace inevitable, **regenerar inmediatamente después**. Si no se puede regenerar (algunos providers no permiten), evaluar mover el secret a un canal seguro post-hoc.

**Resultado**: operador regeneró post-deploy. Token original quedó invalidado. Nuevo token solo vive en CF Pages env vars (encrypted).

**Takeaway pedagógico**: en el curso, **clase específica sobre secrets hygiene**: env vars desde día 0, password manager, NUNCA commits con secrets (incluso si vas a borrar después — el git history queda), rotación periódica. Y la regla del "regenerar después de exposure": baja el costo del error.

---

## 2026-05-25 — Pregunta meta del operador: "estamos para revenue?"

**Contexto**: tras cerrar B5/B6/B7 + polish + schema fix, operador pregunta: "después de este sprint cómo estamos para seguimiento de éxito del proyecto?". Hora de cerrar sprint con honestidad.

**Decisión / acción**: respondí estructurada y honestamente: SÍ infraestructura técnica está lista. NO hay tráfico (cero). NO hay analytics (ningún tracking script). El reloj de 180 días Amazon corre. Pre-revenue real. Próximo sprint focus: observability + first traffic drops.

**Razonamiento**: la tentación post-sprint exitoso es decir "todo va bien, vamos por más". La honestidad útil es: "infrastructure ready ≠ business operational". Hay 5 piezas más que faltan antes de que esto sea un negocio funcional (analytics, backlinks, traffic engine, conversion tracking, weekly review cadence). Decirlo claro previene falsas expectativas.

**Resultado**: operador entendió. Pidió actualizar progreso.md + montar log de interacciones (este archivo) para que la experiencia retroactiva sea base de un curso futuro.

**Takeaway pedagógico**: una de las habilidades menos discutidas en cursos de "build with AI" es **honestidad post-sprint**. El instinto de "celebrar lo hecho" es válido pero limitado. La habilidad de decir "hicimos X pero aún falta Y, Z, W antes de Z' (el goal real)" es lo que separa proyectos que llegan a revenue de proyectos que celebran milestones intermedios y nunca llegan al gate final.

---

## 2026-05-26 — "¿Puedo comprar yo mismo via mi link para probar?" — y por qué NO

**Contexto**: el operador iba a comprar una impresora 3D (Bambu A1 mini, ~$249) para usar de material editorial en el 2do nicho. Pregunta lógica: "si entro a baristapath, click → Amazon, compro con mi usuario, ¿me cuenta como sale? Quiero validar que el engine funciona."

**Decisión / acción**: rechazo categórico. Self-purchases (incluido familia, amigos, "for any other purpose") están explícitamente prohibidos en el Operating Agreement de Amazon Associates. Amazon los detecta automáticamente cruzando IP/payment method/shipping address/browser fingerprint. Penalty: cancelación inmediata + clawback de commissions + 60 días de ban. Propuesta alternativa: (a) click-test sin compra para validar routing del link + presencia del tag, (b) ver el click en Associates dashboard 24-48h después como confirmación, (c) comprar la impresora directo en amazon.com sin pasar por el sitio.

**Razonamiento**: el instinto "lo pruebo yo mismo" es universal en operadores nuevos de afiliados y casi universalmente catastrófico. Amazon tiene incentivo perfecto para detectar self-purchases (fraude para ellos, pérdida directa). La intuición "si nadie se entera, no pasa nada" subestima la sofisticación del fraud detection de Amazon. Es UNA de las violaciones donde la cuenta se pierde más rápido — más rápido que reviews falsas o keyword stuffing, porque la evidencia está en los logs internos de Amazon mismos.

**Resultado**: operador entendió y va a comprar la impresora directo. Click-test pendiente para próximo sprint cuando montemos observability.

**Takeaway pedagógico**: clase específica en el curso sobre **anti-shortcut intuitions** en affiliate marketing. El estudiante va a sentir muchas veces que "esto sería fácil y rápido" (self-buy, comprarle a familia, redirigir vía link en ventas que iban a pasar igual). Cada uno de esos shortcuts tiene un mecanismo de detección y una penalty mayor que el shortcut gain. La intuición que hay que entrenar: **cuando algo se siente "obvious y rápido", probablemente sea una trampa con costo asimétrico** (upside chico, downside cuenta perdida). Validación legítima del engine: click test + paciencia para sales orgánicos. No hay sandbox de Amazon Associates.

---

## 2026-05-26 — Verificación del affiliate engine en mobile: iOS deeplink al Amazon app

**Contexto**: post-setup del Amazon Associates tag real, operador intenta hacer el click-test legítimo (click en AffiliateButton → ver URL destino con tag). En desktop esto es trivial: la URL se ve en la barra del navegador. En mobile (iOS), el tap a un link a `amazon.com` se intercepta por Universal Links y abre la app de Amazon nativa — el navegador nunca llega a mostrar la URL.

**Decisión / acción**: explicación del comportamiento (no es bug, es feature de iOS) + propuesta de método alternativo: **long-press del link** en lugar de tap normal. iOS muestra la URL de destino en un popup ANTES de abrir nada, permitiendo validar el tag visualmente sin disparar la app. Confirmación canónica adicional: el click queda registrado en Amazon Associates dashboard 24-48h después independientemente del medium (browser web o app nativa).

**Razonamiento**: Universal Links es un protocolo de Apple que preserva query parameters al pasar el URL a la app destino. Amazon honra el `tag` en su app igual que en web. Entonces el click "probablemente sí se contó" — pero el operador necesitaba **visibilidad** del tag para tener confianza en la validación. Esa visibilidad la da el long-press, no el tap. El insight clave: en affiliate marketing, "verificar funcionamiento" en mobile requiere flujos distintos a desktop — los app deeplinks oscurecen los detalles que desktop expone naturalmente.

**Resultado**: operador validó via long-press que la URL incluye `?tag=baristapath79-20`. Confirmation definitiva pending en Associates dashboard 24-48h.

**Takeaway pedagógico**: clase sobre **multi-device validation** en affiliate marketing. El estudiante va a buildear todo en desktop, va a testear en desktop, va a creer que funciona. Después un usuario móvil va a venir, va a abrir el link, y va a aterrizar en la app (~70% del tráfico mobile en USA tiene la Amazon app instalada). Hay que probar el flujo COMPLETO en mobile incluyendo deeplink behavior. Y para verificar tag preservation sin loguear sales reales: long-press en iOS, "show link" en Android, o tap regular con DevTools mobile emulation en desktop. Esta es una técnica de QA específica del nicho que casi ningún curso de affiliate enseña.

---

## Índice por capítulos del curso

> Sugerencia del operador (2026-05-26): agrupar las entries por temática para que el material del curso tenga estructura clara. Cada capítulo es una unidad pedagógica. Las entries de una misma fecha se distribuyen por capítulo según el lesson principal, no por cronología.

### Capítulo 1 — Elegir nicho con data (no con corazonadas)

- 2026-05-13 — Decisión inicial del nicho: por qué coffee equipment
- 2026-05-14 — KGR validation antes de escalar contenido

### Capítulo 2 — Stack técnico mínimo viable

- 2026-05-13 — Stack técnico: por qué Astro + Cloudflare Pages, no WordPress
- 2026-05-14 — Dominio: Cloudflare Registrar over GoDaddy/Namecheap

### Capítulo 3 — Construir confianza editorial sin background editorial

- 2026-05-15 — Design benchmark research ANTES de rediseño UX
- 2026-05-17 — robots.txt FLIPPED a Allow: el momento "soft launch"
- 2026-05-25 — Polish visual: agente para diagnosticar "se ve pobre"

### Capítulo 4 — Anti-gray-hat como ventaja competitiva

- 2026-05-25 — GSC alerts: somos affiliate, no merchant
- 2026-05-26 — "¿Puedo comprar yo mismo via mi link para probar?" — y por qué NO

### Capítulo 5 — Activos pre-revenue (Associates, email, audiencia)

- 2026-05-24 — Amazon Associates conditional approval + el reloj de 180 días
- 2026-05-25 — Pivot mid-sprint: ConvertKit → MailerLite

### Capítulo 6 — Mantenimiento y seguimiento (sugerencia del operador)

- 2026-05-25 — Sprint: descubrimiento accidental de que master es otro proyecto (technical debt accounting)
- 2026-05-25 — Bug CSS: el selector que nunca matcheaba (audit visual cross-templates)
- 2026-05-25 — MailerLite friction: mobile UI vs desktop UI (cuándo cambiar de medium)
- 2026-05-25 — Seguridad: el token que pasó por chat (secrets hygiene + regenerar post-exposure)
- 2026-05-25 — Pregunta meta del operador: "estamos para revenue?" (honestidad post-sprint)
- 2026-05-26 — Verificación del affiliate engine en mobile: iOS deeplink al Amazon app (multi-device QA)
- *Pendientes para próximas entries de este capítulo*: weekly review template + cadencia + thresholds, sprint observability como secuencia (CF Analytics + GSC sitemap + click test), interpretación de Core Web Vitals con muestra chica, GSC "Descubierta pero sin indexar" como estado normal de sitio joven.

### Capítulo 7 — Escalado y replicación (cuándo abstraer vs duplicar)

- 2026-05-24 — Refactor a monorepo `affiliate/` cuando aparece 2do nicho (regla de los 3)

---

## Convenciones para entries futuras

1. Cada entry nueva se escribe al final del listado cronológico (NO en la sección de capítulos).
2. Al final de cada entry, agregar línea: `**Capítulo del curso**: N — <nombre>`.
3. Replicar el entry en el índice del capítulo correspondiente (link al título).
4. Si una entry no encaja en ningún capítulo existente, proponer capítulo nuevo al final.
