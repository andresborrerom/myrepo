# Amazon Associates desde Panamá — Research

> Fecha: 2026-05-13
> Operador: persona natural colombiana, residente fiscal Panamá, sin US LLC.
> Sitio objetivo: en inglés, vertical coffee equipment, linkea a Amazon.com.

---

## Resumen ejecutivo

- **Viable.** Amazon Associates US acepta solicitantes desde Panamá; el país NO está en la lista de jurisdicciones sancionadas (Cuba, Irán, Corea del Norte, Siria, Crimea).
- **Withholding esperado: 0%**, no porque haya treaty (Panamá NO tiene tax treaty con US), sino porque el tax interview de Amazon permite declarar que **todos los servicios se prestan fuera de US** — eso convierte las comisiones en non-US source income y elimina el withholding de 30%. Esta es la palanca crítica.
- **Payment method recomendado: Payoneer (cuenta virtual USD en US)** configurada como direct deposit (min $10, sin fees de Amazon). Como fallback, cheque por correo a Panamá (min $100, **$15 fee por cheque**). Gift card auto-cargada al amazon.com (min $10, sin fees) sirve si vas a gastar el balance en Amazon, no para cashout real.
- **Aplicá a Amazon Associates US** (no MX ni ES). Tu audiencia es US-en-inglés, tus links son amazon.com, y MX/ES requieren cuentas bancarias locales.
- **Red flag principal**: Amazon NO endosa oficialmente Payoneer. Es un workaround usado por años por la comunidad pero técnicamente la dirección fiscal en Panamá no debe contradecir la dirección bancaria en US (riesgo de cierre por inconsistencia de datos). El otro flag: el requisito de **3 ventas calificadas en 180 días** post-aprobación condicional — si no las generás, la cuenta se cierra automáticamente y reaplicar requiere empezar de cero.

---

## ¿Acepta Amazon Associates US a residentes Panamá?

### Política oficial

Amazon Associates US acepta solicitantes de cualquier país que no esté bajo sanciones US. La política de Amazon explícitamente prohíbe participación desde Cuba, Irán, Corea del Norte, Siria y Crimea. **Panamá no aparece en ninguna lista de exclusión.**

No existe requisito de ciudadanía ni de cuenta bancaria local US para inscribirse. Sí existe un requisito de **país de residencia** (que se usa para el tax interview y para determinar métodos de pago disponibles), pero Panamá es un país válido en el dropdown.

### Evidencia anecdótica

No encontré threads específicos en r/AmazonAssociates citando "soy de Panamá y me aprobaron" con detalles. Lo que sí está confirmado:

- En el Warrior Forum y Quora, múltiples afiliados de LatAm (Argentina, Colombia, Perú) reportan haber sido aceptados en Amazon Associates US y haber cobrado vía cheque o Payoneer.
- Geniuslink y Youfiliate (blogs especializados en afiliados internacionales) confirman que cualquier país no-sancionado puede aplicar al US program.
- El bottleneck histórico para LatAm no es elegibilidad sino payment method.

**Confianza:** alta sobre la elegibilidad (política oficial clara), media sobre experiencia específica de panameños (no encontré reportes 1:1).

---

## Documento fiscal: W-8BEN

### Estado del treaty Panamá-US

**No existe tax treaty entre Panamá y Estados Unidos.** Confirmado por:
- IRS "United States income tax treaties – A to Z" (Panamá no está en la lista de 68 países con treaty activo en 2026).
- PwC tax summaries Panamá.
- Pardini & Asociados (firma panameña).

Esto significa que **no podés reclamar tasa reducida por treaty** en la sección 10 del W-8BEN.

### El truco: services performed outside the US

Aquí es donde se vuelve interesante. El tax interview de Amazon (que es un wizard que termina generando un W-8BEN electrónico) tiene una pregunta crítica:

> "Do you perform any of your services in the United States?"

Si respondés **"No"** — lo cual es cierto para un residente Panamá que opera un sitio web desde Panamá — Amazon clasifica las comisiones como **non-US source income**. Las reglas IRS (IRC §861, §862) dicen que income de servicios se sourcing donde se prestan los servicios físicamente. Como vos escribís el blog, hacés SEO y manejás el sitio desde Panamá, los servicios son non-US source.

**Resultado: 0% de withholding.** Sin necesidad de treaty.

Esto está confirmado por:
- El propio operating agreement de Amazon Associates: *"If you are a non-US person participating in the Associates Program, you agree that unless you have otherwise notified us in your tax information you will perform all services under the Agreement outside the United States."*
- La guía de Geniuslink sobre international commissions: *"if you are an Associate in the UK, posting links to a US based site, does not constitute US sourced income."*

### Cómo llenar el W-8BEN (campos clave)

| Campo | Qué poner |
|---|---|
| Part I, Line 1 — Name | Tu nombre legal (como aparece en cédula colombiana o pasaporte) |
| Part I, Line 2 — Country of citizenship | Colombia (ciudadanía) |
| Part I, Line 3 — Permanent residence address | Dirección física en Panamá (no PO Box) |
| Part I, Line 4 — Mailing address | Solo si difiere de la residencia |
| Part I, Line 5 — US TIN (SSN o ITIN) | **Dejar en blanco** (no tenés, no necesitás) |
| Part I, Line 6 — Foreign TIN | RUC panameño o NIT colombiano, lo que aplique |
| Part I, Line 7 — Reference numbers | En blanco |
| Part I, Line 8 — DOB | Tu fecha de nacimiento |
| Part II — Claim of treaty benefits | **NO completar.** Panamá no tiene treaty. |
| Part III — Certification | Firmar |

En el wizard de Amazon, la pregunta "Are you performing services in the US?" → **No**. Es la pregunta más importante del flujo.

### Form 1042-S

Amazon te emite el **1042-S** anualmente (antes del 15 de marzo) reportando los pagos y el withholding (que será 0%). Se puede consentir a recibirlo electrónicamente. Guardalo para tus registros — en Panamá tributás territorial, así que income generado por servicios prestados desde Panamá pero pagado por entidad US es **probablemente tributable en Panamá** (consultá con contador panameño; este doc no es tax advice).

---

## Métodos de pago disponibles

Comparativa de los 3 métodos oficiales que tiene Amazon Associates US para un afiliado en Panamá:

| Método | Mínimo payout | Fees de Amazon | Tiempo de procesamiento | Restricciones / notas |
|---|---|---|---|---|
| **Direct deposit a cuenta US** (incl. Payoneer virtual US bank) | $10 USD | $0 | ~60 días después del fin de mes (mes N → fin de mes N+2) | Requiere routing + account number US. Panamá no tiene bancos locales soportados directamente por Amazon. Vía Payoneer es workaround comunitario, no oficialmente endosado. |
| **Direct deposit internacional a banco panameño USD** | $10 USD | $0 | ~60 días | **Panamá NO está en los ~52 países soportados** por Amazon para international direct deposit (la lista cubre US/UK/Eurozona y mercados con cuenta en USD/GBP/EUR conectados al programa, no incluye Panamá). No viable directamente. |
| **Cheque por correo postal** | $100 USD | **$15 por cheque** (deducido del pago) | ~60 días + tiempo de envío internacional (2-4 semanas adicionales a LatAm) | Funciona a cualquier dirección. Riesgo de pérdida en correo. Cobrar el cheque en banco panameño puede tomar 30-45 días adicionales en clearing y bancos cobran fees ($10-25 típicamente). |
| **Amazon Gift Card** (al email del Associate) | $10 USD | $0 | ~60 días | Solo redimible en amazon.com para productos. **No es cashout real**, solo si planeás gastar el balance en Amazon. Útil si querés financiar compras personales. |

### Recomendación de payment method

1. **Primera opción: Payoneer (cuenta virtual USD).** Min $10, sin fees de Amazon. Payoneer cobra ~2% al convertir a moneda local, pero como Panamá usa USD (balboa = USD 1:1), podés mantener el balance en USD y transferirlo a un banco panameño USD con fees mínimos. Caveat: Amazon no endosa oficialmente; algunos affiliates reportan que Amazon a veces marca como sospechoso la combinación "dirección Panamá + cuenta bancaria US" — mitigar manteniendo consistencia en todos los datos.
2. **Fallback: cheque.** Caro ($15 + bank fees + 30-45 días extra), pero 100% oficial y sin ambigüedad.
3. **No recomendado**: Gift card como único método (no es liquidez real); direct deposit a banco panameño nativo (no soportado).

---

## ¿Aplicar a US, MX o ES?

**Aplicar SOLO a US.** Razones:

| Criterio | US | MX | ES |
|---|---|---|---|
| Audiencia target del sitio | **Match** (sitio en inglés, US-focused) | Mismatch (audiencia MX habla español) | Mismatch (audiencia ES) |
| Volumen / ticket promedio | **Más alto** del mundo | Mucho más bajo | Medio |
| Comisión coffee/kitchen | 4.5% (Home & Kitchen) | ~3-5% pero menor ticket | Similar |
| Payment | Direct deposit Payoneer / cheque (manageable) | **Requiere cuenta bancaria mexicana** + RFC genérico para extranjeros | Posible via banco EUR, pero no aplica si no tenés cuenta EUR |
| Idioma de los links | amazon.com (lo que apuntás) | amazon.com.mx (los links no servirían) | amazon.es (no servirían) |

Aplicar a MX o ES sería redundante y técnicamente requeriría cuenta bancaria local. Si en el futuro el sitio gana tráfico hispanohablante significativo, considerar geo-redirect a amazon.com.mx vía Geniuslink/Genius.link y aplicar a MX entonces — pero no de entrada.

---

## Reportes de afiliados LatAm

Sintetizado de fuentes que sí encontré (no hubo threads Reddit 1:1 de panameños post-2024, pero sí evidencia análoga):

- **Warrior Forum "Non-US Amazon Affiliates - how do you get paid"** ([link](https://www.warriorforum.com/main-internet-marketing-discussion-forum/516720-non-us-amazon-affiliates-how-do-you-get-paid.html)): afiliados de Argentina, México, India, Filipinas reportan combinación cheque + Payoneer. Quejas comunes: cheque tarda 2-3 meses en clear; Payoneer funciona pero "no oficial".
- **Quora "How to receive my payments being an Amazon Associate outside of the US"**: respuestas concordantes — Payoneer es el workaround estándar; cheque es la opción "safe" pero lenta y cara.
- **Geniuslink Payoneer guide** ([link](https://geniuslink.com/blog/amazon-affiliates-payoneer/)): empresa especializada en links afiliados internacionales confirma que Payoneer + Amazon US Associates es práctica común desde hace años. **No reporta bans masivos por usarlo.**
- **YouTube canales en español ("Cómo recibir pagos Amazon Afiliados desde Latinoamérica")**: tutoriales en español validan el flow Payoneer.
- **Tiempo de aprobación reportado**: 1-7 días para la pre-aprobación. 180 días para generar las 3 ventas calificadas requeridas para aprobación final.

**No encontré:** reportes específicos post-2024 de afiliados panameños indicando bans por país. Tampoco encontré reportes de Amazon rechazando aplicaciones masivamente por dirección Panamá.

**Confianza:** media. La evidencia es indirecta (analogías con otros países LatAm) más que panameño-específica.

---

## Riesgos y recomendaciones

### Riesgos identificados

1. **Inconsistencia dirección fiscal vs bancaria.** Si el W-8BEN dice Panamá pero el banco para direct deposit es Payoneer US, Amazon puede pedir verificación adicional. No es un ban automático pero suma fricción.
2. **Cuenta multiple / shared IP.** Si alguien más del hogar/equipo tiene una Associates account cerrada/baneada y compartís IP/device/email/payment method, Amazon puede correlacionar y cerrar la nueva. **Usar email, device y red exclusivos del proyecto.**
3. **Failure to disclose.** Falta del disclosure "As an Amazon Associate I earn from qualifying purchases" en páginas con afiliado links → cierre de cuenta.
4. **3 ventas en 180 días**. Si no llegás, la cuenta se cierra automáticamente. Reaplicar es desde cero (no hay appeal). Plan: aplicar cuando el sitio ya tenga tracción, no antes.
5. **Cierre por inactividad/zero-earning después de aprobación**: si pasás 36 meses sin ganar comisión, cierran.
6. **Cloaking / link shorteners no permitidos en algunas plataformas**: bit.ly y cloakers genéricos sobre Amazon links pueden violar TOS. Usar Amazon's own SiteStripe.
7. **Reddit, Pinterest, Twitter**: Amazon TOS restringe ciertas plataformas para publicar links. Reddit en particular tiene historial — verificar reglas al momento de aplicar.
8. **Tributación Panamá**: aunque withholding US sea 0%, las comisiones generadas por trabajo prestado desde Panamá pueden ser tributables en Panamá (regimen territorial pero con income de fuente extranjera con matices). Consultar contador panameño.
9. **Sin US LLC**: limita opciones de pago (no podés abrir Mercury/Wise Business US sin EIN/LLC). Si el proyecto escala, evaluar formar US LLC desde Panamá para mejor banking — pero NO antes de validar revenue.

### Precauciones

- Mantener cédula colombiana / pasaporte / certificación de residencia panameña a mano para potential verification requests.
- Hacer screenshot del tax interview al completar para tener record de las respuestas.
- No abrir múltiples Associates accounts "por si acaso".
- Mantener disclosure visible en TODAS las páginas con links.
- No usar shorteners genéricos sobre links de Amazon.

---

## Action items para el operador

1. **Leer** el Associates Program Operating Agreement actual: https://affiliate-program.amazon.com/help/operating/agreement
2. **Leer** la política de Participation Requirements: https://affiliate-program.amazon.com/help/operating/participation/
3. **Verificar** que el sitio coffee equipment cumpla antes de aplicar:
   - Al menos 10-15 posts con contenido original (Amazon revisa manualmente)
   - Disclosure "As an Amazon Associate, I earn from qualifying purchases" visible en footer y en cada post con links
   - Privacy policy publicada
   - Sitio público (no detrás de paywall)
   - Idealmente 500+ visitas/mes documentadas (no es requisito hard pero ayuda)
4. **Preparar datos para tax interview / W-8BEN**:
   - Nombre legal completo
   - Dirección física Panamá (no PO Box)
   - País de ciudadanía: Colombia
   - Foreign TIN: NIT colombiano o RUC panameño
   - Fecha de nacimiento
   - **Respuesta clave**: "I do NOT perform services in the United States"
   - NO marcar treaty benefits (Panamá no tiene)
5. **Decidir método de pago antes de aplicar**:
   - Opción A: abrir cuenta Payoneer (gratis) y solicitar receiving account USD → usar esos datos como direct deposit en Amazon
   - Opción B: configurar payment by check con dirección Panamá (asumiendo el $15 fee y 30-45 días extra de clearing)
6. **Tras aprobación condicional**: tenés 180 días para generar 3 ventas. Planificar contenido / SEO timing acordemente.
7. **Una vez tengas comisiones**: consultar contador panameño sobre tributación local de comisiones de afiliado pagadas por entidad US.

---

## Confianza del análisis

| Tema | Confianza | Base |
|---|---|---|
| Elegibilidad Panamá no-sancionado | **Alta** | Política IRS + Amazon oficial |
| Ausencia de treaty Panamá-US | **Alta** | IRS, PwC, firmas panameñas concuerdan |
| 0% withholding declarando services outside US | **Alta** | Texto del operating agreement de Amazon + IRC §861/862 + múltiples fuentes secundarias |
| Lista de 52 países direct deposit no incluye Panamá | **Media-alta** | Múltiples blogs especializados; no encontré el listado oficial publicado por Amazon (la página oficial dio 403 a WebFetch) |
| Payoneer workaround funciona en 2026 | **Media** | Documentado hasta 2024-2025 por Geniuslink; no encontré reportes 2026 de bans masivos pero tampoco endorsement oficial |
| Comisión 4.5% Home & Kitchen 2026 | **Media** | Blogs concuerdan; Amazon puede cambiar rates en cualquier momento |
| Requisito 3 ventas/180 días | **Alta** | Ampliamente documentado y consistente |
| Experiencia anecdótica panameño-específica | **Baja** | No encontré threads 1:1; inferí de casos análogos LatAm |
| Tributación en Panamá de comisiones | **Baja** | Mencionado por completitud; consultar contador panameño |

**Caveat general:** Amazon cambia políticas y rates frecuentemente. Re-verificar el operating agreement antes de aplicar.

---

## Fuentes consultadas

Oficiales:
- [Amazon Associates Central - Payment Methods help](https://affiliate-program.amazon.com/help/node/topic/G8VUMS6GTBCR9RGV)
- [Amazon Associates - Tax info for non-US persons](https://affiliate-program.amazon.com/help/node/topic/GPFZ6W6CF4E5BD9V)
- [Amazon Associates - Will I get a tax form](https://affiliate-program.amazon.com/help/node/topic/GNFLR6ZTJ8Q7FFMZ)
- [Amazon Associates - Tax withholding help](https://affiliate-program.amazon.com/help/node/topic/GYJB2LE2AB473W2L)
- [Amazon Associates - Operating Agreement / Policies](https://affiliate-program.amazon.com/help/operating/policies)
- [Amazon Associates - Receive international earnings in local bank (resource center)](https://affiliate-program.amazon.com/resource-center/receive-your-international-affiliate-earnings-in-your-local-bank/)
- [Amazon Associates - How to monetize international traffic](https://affiliate-program.amazon.com/resource-center/how-to-monetize-international-traffic-with-the-amazon-associates-program/)
- [IRS Form W-8BEN instructions (10/2021)](https://www.irs.gov/instructions/iw8ben)
- [IRS - United States income tax treaties A-Z](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z)
- [IRS - Tax treaty tables](https://www.irs.gov/individuals/international-taxpayers/tax-treaty-tables)

Análisis Panamá:
- [PwC - Panama Individual foreign tax relief and treaties](https://taxsummaries.pwc.com/panama/individual/foreign-tax-relief-and-tax-treaties)
- [Pardini & Asociados - Guide of Double Taxation Treaties signed by Panama](https://www.pardinilaw.com/EN/padela/articles/85/foreign-investment/guide-of-double-taxation-treaties-signed-by-panama/)
- [Kraemer & Kraemer - Double taxation treaties Panama](https://kraemerlaw.com/en/panama-taxes/information-exchange-and-double-taxation-treaties-in-panama/)

Análisis afiliados internacionales:
- [Geniuslink - International Affiliate Commissions vs International Taxes](https://geniuslink.com/blog/international-affiliate-commissions-vs-international-taxes/)
- [Geniuslink - Collecting Amazon Affiliate Commissions with Payoneer](https://geniuslink.com/blog/amazon-affiliates-payoneer/)
- [Geniuslink - Amazon Associates Mexico program](https://geniuslink.com/blog/amazon-associates-mexico/)
- [Youfiliate - Amazon Associates Countries List 2026](https://www.youfiliate.com/blog/amazon-associates-countries-list) (403 al fetch, contenido inferido de snippets de search)
- [Youfiliate - Amazon Affiliate Commission Rates 2026](https://www.youfiliate.com/blog/amazon-affiliate-commission-rates)
- [Warrior Forum - Non-US Amazon Affiliates how to get paid](https://www.warriorforum.com/main-internet-marketing-discussion-forum/516720-non-us-amazon-affiliates-how-do-you-get-paid.html)
- [Quora - How to receive payments as Amazon Associate outside US](https://www.quora.com/How-do-I-receive-my-payments-being-an-Amazon-Associate-outside-of-the-US)
- [Quora - Amazon Affiliate W-8 tax form](https://www.quora.com/How-do-I-fill-out-the-Amazon-Affiliate-W-8-Tax-Form-as-a-non-US-individual)

Requisitos / approval:
- [getaawp - Amazon Affiliate Requirements 2026](https://getaawp.com/blog/amazon-affiliate-program-requirements/)
- [Money Marketing Connection - Amazon Affiliate Compliance 2026](https://moneymarketingconnection.com/amazon-affiliate-compliance-guide-stay-approved-2026/)
- [Shopify - Amazon Affiliate Marketing 2026 guide](https://www.shopify.com/blog/amazon-affiliate-marketing)

Comisiones:
- [AffiliateX - Amazon Affiliate Commission Rates 2026](https://affiliatexblocks.com/amazon-affiliate-commission-rates/)
- [EarnifyHub - Amazon Associates Commission Rates 2026](https://earnifyhub.com/blog/affiliate/amazon-associates-commission-rates-all-categories.php)
