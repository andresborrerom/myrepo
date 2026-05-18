# 03 — Fiscal y jurisdicción

> **Estado:** ⏳ decisión aplazada. Este documento es el comparativo para tomarla con asesor antes de la primera venta.
>
> **⚠️ Disclaimer:** Esto NO es asesoría fiscal. Es un mapa para tener una conversación informada con un asesor en España y otro en Panamá. **Antes de constituir, validar todo con profesionales.**

## El problema de fondo

- Andrés es residente fiscal en Panamá (o Colombia, a confirmar).
- Camilo es residente fiscal en España.
- El negocio vende producto digital a clientes globales, probablemente con peso en UE y LATAM.
- Shopify Payments y Stripe necesitan una entidad legal con cuenta bancaria en un país soportado.
- La residencia de los socios y la sede de la empresa determinan dónde se tributa, y al ser dos socios en dos países, **algo se tributa siempre, en algún lado**. La pregunta es cuál mix es más eficiente y limpio.

## Opciones principales

### Opción 1 — Sociedad Limitada (SL) en España, Cami administrador

**Cómo funciona:** la empresa está domiciliada en España. Cami es administrador y empleado/autónomo de la empresa. Andrés es socio (participaciones) y recibe dividendos.

**Pros**
- Limpio para vender en UE: IVA intracomunitario, OSS para B2C UE, factura europea estándar.
- Shopify Payments / Stripe sin fricción.
- Banco fácil de abrir.
- Cami puede facturar a la empresa como autónomo si conviene.

**Contras**
- Impuesto de Sociedades en España: 23% (PYME primeros años) o 25%.
- Reparto de dividendos a Andrés: retención en origen (típicamente 19%) + lo que aplique en Panamá (territorial, suele ser 0% si renta de fuente extranjera).
- Cuotas autónomo España (~300-590 €/mes según tramo) si Cami se da de alta.
- Burocracia trimestral (modelos 303, 130, 111, 115, etc.).

**Combinación efectiva carga fiscal** (orientativo, no exacto)
- 25% IS + 19% retención dividendos = ~39% efectivo si todo se reparte. Si se reinvierte, queda en 25%.

### Opción 2 — Sociedad anónima en Panamá, Andrés administrador

**Cómo funciona:** empresa domiciliada en Panamá (sociedad anónima o SRL). Andrés administra. Cami es socio o factura como autónomo en España por servicios prestados.

**Pros**
- **Renta territorial:** Panamá no grava renta de fuente extranjera (si vendés a clientes fuera de Panamá, 0% renta corporativa en Panamá).
- Costes operativos bajos.

**Contras**
- **Shopify Payments y Stripe tienen fricción con entidades panameñas.** Hay que verificar caso por caso, a veces requiere usar Stripe Atlas (entidad US) o pasarela alternativa.
- Bancos: dificultad creciente para abrir cuenta corporativa panameña con operaciones internacionales.
- Cami al recibir dinero en España tributa en España de todas formas (IRPF como salario, dividendos como rendimiento de capital).
- Reputacional / percepción: clientes UE pueden mirar raro una factura panameña.
- **CRS / intercambio automático de información** — Panamá reporta a España las cuentas de residentes españoles. No es escondite.

### Opción 3 — OÜ en Estonia (e-Residency)

**Cómo funciona:** empresa estonia, 100% digital. Los dos socios son e-residentes. Se administra remoto.

**Pros**
- **0% impuesto sobre beneficios no distribuidos.** Solo se paga (20%) al sacar dividendos.
- Pensada para socios en distintos países.
- Todo online: constitución, banca (Wise/Revolut Business), contabilidad (Xolo, ~80 €/mes).
- Reputación UE buena, IVA OSS posible.

**Contras**
- Cuando Cami saque dividendos a España, **España vuelve a gravar** como rendimiento de capital (19-28%) — hay convenio para evitar doble imposición pero hay que aplicarlo bien.
- Cuando Andrés saque a Panamá, depende de cómo se estructure la residencia.
- Hay que vigilar **residencia fiscal efectiva de la empresa**: si los administradores operan 100% desde España, Hacienda España puede argumentar que la empresa es residente fiscal española (riesgo serio).
- Costes recurrentes: ~150-250 €/mes entre contabilidad, e-residency, banca.

### Opción 4 — Stripe Atlas / LLC Delaware o Wyoming

**Cómo funciona:** LLC en USA, gestionada remotamente.

**Pros**
- Stripe Atlas (cuesta ~500 USD una vez) gestiona todo: LLC + EIN + cuenta Mercury + Stripe.
- Reputación global, facturación premium.
- Si la LLC es "pass-through" y ninguno de los socios es US person, **0% impuesto federal US** sobre ingresos de fuente no-US.

**Contras**
- Cada socio tributa en su país por su parte (Andrés en Panamá — probablemente 0% por territorialidad; Cami en España — IRPF como rendimiento de actividades económicas o transparencia fiscal internacional, ojo).
- **Riesgo de transparencia fiscal internacional en España** (régimen TFI / CFC) si la LLC no tiene sustancia real. Cami puede tener que imputar la renta como si fuera suya directamente.
- Form 5472 obligatorio anual en US (multas altas si no se presenta).

## Matriz resumen

| Opción | Coste setup | Coste mes | Carga fiscal efectiva* | Fricción Shopify/Stripe | Riesgo |
|---|---|---|---|---|---|
| SL España | ~600 € | ~200-400 € | ~25-40% | Mínima | Bajo |
| SA Panamá | ~1000 € | ~150 € | ~0-19%** | Alta | Medio (banca, percepción) |
| OÜ Estonia | ~500 € | ~150-250 € | ~0% si no se reparte | Baja | Medio (residencia efectiva) |
| LLC US | ~500 USD | ~50 USD | depende de socio | Mínima | Medio-alto (TFI España) |

\* Antes de IRPF personal del socio al recibir el dinero.
\** Pero Cami sigue pagando en España al recibir su parte.

## Recomendación tentativa (a validar con asesor)

Para el perfil del proyecto (digital, dos socios en países distintos, meta 20k€/mes):

1. **Si Cami va a operar día a día y vende mayoritariamente a UE → SL en España.** Limpio, predecible, sin sustos. Optimización viene después.
2. **Si la mayoría de ventas son fuera de UE (LATAM, US) y Andrés carga el peso operativo → LLC Delaware** vía Stripe Atlas, con Cami gestionando muy fino su lado en España.
3. **Estonia OÜ** suena ideal en papel pero el riesgo de residencia fiscal efectiva en España es real si Cami es la cara visible.

## Próximos pasos

- [ ] Definir residencia fiscal actual de Andrés (Panamá vs Colombia — afecta la opción Panamá).
- [ ] Estimar dónde van a estar los clientes (UE vs LATAM vs US) — afecta la opción óptima.
- [ ] **Conseguir 30 min con asesor fiscal español** que conozca casos internacionales (no un gestor genérico). Coste típico 100-200 €.
- [ ] **30 min con asesor en Panamá** sobre el efecto de recibir dividendos / salario de empresa extranjera.
- [ ] Volver a este documento, marcar la decisión.

## Decisión

A completar.

- **Jurisdicción:** _______
- **Tipo de entidad:** _______
- **Quién administra:** _______
- **Asesor consultado:** _______
- **Fecha:** _______
