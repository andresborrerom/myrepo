# Prompt de cualificación con IA

> Prompt listo para enviar a Claude API (modelo Sonnet 4.6 o 4.7) tras cada submission del cuestionario. Devuelve JSON estructurado que decide el routing del lead. Incluye casos de prueba para validar antes de poner en producción.

---

## Configuración técnica

**Endpoint:** `https://api.anthropic.com/v1/messages`
**Modelo recomendado:** `claude-sonnet-4-6` (balance coste/calidad). Si querés máxima precisión, `claude-opus-4-7`.
**Max tokens:** 800
**Temperature:** 0.2 (queremos consistencia, no creatividad)
**Coste estimado por lead:** $0.005-0.015 según modelo

---

## System prompt

```
Eres un asistente que evalúa la calidad de leads para un servicio premium de
acompañamiento en compra de inmuebles en España, dirigido a inversores
latinoamericanos.

El servicio:
- Cuesta 4500-6500 EUR por operación completa
- Dura 3-4 meses desde briefing hasta llaves
- Está dirigido a inversores LATAM con patrimonio líquido >=200 000 EUR
- Busca compradores con intención real, no exploradores

Tu trabajo es analizar las respuestas del lead al cuestionario de aplicación y
devolver SOLO un JSON con esta estructura exacta:

{
  "score": <número entero del 1 al 10>,
  "tier": "A" | "B" | "C",
  "razon_principal": "<frase corta, máx 20 palabras>",
  "fortalezas": ["<elemento 1>", "<elemento 2>"],
  "alertas": ["<elemento 1>", "<elemento 2>"],
  "preguntas_para_llamada": ["<pregunta 1>", "<pregunta 2>"],
  "recomendacion_routing": "agenda_directa" | "indagar_antes" | "redirigir_curso" | "rechazar_amable"
}

Reglas de scoring:

CRITERIOS DE FIT ALTO (suman puntos):
- Patrimonio líquido >=500 000 EUR: +2 puntos
- Patrimonio líquido 200-500 000 EUR: +1 punto
- Horizonte 3-6 meses: +2 puntos
- Horizonte 6-12 meses: +1 punto
- Uso claro (no "no lo tengo claro"): +1 punto
- País LATAM principal (México, Colombia, Argentina, Chile, Perú, Venezuela,
  Uruguay, Panamá): +1 punto
- Frenos articulados con concreción (no respuestas genéricas tipo "no sé"): +1 punto
- Primera operación internacional: +1 punto (es nuestro sweet spot, agregan valor)
- Zona específica seleccionada (no "sin preferencia"): +1 punto

CRITERIOS DE FIT BAJO (restan puntos):
- Patrimonio <200 000 EUR: -4 puntos
- Horizonte "explorando, sin fecha": -3 puntos
- Horizonte >12 meses: -2 puntos
- Uso "todavía no lo tengo claro": -1 punto
- País fuera de LATAM (Europa, ya residente España): -2 puntos
- Frenos vagos o ausentes (<50 caracteres aunque pase validación): -1 punto
- Indicios de que ya tiene operación cerrada y solo busca validación gratis:
  -3 puntos (revisar pregunta 9 con cuidado)

ASIGNACIÓN DE TIER:
- Tier A: score 8-10
- Tier B: score 6-7
- Tier C: score <=5

RECOMENDACIÓN DE ROUTING:
- "agenda_directa" si tier A
- "indagar_antes" si tier B
- "redirigir_curso" si tier C con patrimonio insuficiente pero buena intención
- "rechazar_amable" si tier C por mal fit estructural (no es target geográfico,
  o claramente busca aprovecharse)

PARA "preguntas_para_llamada":
Genera 2-3 preguntas específicas que Andrés debería hacer en la llamada,
basadas en lo que el lead respondió. Ejemplos:
- Si menciona "riesgo cambiario" → preguntar cómo planea cubrir el spread
- Si no tiene zona clara → preguntar cuál es su prioridad real (uso vs renta)
- Si tiene patrimonio alto pero horizonte largo → preguntar qué dispararía la
  decisión final

Sé honesto y conservador. Es preferible un falso negativo (Tier B cuando podría
ser A) que un falso positivo (que ocupe el tiempo limitado de Andrés con un
lead que no va a cerrar).

Devuelve SOLO el JSON. Sin explicaciones, sin texto antes ni después.
```

---

## User prompt template (a rellenar con datos del formulario)

```
Datos del lead:

Nombre: {{nombre}}
País de residencia: {{pais_residencia}}
Edad: {{edad}}
Patrimonio líquido disponible: {{patrimonio}}
Horizonte de compra: {{horizonte}}
Uso principal: {{uso}}
Zonas de interés: {{zonas}}
Compras previas fuera de su país: {{compras_previas}}
Frenos para hacerlo solo: {{frenos_texto_libre}}

Evalúa según las reglas del system prompt y devuelve el JSON.
```

---

## Casos de prueba (validar antes de poner en producción)

### Caso A — Lead claramente tier A

**Input:**
- País: México
- Edad: 45-54
- Patrimonio: 1 000 000 - 3 000 000 €
- Horizonte: 3-6 meses
- Uso: Mixto (uso ocasional + alquiler)
- Zonas: Madrid + Marbella
- Compras previas: Sí, una vez (en Miami)
- Frenos: "Me frena no tener red local en España. Tengo asesor financiero
  bueno en México pero ninguno con experiencia operativa en España. Mi mujer
  y yo viajamos a Madrid 2 veces al año por trabajo y queremos tener una
  base estable, además de generar algo de rentabilidad cuando no estemos."

**Output esperado:**
```json
{
  "score": 10,
  "tier": "A",
  "razon_principal": "Patrimonio sobrado, horizonte claro, uso definido, frenos articulados.",
  "fortalezas": [
    "Patrimonio amplio sin restricciones aparentes",
    "Horizonte concreto a 3-6 meses",
    "Experiencia previa en compra internacional (Miami)",
    "Frenos exactamente del tipo que resolvemos"
  ],
  "alertas": [
    "Confirmar que decisión es individual o requiere consenso con esposa",
    "Indagar si el alquiler vacacional encaja con su perfil fiscal en México"
  ],
  "preguntas_para_llamada": [
    "¿Tu mujer decide contigo? Conviene que participe del briefing si es así.",
    "¿La compra de Miami la cerraste con acompañamiento local o por tu cuenta? Eso nos ayuda a calibrar expectativas.",
    "Si tuvieras que elegir entre uso propio óptimo y rentabilidad óptima, ¿qué prioriza el inmueble?"
  ],
  "recomendacion_routing": "agenda_directa"
}
```

### Caso B — Lead intermedio (tier B)

**Input:**
- País: Argentina
- Edad: 35-44
- Patrimonio: 200 000 - 500 000 €
- Horizonte: 6-12 meses
- Uso: Plan B residencial
- Zonas: Sin preferencia clara, abierto a recomendación
- Compras previas: No
- Frenos: "Lo que más me frena es que no tengo claro si lo que quiero es
  comprar o alquilar primero. También me preocupa el cepo cambiario, sacar
  los fondos de Argentina es complicado."

**Output esperado:**
```json
{
  "score": 7,
  "tier": "B",
  "razon_principal": "Patrimonio justo, intención real pero plan no consolidado.",
  "fortalezas": [
    "Patrimonio en rango aceptable",
    "Horizonte de 6-12 meses razonable",
    "Frenos articulados y honestos"
  ],
  "alertas": [
    "Indecisión entre comprar y alquilar puede prolongar el ciclo",
    "Cepo argentino agrega complejidad operativa real",
    "No sabe en qué zona, hay que filtrar mucho"
  ],
  "preguntas_para_llamada": [
    "¿Qué pasaría si el año próximo no compras y solo alquilas? ¿Cuál sería el coste de no decidir?",
    "¿Tienes parte del patrimonio fuera de Argentina (Uruguay, EEUU)? Eso cambia mucho la operativa.",
    "Cuando dices 'Plan B residencial', ¿estás pensando en mudanza efectiva o solo opción a futuro?"
  ],
  "recomendacion_routing": "indagar_antes"
}
```

### Caso C — Lead bajo patrimonio pero buen perfil

**Input:**
- País: Colombia
- Edad: 25-34
- Patrimonio: Menos de 200 000 €
- Horizonte: 6-12 meses
- Uso: Diversificación pura
- Zonas: Valencia + Málaga
- Compras previas: No
- Frenos: "Mi presupuesto es ajustado para Madrid o Barcelona, por eso miro
  ciudades secundarias. Me frena no saber qué tan rentable es comprar algo
  pequeño y si el alquiler cubre los gastos."

**Output esperado:**
```json
{
  "score": 4,
  "tier": "C",
  "razon_principal": "Patrimonio por debajo del umbral del servicio premium.",
  "fortalezas": [
    "Intención real y proyecto claro",
    "Análisis de coste-beneficio sensato",
    "Geografía elegida con criterio"
  ],
  "alertas": [
    "Patrimonio insuficiente para servicio premium (umbral 200k EUR)",
    "Honorarios fijos de 5k EUR sobre operación de ~150k son antieconómicos"
  ],
  "preguntas_para_llamada": [],
  "recomendacion_routing": "redirigir_curso"
}
```

### Caso D — Lead a rechazar

**Input:**
- País: España (ya residente)
- Edad: 55-64
- Patrimonio: Prefiero comentarlo en llamada
- Horizonte: Próximos 3 meses
- Uso: Todavía no lo tengo claro
- Zonas: Madrid
- Compras previas: Sí, varias veces
- Frenos: "Quería una llamada para que me orienten sobre un piso que ya
  estoy a punto de cerrar, para confirmar que el precio es correcto."

**Output esperado:**
```json
{
  "score": 2,
  "tier": "C",
  "razon_principal": "Residente España + operación ya en curso, busca validación gratis.",
  "fortalezas": [],
  "alertas": [
    "Vive en España, fuera del nicho LATAM",
    "Operación ya cerrada, no es trabajo nuestro",
    "No quiere acompañamiento, quiere segunda opinión puntual"
  ],
  "preguntas_para_llamada": [],
  "recomendacion_routing": "rechazar_amable"
}
```

---

## Email automático tras la cualificación (según routing)

### Si "agenda_directa" (Tier A)

```
Asunto: {{first_name}}, hablamos? (45 min)

Hola {{first_name}},

Leí tu aplicación. Tu caso encaja bien con lo que hacemos. Te paso link directo
para que agendes una llamada conmigo:

[LINK_CAL]

45 minutos, sin presión de venta. Es para entender bien tu situación y
contarte cómo trabajamos. Si después de la llamada uno de los dos decide que
no encaja, fin de la historia y nos despedimos amigos.

Algunas cosas que voy a querer hablar:
- {{pregunta_para_llamada_1}}
- {{pregunta_para_llamada_2}}

Andrés
```

### Si "indagar_antes" (Tier B)

```
Asunto: {{first_name}}, una pregunta antes de agendar llamada

Hola {{first_name}},

Recibí tu aplicación. Tu caso me interesa pero hay un par de cosas que quiero
entender mejor antes de agendar una llamada (para no hacerte perder tiempo si
no encajamos).

{{pregunta_para_llamada_1}}

Cuando me respondas, si seguimos adelante, te paso link para agendar llamada
de 45 min.

Andrés
```

### Si "redirigir_curso" (Tier C bajo patrimonio)

```
Asunto: {{first_name}}, lo que sí podemos hacer

Hola {{first_name}},

Gracias por la aplicación detallada y honesta. Te voy a ser igual de honesto:

Nuestro servicio de acompañamiento personalizado está pensado para operaciones
desde 200 000 € hacia arriba, principalmente porque los honorarios fijos de
5 000 € sobre operaciones más pequeñas se vuelven antieconómicos para vos.

Lo que sí te puede servir muy bien:

Tenemos un **curso digital autoguiado** (497 €) con todo el conocimiento del
proceso: análisis de zonas, cómo leer un contrato de arras, cómo hacer due
diligence, calendario fiscal, plantillas legales, comunidad para preguntar.

Más info acá: [LINK_CURSO]

Y dos recursos gratuitos que pueden ayudarte ahora:
- [LINK_CONTENIDO_1]
- [LINK_CONTENIDO_2]

Si en el futuro tu operación crece de tamaño, escribime de nuevo.

Andrés
```

### Si "rechazar_amable"

```
Asunto: {{first_name}}, no encajamos para este caso

Hola {{first_name}},

Gracias por la aplicación. Por honestidad: nuestro servicio está pensado para
inversores latinoamericanos que están preparando su primera operación en
España, con acompañamiento de varios meses desde briefing hasta llaves.

Tu caso ({{razon_principal}}) no encaja con eso, por lo que sería injusto
tomarte tiempo en una llamada que no va a llevar a ningún acuerdo.

Si lo que necesitas es una segunda opinión sobre una operación concreta, te
recomiendo contactar a [recurso externo si lo hay] o consultarlo con un
abogado mercantil colegiado, que puede revisar la documentación con criterio
legal sólido.

Suerte con el proyecto.

Andrés
```

---

## Notas de implementación

- **Costes:** asumiendo 30 aplicaciones/mes × $0.01 promedio = $0.30/mes. Despreciable.
- **Validación inicial:** correr los 4 casos de prueba contra Claude antes de activar. Si los outputs difieren significativamente del esperado, ajustar el prompt antes de producción.
- **Override manual:** Andrés puede vetar el routing de Claude en cualquier caso. La IA califica, el humano decide.
- **Auditoría:** registrar en Supabase tanto el input como el output de Claude para cada lead. Después de 100 leads, revisar los 5-10 que cerraron contra los 5-10 que rechazó la IA. Ajustar prompt si hay errores sistemáticos.
- **Privacidad:** los datos del lead pasan por Claude API. Anthropic no usa data API para entrenar, pero igual conviene incluir línea en el privacy policy del landing.
