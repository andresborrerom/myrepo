# 03 — Fiscal y jurisdicción

> **Estado:** 🟢 recomendación con alta convicción tras investigación actualizada a mayo 2026 — **SL España microempresa**. Pendiente confirmar con asesor colegiado antes de constituir (ver `14-fiscal-kit-asesor.md`).
>
> **⚠️ Disclaimer:** Esto NO es asesoría fiscal. Es un mapa para tener una conversación informada con un asesor. **Antes de constituir, validar todo con profesionales.**

## El problema de fondo

- Andrés: residente fiscal en Panamá (a confirmar — el escenario Colombia cambiaría muchas conclusiones).
- Camilo: residente fiscal en España (Andalucía), lleva 15 años allí.
- Servicio principal: acompañamiento inmobiliario premium en España para clientes mayoritariamente LATAM (80% LATAM no residentes UE).
- Volumen esperado: 60-100 k€ año 1, 180-240 k€ año 2.
- Pasarela necesaria: Stripe + cuenta bancaria europea.

## Los tres atadores fiscales a España que cambian el análisis

La conclusión rápida del análisis 2026 es que **este negocio concreto tiene tres anclas que ninguna estructura offshore resuelve**:

### 1. Localización por inmueble (art. 70.Uno.1º LIVA)

El servicio core (acompañamiento inmobiliario, visitas, due diligence sobre inmuebles **sitos en España**) se considera prestación de servicios relacionada con bienes inmuebles. Por la regla de localización, esto significa **IVA español 21%** sobre el componente in situ, **independientemente** de dónde esté la sociedad. Una OÜ Estonia o LLC Delaware no te libra de este IVA. Solo el curso digital 100% online puede beneficiarse de no-sujeción si los clientes son no UE.

### 2. Residencia fiscal efectiva (art. 8.1 LIS) + consulta DGT V1964-20

Si Cami toma decisiones operativas desde España (lo cual hará — vive y trabaja allí), Hacienda tiene base sólida para considerar que **cualquier entidad extranjera tiene sede de dirección efectiva en España y por tanto es residente fiscal española**. La consulta vinculante V1964-20 lo dice expresamente para OÜ estonias con socio único operando desde España. El **TEAC 4903/2024** (abril 2025) consolida criterios sobre establecimiento permanente. **Caso Koldo** (2024-2025) hizo de las estructuras estonias un foco de inspección activo.

### 3. Volumen pequeño año 1

Con 60-100 k€ de beneficio, la microempresa española paga **19% sobre los primeros 50 k€ + 21% sobre el resto** (reforma 2025-2026). El ahorro teórico offshore (~10-15 puntos en papel) **no compensa** el coste anual de cumplimiento dual (3-5 k€) ni el riesgo de inspección. La aritmética solo cambia a partir de 200+ k€/año con operación deslocalizable real.

---

## Opciones principales (datos verificados mayo 2026)

### Opción 1 — SL en España (RECOMENDADA)

**Cómo funciona:** SL domiciliada en España. Cami administradora (o autónoma societaria). Andrés socio recibiendo dividendos, residente en Panamá.

**Tipos impositivos 2026 confirmados**
- **Microempresas** (cifra de negocio < 1 M€): **19% sobre primeros 50 k€** + **21% sobre el resto** *[novedad 2025-2026]*.
- **PYME** (1-10 M€): 23%.
- **Tipo general:** 25%.
- **Empresa de nueva creación** (sin etiqueta startup): 15% en los dos primeros ejercicios con base positiva (art. 29.1 LIS).
- **Startup certificada ENISA** (Ley 28/2022): **15% durante 4 años**. Para acompañamiento inmobiliario premium **probablemente no califica** (ENISA exige base tecnológica innovadora) — verificar caso por caso, pero asumir que no aplica.
- **Retención dividendos a Andrés (no residente Panamá):** 19% IRNR, reducible por CDI España-Panamá (vigente desde 2011).

**Coste fiscal estimado año 1** (60 k€ beneficio antes IS): **~12 k€ IS** (19% en escala micro).

**Pros**
- Cero discusión sobre residencia fiscal de la entidad.
- Stripe nativo, banca española sin fricción.
- IVA limpio (21% donde toca, exportación servicios fuera UE limpia).
- Cami puede combinar sueldo (deducible IS) + dividendos (renta del ahorro IRPF 19-28%) optimizando carga personal.
- Andrés recibe dividendos vía CDI España-Panamá sin sorpresas.
- Modelo predecible, asesor barato, sin riesgo de inspección agresiva.

**Contras**
- Coste fiscal nominal mayor que en papel offshore. En la realidad, casi igual una vez computados costes de cumplimiento.
- Burocracia trimestral (303, 130, 111, 115, 200 anual).
- Cuotas autónomo si Cami es societaria (~290-590 €/mes según tramo 2026).

### Opción 2 — SA Panamá (DESCARTADA con la información actual)

**Tres golpes simultáneos:**
1. **Stripe no opera con entidades panameñas** en 2026 (Panamá no está en los ~46 países soportados). Tendrías que usar Merchant of Record tipo Paddle/LemonSqueezy (comisión 5-8%) o entidad complementaria en USA solo para cobros.
2. **Panamá sigue en lista negra UE** (febrero 2026), generando fricción KYC bancaria. España la sacó de su Orden HFP/115/2023, así que no es paraíso fiscal para España — pero las medidas anti-abuso (TFI) sí aplican.
3. **Proyecto de Ley 641** en discusión mayo 2026 introducirá previsiblemente un **15% sobre rentas pasivas extranjeras sin sustancia económica**. La ventaja de territorialidad pura está erosionándose.

**Adicionalmente:** Si Cami tiene ≥50% (o con vinculados), **TFI español** imputa la renta directamente a su IRPF.

### Opción 3 — OÜ Estonia (DESCARTADA en el escenario actual)

**Datos 2026 verificados:**
- 0% sobre beneficios retenidos.
- **22% sobre dividendos distribuidos** (fórmula 22/78). La subida al 24% planificada para 2026 fue cancelada en diciembre 2025.
- **Régimen reducido 14/86 abolido en enero 2025**.
- **IVA estonio (KMS) subió al 24%** desde julio 2025.

**Tres riesgos críticos:**
1. **Consulta vinculante DGT V1964-20**: OÜ con socio único trabajando desde España = residente fiscal española. Esta es la consulta-paraguas que Hacienda usa.
2. **TFI español** aplica salvo sustancia real demostrable en Estonia (oficina, empleados, decisiones tomadas allí) — que NO se da en este caso.
3. **Caso Koldo** disuasor: Hacienda + Guardia Civil están persiguiendo activamente estructuras estonias mal montadas.

**Cuándo reconsiderar:** solo si el negocio pivota a 100% digital (curso es el 80%+ de ingresos), Cami se queda con <25% de la OÜ, y Andrés (en Panamá) administra documentadamente desde allí.

### Opción 4 — LLC Delaware/Wyoming (DESCARTADA en el escenario actual)

**Datos 2026 verificados:**
- LLC pass-through: 0% federal si ningún socio es US person y no hay ECI.
- **Form 5472 + pro forma 1120 obligatorios**: multa por incumplimiento **25 000 USD por formulario**, +25 000 USD por cada 30 días tras notificación IRS.
- **BOI Reporting (CTA): YA NO APLICA** para LLCs US-formed desde marzo 2025 (Treasury cambió la regla).
- **One Big Beautiful Bill Act** (Trump, julio 2025): introduce **1% remittance excise tax** sobre ciertos pagos US a no residentes desde ejercicios tras 31/12/2025 — detalle exacto requiere confirmación con asesor US.

**Problema fundamental para este caso:** la LLC es **transparente fiscalmente**. Cami residente española tributa **toda** su parte en IRPF al marginal (hasta 47% en Andalucía 2026). No hay diferimiento. Es **peor** que SL España, no mejor.

**Cuándo reconsiderar:** solo si Andrés es **único socio 100%** y Cami factura como autónoma externa española. En ese caso ya no es partnership, es relación cliente-proveedor.

---

## Tabla comparativa actualizada 2026

| Concepto | **1. SL España** ✅ | 2. SA Panamá | 3. OÜ Estonia | 4. LLC USA |
|---|---|---|---|---|
| IS efectivo | 19% (0-50k€) + 21% (resto) | 0% renta extranjera (proyecto 641: 15%) | 0% retenido / 22% distribuido | 0% federal (pass-through) |
| IRPF para Cami | Sueldo + dividendo 19-28% (ahorro) | TFI: imputa al marginal hasta 47% | TFI: imputa al marginal hasta 47% | Pass-through: marginal hasta 47% |
| IVA componente inmobiliario | 21% España (correcto) | 21% España igual (regla del inmueble) | 21% España igual | 21% España igual |
| Residencia fiscal entidad | España, sin discusión | **Riesgo alto** España | **Riesgo muy alto** España (V1964-20) | **Riesgo alto** España |
| Stripe | ✅ nativo | ❌ no soportado | ✅ nativo | ✅ nativo |
| Coste setup | ~3 000 € | ~1 700 USD + 300 USD/año | ~1 000 € primer año | ~500 USD Atlas |
| Coste cumplimiento anual | 2 500-4 000 € | 1 500 USD + 2 000+ € gestor ES | 2 000-3 500 € total | 2 400-4 000 € total |
| Riesgo legal mayor | Mínimo | EU blacklist, sin Stripe, TFI | V1964-20 + Koldo + TFI | Form 5472 (25k$), EP español igual |

---

## Recomendación

### **1ª opción — SL España microempresa (alta convicción)**
Por las tres anclas estructurales más el factor volumen pequeño, **es la única opción con sentido coste/riesgo para arrancar**.

Coste fiscal año 1 estimado a 60 k€ de beneficio: **~12 k€ IS**.
A 100 k€ beneficio: **~20 k€ IS** (19% sobre 50k€ + 21% sobre 50k€).

### **Si llega año 2 con 200+ k€/año y el curso digital escala**
Reevaluar: una OÜ Estonia podría tener sentido **solo para el componente digital**, con Andrés como administrador real desde Panamá y Cami como socia minoritaria <25%. Pero eso requiere un rediseño operativo (Cami opera solo lo presencial bajo su autónomo separado, la OÜ vende solo cursos digitales). Es una segunda fase del negocio, no una decisión de partida.

### **Régimen Beckham para Cami: NO aplica**
Confirmado. Beckham exige no haber sido residente fiscal en España en los 5 años previos. Cami lleva 15. Excluido por completo.

---

## Decisiones registradas

- **2026-05-23** — Tras investigación con datos actualizados 2026, se rechazan opciones 2 (Panamá), 3 (Estonia) y 4 (USA LLC) para arranque. Razones: regla del inmueble (IVA español igualmente), residencia fiscal efectiva de la entidad (V1964-20 + TEAC 4903/2024), TFI sobre Cami, sin Stripe en Panamá, sin ahorro real con volumen año 1.
- **2026-05-23** — Recomendación de constituir como **SL España microempresa**, con Cami administradora y Andrés socio recibiendo dividendos vía CDI España-Panamá.
- **2026-05-23** — Régimen Beckham descartado para Cami.

## Próximos pasos

- [ ] Confirmar residencia fiscal **real, no aspiracional**, de Andrés a fecha de constitución (Panamá vs Colombia). Colombia cambiaría parte del análisis para el lado de Andrés.
- [ ] Si Panamá: obtener certificado de residencia fiscal panameño emitido por DGI (exige +183 días físicos y arraigo).
- [ ] Decidir **% participación** Andrés/Cami antes de la llamada con asesor. Sugerencia neutra: 50/50 con cláusula revisión 12 meses.
- [ ] Agendar **30-60 min con asesor fiscal español con experiencia internacional** (ver `14-fiscal-kit-asesor.md` con las 23 preguntas concretas). Coste 100-200 €.
- [ ] Agendar **30 min con asesor panameño** (o colombiano según residencia de Andrés). Coste 150-300 USD.
- [ ] Verificar con asesor las dos cuestiones críticas:
  1. ¿El servicio principal sobre inmueble español puede facturarse desde fuera sin IVA español?
  2. ¿Hay alguna estructura que sobreviva a la doctrina V1964-20 + TEAC 4903/2024 en este caso concreto?
- [ ] Si ambas respuestas son "no" como esperamos: **SL España, decisión final, constituir**.
- [ ] Verificar elegibilidad ENISA startup (Ley 28/2022) — improbable pero si aplica, son 15% IS los 4 primeros años.
- [ ] Constituir: Registro Mercantil Central + notaría + alta IAE + alta censal Modelo 036 + cuenta bancaria.

## Decisión final

A completar tras consulta con asesor.

- **Jurisdicción:** España (provisional, alta convicción)
- **Tipo de entidad:** Sociedad Limitada (microempresa)
- **Quién administra:** Cami (provisional)
- **Régimen Cami:** autónomo societario o asalariado (decidir con asesor)
- **% socios:** _______ (decidir antes de consultar asesor)
- **Asesor consultado:** _______
- **Fecha decisión:** _______
- **Fecha constitución:** _______

## Fuentes consultadas (mayo 2026)

Tipos impositivos verificados con múltiples fuentes secundarias actualizadas:
- Sanchis Asesores, Autónomos y Emprendedor — micropymes 2026
- EY — cambios fiscales Estonia 2025-2026
- BDO Panamá / KPMG Panamá — Proyecto Ley 641 sustancia económica
- Infobae — Panamá en lista negra UE feb 2026
- BOE — Orden HFP/115/2023 jurisdicciones no cooperativas
- foreignfile.tax — Form 5472 multas 2026
- terms.law — BOI exemption US-formed LLCs 2026
- Cuatrecasas / Baker Tilly — IVA servicios y EP doctrina TEAC 2025
- Primera Lectura — Consulta V1964-20 OÜ Estonia
- Gómez-Acebo & Pombo — Residencia fiscal entidades extranjeras
- InternationalTaxationSpain — Spain CFC Guide 2026
- BOE — CDI España-Panamá / España-Estonia / España-USA
- TheObjective — Caso Koldo y residencia fiscal Estonia
- Iryssolutions — OÜ Estonia desde España riesgos

**Limitaciones:** sitios oficiales (sede.agenciatributaria.gob.es, ey.com, emta.ee) bloquearon WebFetch directo. Los tipos están confirmados por fuentes secundarias múltiples pero deben contrastarse con asesor con acceso al BOE consolidado y consultas DGT actualizadas. El Proyecto de Ley 641 panameño está en discusión y puede aprobarse con modificaciones.
