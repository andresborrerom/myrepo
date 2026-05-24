# Recepción de payouts US desde Panamá — Research

Operador: persona natural colombiana, residente Panamá, sin US LLC, con cuenta corriente USD nómina + tarjeta de crédito en banco panameño. Volumen esperado: USD 50–500/mes inicial, escalando a USD 1.000–5.000/mes.

## Resumen ejecutivo

**Recomendación: Payoneer como receptor principal**, retirando a la cuenta corriente USD del banco panameño cuando se acumulen ~USD 500–1.000. Es la única opción confirmada disponible para residentes en Panamá, con KYC que acepta documentación local. Wise está descartado (no opera para residentes en Panamá). Global66 está en zona gris: la app dice cubrir “170 países” para registro, pero su producto oficial cubre AR/BR/CL/CO/EC/MX/PE — Panamá no figura, y hay reportes documentados de cuentas bloqueadas con KYC eterno (riesgo alto para un flujo recurrente). Amazon Associates US NO permite wire directo a banco panameño; obliga a tener un receiver con routing/account US. Plan B si Payoneer rebota: registrar Global66 con documentación colombiana (cédula CO + dirección CO temporal) y aceptar el riesgo, o cheque postal trimestral.

## Restricción dura de Amazon Associates US (lo primero a entender)

Amazon.com Associates paga por: cheque (umbral USD 100), Amazon Gift Card (umbral USD 10), o ACH/direct deposit a cuenta US en USD (umbral USD 10). NO paga wire SWIFT internacional desde el programa US (sí lo hacen Amazon UK/DE/FR/IT/ES/CA con su programa "International Direct Deposit" a 52 países, pero ese sistema no aplica a affiliates registrados en el storefront .com cobrando desde EE. UU.). Conclusión: para cobrar Amazon Associates US sin moverse a gift cards o cheques postales, el operador necesita sí o sí routing + account number US — por lo tanto, un "receptor virtual" tipo Wise/Payoneer/Global66.

## Global66 como receptor de ACH

**Lo que entrega oficialmente.** Global66 lanzó en 2024 la "Cuenta Global" con routing number ACH (US) e IBAN (EU). Recibir ACH desde EE. UU. tiene costo USD 0; recibir wire/SWIFT cuesta ~USD 10. La custodia de saldos en USD la realiza 100x Corp en Panamá. El routing es de un banco partner US (no de Global66 directo); este detalle es el que hace que algunos rails US (Stripe, PayPal Business, ciertos brokers, IRS) lo rechacen al detectar que no es una cuenta bancaria personal del titular. Para ACH "push" de bajo riesgo como Amazon Associates payouts, hay evidencia anecdótica de que funciona — pero no encontré confirmación oficial en Amazon ni reporte público específico "Global66 → Amazon Associates OK".

**Disponibilidad geográfica.** Países donde Global66 ofrece formalmente Cuenta Global a personas: Argentina, Brasil, Chile, Colombia, Ecuador, México, Perú (con productos específicos por país; en AR y PE solo personas, no empresas). **Panamá no está en esa lista**, aunque el sitio dice que "se puede registrar desde 170 países" — esto se refiere al uso de la app, no al país de residencia para el contrato. El operador, al ser ciudadano colombiano, podría intentar abrir con cédula CO + dirección Colombia, pero asume:
- Riesgo de inconsistencia en KYC (la app pide proof of address; un comprobante panameño puede gatillar review).
- Cualquier transferencia recurrente desde Amazon US a una cuenta cuyo titular reside en un país no soportado puede gatillar lock por AML.

**Reportes de problemas (anecdótico pero numeroso).** Fastcheck (CL, enero 2025) recopiló reclamos de usuarios chilenos por bloqueos de cuenta, PIN cambiado sin autorización, transferencias retenidas por meses con KYC sin resolver. Reclamos.cl tiene entradas de marzo 2026 sobre tarjeta que no funciona y soporte deficiente. Para un afiliado que depende del flujo mensual, este perfil de riesgo no es ideal.

**Veredicto Global66 para el caso.** Técnicamente entrega ACH USD aceptable por Amazon. Pero (a) Panamá no es jurisdicción soportada formalmente, (b) hay historial reportado de bloqueos. No es la primera elección.

## Alternativas — tabla comparativa

| Proveedor | ¿Acepta residente Panamá? | Fee recibir USD desde Amazon | Fee retiro a banco PA | Min payout | Tiempo end-to-end | KYC | Notas |
|---|---|---|---|---|---|---|---|
| **Payoneer** | Sí, oficialmente (ID + proof of address PA aceptados) | ~USD 1 fijo por payout recibido desde marketplace listado; "Receiving Account" ACH = 0 si Amazon paga como ACH | USD ~1.50–15 a banco USD local; ATM USD 3.15 + 1% | USD 50 desde Amazon Associates típicamente; retiro mínimo varía | ACH llega 1–2 días; retiro a banco PA 1–3 días hábiles | Pasaporte/cédula + comprobante domicilio PA <3 meses | Más caro que Wise pero único realmente disponible. Tarjeta opcional. |
| **Wise Personal** | **NO** — Wise no opera para residentes en Panamá (ni personal ni business ni tarjeta) | N/A | N/A | N/A | N/A | N/A | Descartado. Confirmado en Wise Help Centre y reviews 2026. |
| **Wise Business** | **NO** (mismo motivo) | N/A | N/A | N/A | N/A | N/A | Descartado. Para usarlo habría que crear US LLC, lo cual el operador descartó. |
| **Global66** | Zona gris: no listada oficialmente para PA; registrable con cédula CO | USD 0 ACH recibir | Retiro a Panamá no es flujo soportado nativo; típicamente vía wire (~USD 10) o conversión a peso CO + envío | Sin mínimo formal | ACH 1–3 días; retiro a Panamá no es ruta estándar | Pasaporte + selfie + proof of address (de país soportado) | Riesgo de KYC y bloqueos reportado. Útil solo si operador tiene dirección CO operativa. |
| **Banco panameño (Banco General, Banistmo, Banesco, BAC, MultiBank) — wire directo** | Sí | Amazon Associates US **no soporta wire SWIFT** desde el .com → no aplicable directamente | Inbound wire fee USD ~10–20 (Banco General reportado USD 10–15; Banistmo USD ~37 outbound, inbound puede ser menor) | Amazon mínimo wire USD 100 (cheque-equivalent) — pero recordar que el .com no ofrece wire | 2–5 días hábiles | N/A (ya tiene cuenta nómina USD) | Sólo útil como destino final desde Payoneer/Global66, no como receptor directo de Amazon US. |
| **Revolut** | No disponible para residentes en Panamá (a la fecha; Revolut LATAM cubre BR/MX/CO/AR/CL solamente) | N/A | N/A | N/A | N/A | N/A | Descartado. |
| **Cheque postal Amazon** | Sí, llega físicamente | USD 0 emisión | Depósito de cheque US en banco PA: comisión USD ~10–30, hold 21–45 días | USD 100 | 4–8 semanas total incluido hold | N/A | Plan C: lento y caro relativo al monto. Útil solo si todo lo demás falla. |
| **Amazon Gift Card** | Sí | USD 0 | No convertible a cash | USD 10 | Inmediato | N/A | Solo sirve si el operador planea comprar en Amazon (lo que sí aplica en este proyecto de resale). Puede ser útil como "saldo de reinversión". |

### Notas clave por proveedor

- **Payoneer + Panamá**: Foro Payoneer Community y forobeta tienen hilos de usuarios reportando retiros exitosos a Banco General y Banistmo en 1–3 días con fee USD ~15 por transferencia. Es el camino más probado.
- **Wise**: Repetidamente confirmado en docs oficiales y en exiap/onesafe (2026) que no opera residentes en Panamá. La única forma de usar Wise sería crear US LLC (descartado por el operador) o registrarse con residencia CO (genera el mismo riesgo de KYC que Global66, pero con menos casos reportados de bloqueo).
- **Banco panameño cuenta corriente USD**: irrelevante como receptor directo de Amazon US (no acepta wire desde el programa). Sí es relevante como destino final del retiro Payoneer.
- **Amazon Gift Card**: subutilizada en otros casos pero relevante aquí porque el proyecto compra en Amazon — convertir comisiones de afiliado en saldo de compra evita por completo el problema de payout (fees = USD 0, tiempos = inmediato). Vale la pena considerar al menos parcialmente.

## Recomendación

**Primary: Payoneer.** Flujo:
1. Amazon Associates US → ACH a Payoneer USD Receiving Account (gratis para recibir).
2. Payoneer → retiro a cuenta corriente USD del banco panameño cuando el saldo acumulado pase USD 500–1.000 (para amortizar el fee fijo ~USD 1.50–15).
3. Costo total estimado por payout: 0.5%–3% según monto y banco destino (más eficiente a mayor monto).
4. Tiempo total Amazon → banco PA: 4–7 días hábiles típicamente.

**Sub-recomendación táctica:** mientras los payouts sean USD 50–200/mes, configurar Amazon Associates a **Gift Card** y usar ese saldo para reinvertir en compras del propio proyecto de resale. Cero fees, cero KYC, cero fricción. Cuando el flujo supere ~USD 500/mes y haya necesidad real de cash, activar el flujo Payoneer.

**Plan B (si Payoneer rebota o se bloquea):**
- B1: Global66 registrado con cédula colombiana y dirección CO. Aceptar riesgo de KYC.
- B2: Cheque postal Amazon a dirección PA. Lento pero seguro.
- B3: Crear US LLC (Wyoming/Delaware) si el flujo justifica los ~USD 300–500/año de mantenimiento; eso desbloquea Wise Business y Mercury/Relay. Solo si volumen mensual supera USD 2.000.

## Action items para el operador

1. **Abrir cuenta Payoneer** en payoneer.com → "Sign Up" → seleccionar Panamá como país, "Individual". Tener listos:
   - Pasaporte colombiano o cédula colombiana (escaneo a color frente y reverso).
   - Comprobante de domicilio panameño <3 meses (factura de servicios a su nombre, o extracto bancario, o contrato de alquiler firmado).
   - Datos de la cuenta corriente USD del banco panameño (número, SWIFT del banco, nombre titular tal cual aparece en banco).
2. **Probar el flujo con un payout chico**: una vez aprobado el KYC (típicamente 24–72h), conectar Payoneer a Amazon Associates US ("Pay Me By Direct Deposit" → ingresar ACH routing y account numbers de la US Receiving Account de Payoneer). Esperar el primer payout real y validar que llegue.
3. **No tocar Global66 en la fase inicial**. Mantenerlo como Plan B documentado, no como primary.
4. **Configurar Amazon Associates en Gift Card** por defecto si los payouts iniciales son <USD 200/mes — ahorra todo el costo de payout y se reinvierte el saldo.
5. **Verificar con el banco panameño** (Banco General / Banistmo / el que tenga la nómina USD) el fee exacto de inbound wire y si requieren formulario adicional para transferencias <USD 10.000 (típicamente no por leyes AML PA hasta USD 10K).
6. **Guardar comprobantes** de cada payout para declarar correctamente en Panamá (régimen territorial: ingresos de fuente extranjera generalmente no gravados, pero hay que documentar).

## Trampas conocidas

- **Payoneer KYC**: si la dirección del proof of address no coincide exactamente con la registrada, rechaza. Mantener consistencia. Si el operador acaba de mudarse a Panamá y no tiene 3 meses de antigüedad en una factura, puede usar contrato de arrendamiento + recibo del propietario.
- **Conversión USD→PAB**: Panamá usa USD como moneda de curso legal (el balboa coexiste 1:1 pero el papel moneda es USD). NO hay riesgo de conversión cara como sería con peso colombiano. Esta es la mayor ventaja del setup PA.
- **Threshold AML**: transferencias entrantes >USD 10.000 en un mes pueden gatillar revisión en banco PA. Mantener payouts por debajo si no se justifica con docs.
- **Global66 bloqueos**: reportados públicamente; si se decide usar, mantener saldos bajos y retirar frecuentemente.
- **Amazon Associates "shell account" detection**: si Amazon detecta que el routing es de un EMI/fintech (Payoneer, Wise, Global66) y no de un banco tradicional, puede pedir verificación extra. Históricamente Payoneer no genera ese tipo de fricción con Amazon (es partner reconocido en Seller Central, y eso le da credibilidad incluso en Associates).
- **Tax form W-8BEN**: como persona no-US, Amazon Associates pide W-8BEN. El operador es residente fiscal Panamá → declara Panamá. Retención US sobre comisiones afiliados de Amazon US es 0% gracias a que las comisiones se tratan como servicios prestados fuera de US. NO declarar residencia colombiana en W-8BEN si vive en PA (sería incorrecto y puede gatillar 30% withholding).
- **Cuenta nómina vs. cuenta personal en banco PA**: si la cuenta es estrictamente "nómina" puede tener restricciones a recibir transferencias de terceros. Verificar con el banco; si aplica, abrir cuenta corriente USD adicional sin el flag de nómina.

## Confianza del análisis

| Afirmación | Confianza | Por qué |
|---|---|---|
| Wise no disponible Panamá | Alta | Confirmado en Wise Help Centre + múltiples reviews 2026 |
| Payoneer disponible Panamá | Alta | Confirmado en docs Payoneer + foros locales con casos de uso recientes |
| Global66 no lista Panamá oficialmente | Media-alta | Cuenta Global formal cubre AR/BR/CL/CO/EC/MX/PE; "170 países de registro" es ambiguo |
| Amazon Associates US no hace wire internacional | Alta | Confirmado: el .com paga cheque/giftcard/ACH; el sistema "International Direct Deposit" es para affiliates registrados en UK/DE/FR/IT/ES/CA cobrando a 52 países |
| Fees Payoneer USD 1–15 según retiro | Media | Fees cambian; verificar al momento de operar |
| Fees Banco General inbound wire USD 10–15 | Media | Reportado en foros y guías 2024–2026; no confirmado en tarifario oficial accedido (algunas páginas devolvieron 403) |
| Reportes de bloqueo Global66 | Media | Anecdótico pero múltiple y reciente (Fastcheck CL ene 2025, Reclamos.cl mar 2026) |
| Gift Card como alternativa eficiente para reinvertir | Alta lógicamente | Pero hay que confirmar que el operador efectivamente compra en Amazon US como parte del proyecto resale |
| W-8BEN retención 0% comisiones afiliados | Media-alta | Estándar para afiliados no-US prestando "servicios" fuera de US; conviene confirmar con contador panameño |

Datos oficiales: políticas Amazon Associates, Wise Help Centre, sitios oficiales Global66 y Payoneer.
Datos anecdóticos: fees exactos de retiro Payoneer→banco PA, reportes de bloqueos Global66, tiempos de wire entrante en bancos panameños.

## Fuentes

- [Amazon.com Associates Central — Help (métodos de pago)](https://affiliate-program.amazon.com/help/node/topic/G8VUMS6GTBCR9RGV)
- [Amazon Associates — Receive international affiliate earnings in your local bank](https://affiliate-program.amazon.com/resource-center/receive-your-international-affiliate-earnings-in-your-local-bank/)
- [Global66 — IBAN y Routing Number](https://www.global66.com/iban/)
- [Global66 Centro de Ayuda — Recibir USD/EUR/GBP](https://ayuda.global66.com/docs/primeros-pasos/recibe-dinero-directamente-a-tu-cuenta-en-usd-eur-y-gbp-con-global66/)
- [Global66 — Cuenta Global personas](https://www.global66.com/cuenta-global/)
- [Global66 Centro de Ayuda — Países disponibles Cuenta Global](https://ayuda.global66.com/docs/cuenta-global-personas/en-que-paises-puedo-tener-cuenta-global/)
- [Global66 lanza cuentas locales US/EU — chócale.cl 2024](https://chocale.cl/2024/08/global66-nuevo-servicio-de-transferencias-internacionales-cuentas-locales-eeuu-ach-wire-europa-iban/)
- [Fastcheck — Reclamos por bloqueos Global66 (ene 2025)](https://www.fastcheck.cl/2025/01/08/global66-la-fintech-que-enfrenta-reclamos-por-estafa-de-usuarios-en-chile-y-otros-paises/)
- [Reclamos.cl — Tarjeta Global66 (mar 2026)](https://www.reclamos.cl/global-66/reclamo/2026/mar/global-66-la-tarjeta-no-funciona-y-el-soporte-terrible)
- [Wise Help Centre — ¿Dónde puedo tener Wise?](https://wise.com/help/articles/2813542/where-do-i-need-to-live-to-hold-money-with-wise)
- [Wise Help Centre — Wise card en mi país](https://wise.com/help/articles/2968915/can-i-get-the-wise-card-in-my-country)
- [Wise Blog — Wise Business vs Personal US](https://wise.com/us/blog/wise-business-vs-personal)
- [Wise Help — Recibir Amazon con Wise](https://wise.com/help/articles/2968914/how-do-i-receive-money-from-amazon-with-wise)
- [Exiap — Wise card en Panamá 2026](https://www.exiap.com/guides/using-the-wise-card-in-panama)
- [OneSafe — Does Wise Work in Panama?](https://www.onesafe.io/blog/does-wise-work-in-panama)
- [Payoneer — Get paid by Amazon](https://www.payoneer.com/get-paid-by-amazon/)
- [Payoneer Pricing](https://www.payoneer.com/about/pricing/)
- [Payoneer — Prueba de residencia](https://www.payoneer.com/es/resources/how-to-use-payoneer/prueba-de-residencia-por-que-es-necesaria-y-como-presentarla/)
- [Payoneer Community — Usuarios en Panamá](https://community.payoneer.com/es/discussion/4394/usuarios-en-panama)
- [Payoneer Community — Retirar fondos a banco PA](https://community.payoneer.com/es/discussion/52605/retirar-fondos-a-una-cuenta-bancaria-de-panama)
- [Asinko — Payoneer en Panamá](https://www.asinko.com/financial-services/payoneer-panama)
- [Forobeta — Retiro Payoneer banco panameño tiempos](https://forobeta.com/temas/retiro-de-payoneer-a-cuenta-local-en-panama-comisiones-y-tiempo-de-transferencia.781483/)
- [Geniuslink — Amazon Affiliate commissions con Payoneer](https://geniuslink.com/blog/amazon-affiliates-payoneer/)
- [Banistmo — Tarifario](https://www.banistmo.com/acerca-de/tarifario)
- [Banco General — Transferencias internacionales empresas](https://www.bgeneral.com/empresas/transferencias-internacionales/)
- [Banesco Panamá — Tarifario internacional](https://www.banesco.com.pa/tarifario-internacional/)
- [Newsroom Panama — Cross-Border Payments 2026](https://newsroompanama.com/2026/04/08/cross-border-payments-in-panama-what-residents-and-expats-need-to-know/)
