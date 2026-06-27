# 🐶 Barkademy — Robot de cómics de perros para Instagram

Cuenta: **@the_barkademy** · Concepto: una **guardería/colegio canino** (doggy daycare)
donde 7 perros de distintas razas son los "alumnos", con historias cortas y graciosas
del día a día. Los cómics se generan con IA (imágenes + video + voces) a partir de un
guion simple, de forma automatizable.

> Proyecto familiar para aprender IA paso a paso. Construido en este repo bajo `dog-comics/`
> (se migrará a un repo propio `the-barkademy` más adelante).

---

## 📍 ESTADO ACTUAL (para retomar en cualquier sesión)

**Hecho:**
- ✅ Investigación de viabilidad verificada → ver `RECONFIRMACION.md`
- ✅ Casting de los 7 personajes → `characters.json`
- ✅ Primer guion "The Doorbell" → `guiones/the-doorbell.json`
- ✅ Robot de voces (ElevenLabs) → `robot-voces.mjs`
- ✅ Cuenta Instagram **@the_barkademy** creada
- ✅ Plan de ElevenLabs: **Creator** (cubre uso comercial)

**Hecho también (sesión voces):**
- ✅ Las **7 voces existen** y están aprobadas (`voice_id` en `characters.json`).
  Bruno se clonó desde muestra (`refs/Bruno.m4a`); el resto son diseñadas por texto.
- ✅ Rex habla con voz diseñada + **aullido propio como SFX** (`sfx/rex-howl.m4a`).
- ✅ Audios de "The Doorbell" generados en `output/the-doorbell/voces/`.
- Nota del environment: el secreto de ElevenLabs se llama **`ELEVENLABS_LABS_KEY`**
  (los robots también aceptan ese nombre, no solo `ELEVEN_API_KEY`).

**Lo que SIGUE (próximo paso exacto): ESLABÓN IMÁGENES (Gemini "Nano Banana")**
1. Andrés crea cuenta en **Google AI Studio** y genera una **`GEMINI_API_KEY`**
   (se pone como secreto del environment; nunca en el chat ni en el código).
2. Robot de imágenes: por cada panel del guion, genera la imagen manteniendo a cada
   perro idéntico con su `visual` de `characters.json` + imagen de referencia.

**Después (siguientes pasos del robot):**
- Robot de prompts de imagen/video · Conectar Gemini (imágenes) · Conectar Hailuo/Kling
  (video) · Montaje con FFmpeg · Publicar en Instagram.
  (Roadmap completo en `RECONFIRMACION.md`.)

---

## 👥 El elenco (resumen)

| Personaje | Raza | Su chiste |
|-----------|------|-----------|
| Kaiser | Pastor Alemán | El líder, da órdenes |
| Africa | Schnauzer Gigante negro (♀) | La protectora, fuerte sin medir su fuerza |
| Rex | Husky | Dramático, cree que es un lobo |
| Bruno | Golden Retriever | Feliz y sin sentido común |
| Pixel | Border Collie | El cerebro que trama planes |
| Tank | Chihuahua | Mini con ego gigante |
| SirWheeze | Bulldog Inglés | Perezoso, solo quiere el sofá |

---

## ▶️ Cómo correr los robots de voz

**La key** sale del entorno: en el environment de Claude Code ya viene como secreto
`ELEVENLABS_LABS_KEY`. En tu propio computador, ponla en `dog-comics/.env`
(copia `dog-comics/.env.example`, está gitignored). Los robots aceptan
`ELEVEN_API_KEY`, `ELEVENLABS_API_KEY` o `ELEVENLABS_LABS_KEY`.

**1) Diseñar las voces (una sola vez):**
```
node dog-comics/robot-disenar-voces.mjs
```
Inventa la voz de cada perro desde su `voice_prompt`, deja 3 propuestas en
`output/_voces-diseno/<Perro>/` para comparar, y guarda el `voice_id` en `characters.json`.

**2) Generar los diálogos de un guion:**
```
node dog-comics/robot-voces.mjs the-doorbell
```
Los `.mp3` salen en `dog-comics/output/the-doorbell/voces/`.

Ambos robots son idempotentes: no recrean voces ni audios que ya existen (no gastan
créditos de gusto). ¿No te gustó una voz? Borra su `voice_id` en `characters.json` y
vuelve a correr el diseñador.
