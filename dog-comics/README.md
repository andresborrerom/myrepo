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

**Lo que SIGUE (próximo paso exacto):**
1. Tener `ELEVEN_API_KEY` disponible (como secreto del environment, cargado al iniciar sesión).
2. **Crear las 7 voces de los perros** con la API de Voice Design de ElevenLabs y guardar
   cada `voice_id` en `characters.json` (hoy están en `REEMPLAZAR_CON_VOICE_ID`).
3. Correr el robot de voces para generar los audios de "The Doorbell":
   ```
   node dog-comics/robot-voces.mjs the-doorbell
   ```
4. Escuchar los audios en `dog-comics/output/the-doorbell/voces/` y ajustar.

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

## ▶️ Cómo correr el robot de voces

1. Pon tu key de ElevenLabs (una de estas dos):
   - como variable de entorno `ELEVEN_API_KEY`, o
   - en un archivo `dog-comics/.env` (copia `dog-comics/.env.example`). Está gitignored.
2. Asegúrate de que cada perro en `characters.json` tenga su `voice_id` real.
3. Corre: `node dog-comics/robot-voces.mjs the-doorbell`
4. Los `.mp3` salen en `dog-comics/output/the-doorbell/voces/`.

El robot es idempotente: no regenera audios que ya existen (no gasta créditos de gusto).
