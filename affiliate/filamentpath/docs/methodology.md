# Methodology — cómo armamos las reviews de filamentpath

> Última actualización: 2026-05-26
>
> Esta es la versión interna (en español, para el operador y agentes).
> La versión pública (en inglés, para el lector del sitio) vive en
> `site/src/pages/methodology.astro`.

## Contexto del nicho

filamentpath cubre equipo de impresión 3D FDM (Fused Deposition
Modeling): printers de filament, filamentos, y accesorios para FDM.
Resin (SLA / MSLA) queda fuera del scope inicial — se evalúa en mes 6
con safety overhead específico.

El framing fundamental es: **cada producto recomendado debe poder
defenderse con datos verificables y casos de uso explícitos**. No
"esta es la mejor" sin contexto, sino "para X uso y X presupuesto,
esto cumple porque Y".

## Dimensiones que evaluamos

Cada product page cubre, donde aplica, estas dimensiones:

1. **Print quality**
   - Layer consistency
   - Dimensional accuracy (en mm vs spec teórico)
   - Surface finish (matte / glossy, layer line visibility)
   - Bridging y overhang behaviour out of the box

2. **Bed adhesion consistency**
   - Auto-leveling reliability (cuántos prints entre re-calibraciones)
   - Build surface durability (PEI textured / smooth, vidrio, BuildTak)
   - First-layer behaviour PLA / PETG / ABS

3. **Print speed reliability**
   - Manufacturer claim vs. realistic throughput a calidad aceptable
   - Vibration compensation / input shaping disponibles
   - Ringing / ghosting en advertised speeds

4. **Ease of leveling y setup**
   - Tiempo de unboxing a primer print usable
   - Burden de calibración (manual, semi-auto, full auto)
   - Slicer profile availability (qué slicers traen perfiles
     pre-tuneados)

5. **Parts availability y serviceability**
   - Hotend, nozzle, build plate, electrónica — disponibilidad y
     precio de repuestos
   - Open vs proprietary (e.g. Bambu hotend proprietary vs MK8 open)
   - Community modding base

6. **Value per build volume**
   - Cost-per-cubic-mm de build space utilizable
   - Después de descontar accesorios "must-have" que no vienen en la
     caja

Para **filamentos**, las dimensiones son distintas:
- Diameter tolerance (±mm reportado)
- Print quality consistency entre batches
- Vacuum-sealed factory packaging (sí/no — afecta humidity-related
  defects out of the box)
- Color palette y disponibilidad
- Cost-per-kg
- Reviews / forum thread patterns (¿flagged QC issues recurrentes?)

Para **accesorios**, las dimensiones son:
- Compatibility (modelo / familia exacta)
- Build quality vs OEM equivalente
- Precio vs OEM
- Failure modes conocidos (e.g. PEI degrada con ABS)

## Fuentes de datos (en orden de peso)

1. **Manufacturer specifications y datasheets**.
   Build volume, layer height range, max speed, temp limits, hotend
   y extruder design, compatible materials, dimensions, weight,
   warranty. Verificamos contra ≥2 fuentes oficiales cuando algo
   parece inconsistente.

2. **Aggregate user reports**.
   Threads de larga duración en r/3Dprinting, r/BambuLab,
   r/PrusaSlicer, r/FixMyPrint. Forum threads en All3DP. Verified-purchase
   reviews en Amazon. Pesamos threads técnicos con failure modes
   reproducibles más que opiniones cortas.

3. **Reviewer consensus en outlets independientes**.
   YouTube channels y publicaciones 3D-printing que declaran si la
   unit fue comprada o provista por el manufacturer. Anotamos cuando
   reviews involucran loaner units.

## Lo que NO hacemos

- No reseñas falsas, no anécdotas de "first print" si el operador
  no imprimió esa unidad.
- No aceptamos payment por ranking.
- No recomendamos productos fuera del budget que el reader indicó —
  incluso cuando un opción más cara nos pagaría más.
- No pretendemos que un printer de $200 iguala uno de $700. Cuando
  el gap es real, lo decimos. Cuando no importa para el caso de uso
  del lector (e.g. miniaturas en PLA), también lo decimos.
- No escribimos contenido optimizado solo para search rankings si no
  agrega valor al lector.

## Caveats de la metodología (limitations)

- Specs no capturan todo. Dos printers con misma max speed advertised
  y misma accuracy claim pueden producir piezas notablemente
  distintas — pesamos user reports para acortar este gap, pero
  permanece como limitación.
- Nuevos printers entran al mercado más rápido de lo que se forma
  consensus user-reported confiable. Releases <6 meses se marcan
  explícitamente como **preliminary**.
- Cobertura skewed a Amazon-availability. Opciones direct-from-manufacturer
  (Prusa Research direct store, Bambu Lab store, Voron community kits)
  se referencian sin affiliate link cuando no están en Amazon.
- FDM-first. Resin (SLA / MSLA) tiene safety y handling diferentes;
  cuando lo abramos, va con guidance explícito de PPE y ventilación,
  no por inferencia desde FDM.

## Diferencias intencionales vs baristapath methodology

Documentado también en `affiliate/SCAFFOLD.md`. Resumen:

| Dimensión | baristapath | filamentpath |
|---|---|---|
| Specs evaluadas | boiler, PID, group head | build volume, layer height, motion system |
| Use-case fit | shot quality, milk drinks | print quality, bed adhesion, materials |
| Cost framing | cost-per-cup, payback period | cost-per-build-volume + must-have accessories |
| Safety section | water hardness, descaling | resin handling (cuando expandamos), ventilation para ABS |

## Anti-gray-hat en este nicho específico

Riesgos identificados que NO vamos a hacer:

- **Fake "first print" anecdotes**. El operador imprime con printers
  específicos; cuando reseñamos uno que no tenemos, lo decimos.
- **Empujar el printer "del mes" cuando hay uno mejor por el mismo
  precio**. Si Bambu A1 mini es mejor que Ender V3 SE para el caso
  X, lo decimos aunque la comisión de Ender sea más alta.
- **Affiliate links a productos peligrosos sin disclaimer**. Resin
  printing requiere PPE y ventilación; cuando lo cubramos, la
  product page va a tener safety section ANTES del affiliate button,
  no después.
- **Specs inventados**. Si no podemos verificar un spec, lo dejamos
  con `TODO: verify spec` y NO publicamos hasta confirmarlo.

## Cómo flagear errores

Si encontrás (o un lector encuentra) un spec incorrecto, precio
stale, o producto que ya no existe:

- Editar el archivo del product en `site/src/content/products/<slug>.md`.
- Actualizar `updated_at`.
- Commit con razón en el message.

Errores materiales se corrigen idealmente en 48h. La página `methodology.astro`
del sitio público promete eso al lector.
