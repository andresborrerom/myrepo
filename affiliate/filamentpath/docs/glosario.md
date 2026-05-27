# Glosario — filamentpath

Términos clave del proyecto y del nicho 3D printing. Si Claude usa una
sigla y no aparece acá, es bug — me lo agregás en el mismo commit.

Orden alfabético dentro de cada sección. Algunos términos también
aparecen en el `glosario.md` del proyecto raíz (baristapath o
cross-portfolio); acá viven los **específicos del nicho 3D printing**.

---

## Términos del nicho (3D printing FDM)

**ABS** (Acrylonitrile Butadiene Styrene)
Termoplástico de filamento. Resistente al calor y al impacto, pero
emite olor y partículas durante el printing y requiere ventilación +
typicamente una enclosure. No es PLA; un printer abierto sin chamber
heated va a sufrir warping en piezas grandes.

**Bed adhesion**
La calidad de unión entre la primera layer del print y la build plate.
Si falla, la pieza se despega y el print se arruina. Depende de bed
temperature, leveling, build surface (PEI texturado, vidrio, BuildTak),
y de la limpieza del plate. Es la causa #1 de prints fallidos para
usuarios nuevos.

**Bridging**
Imprimir un puente de filamento entre dos puntos sin support debajo.
Test típico para evaluar cooling y calibración: bridges limpios indican
buen flow + fan speed; bridges con sag o stringing indican problemas.

**Build volume**
Espacio máximo imprimible (X × Y × Z) en mm. Spec headline de cualquier
printer. Ojo: el "useful build volume" suele ser un poco menor que el
nominal porque hay zonas en los bordes donde la primera layer no
adhiere bien o el motion system tiene jitter.

**Direct drive vs Bowden**
Dos arquitecturas de extruder. Direct drive monta el motor del extruder
sobre el toolhead (cerca del hotend) — mejor para flexibles (TPU),
peor para máxima velocidad por la masa del toolhead. Bowden separa el
motor del hotend con un tubo PTFE — más rápido, peor para flexibles.

**FDM** (Fused Deposition Modeling)
Tecnología de printing por extrusión de filamento fundido layer por
layer. Sinónimos: FFF (Fused Filament Fabrication, término más común
en ámbitos open-source porque FDM es trademark de Stratasys). La
mayoría de printers consumer son FDM.

**Infill**
Patrón interno de relleno de una pieza. Se mide en porcentaje (0-100%)
y patrón (gyroid, cubic, lines, honeycomb, etc.). Más infill = pieza
más fuerte y pesada, pero más tiempo y más filament. Para piezas
decorativas, 10-15% gyroid es común; para piezas funcionales, 30-50%.

**Layer height**
Altura de cada capa impresa, en mm. Típicamente 0.1-0.3mm en FDM.
Layer height menor = más detalle visible + más tiempo de print. La
nozzle también limita: con nozzle 0.4mm, layer height práctica es
0.05-0.32mm.

**PEI** (PolyEtherImide)
Material de build plate más popular en consumer FDM moderno. Buena
adhesión con PLA, PETG, ABS y la mayoría de filamentos sin necesidad
de glue. Versión texturada deja marcas mate en la primera layer;
versión smooth deja brillo. Degrada con uso intenso de ABS / ASA.

**PETG** (Polyethylene Terephthalate Glycol-modified)
Material de filamento. Más resistente y flexible que PLA, mejor
performance al calor (no se deforma a 60°C como PLA), pero más
propenso a stringing y absorbe humedad rápido. Estándar de facto para
piezas funcionales en hobbyist FDM.

**PLA** (Polylactic Acid)
Material de filamento más común. Fácil de imprimir, low warping, no
toxic durante el printing. Limitaciones: deforma sobre 60°C, frágil
para piezas mecánicas con stress repetido, no apto para outdoor por
UV. Es el filamento de aprendizaje y de prints decorativos.

**Retraction**
Movimiento del extruder hacia atrás cuando el toolhead se mueve sin
extruir filament, para evitar stringing. Settings típicos: distance
(mm) y speed (mm/s). Direct drive necesita menos retraction (~0.5-2mm)
que Bowden (~5-7mm). Tunearlo bien es la diferencia entre prints
limpios y prints "spaghetti".

**Slicing**
Proceso de convertir un modelo 3D (STL, 3MF, OBJ) en G-code que el
printer entiende, layer por layer. Software típico: PrusaSlicer,
Bambu Studio, OrcaSlicer, Cura. Cada slicer trae profiles tuneados
por printer; cambiar de slicer típicamente requiere re-tuneo de
profile.

**Stringing**
Hilos finos de filamento que quedan entre piezas separadas por aire
en una print. Causas: retraction insuficiente, temperatura de nozzle
muy alta, filamento húmedo. Se diagnostica con prints específicos
(stringing test towers).

**Supports**
Estructura impresa debajo de overhangs > ~45° para que no caigan.
Se quitan después del print. Cuanto más complejo el modelo, más
material y tiempo se gastan en supports — diseños con orientación
inteligente minimizan supports.

**TPU** (Thermoplastic Polyurethane)
Filamento flexible. Shore hardness se mide en grados A (más bajo =
más blando). 95A es entry-level / firme; 85A es flexible típico;
75A es muy blando y difícil de imprimir. Requiere print speeds bajos
(20-40 mm/s) y preferiblemente direct drive.

---

## Términos del proyecto / siglas operativas

Para términos cross-niche y siglas operativas (ADR, KGR, Associates,
etc.) ver `affiliate/baristapath/docs/glosario.md`. Si un término no
existe ni acá ni allá, lo agregás en la primera mención.

---

## Pendiente expandir en Sub-sprint 3

Cuando entremos a Sub-sprint 3 con KGR verde, agregar:

- Resin printing terms (uncured resin, IPA wash, FEP film, cure
  time) — sólo cuando expandamos a SLA / MSLA. Va con safety
  callouts explícitos.
- Workflow terms (slicer profiles, calibration cubes, temperature
  towers, flow calibration) en su propia sección "calibration".
- Brand-specific terms (AMS, Lidar, Klipper, Octoprint) en sección
  "ecosistema".
