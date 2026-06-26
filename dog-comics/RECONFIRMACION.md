# 🐶 Robot de Cómics de Perros — Reconfirmación de Viabilidad

> Documento verificado con investigación en vivo (junio 2026) antes de invertir tiempo.
> Objetivo: cero "ah, esto no se podía" más adelante. Proyecto familiar para aprender IA.

---

## 🎯 Las dos rutas

| | 💸 **RUTA ECONÓMICA** (recomendada para empezar) | 💎 **RUTA AUTOMATIZADA / PREMIUM** |
|---|---|---|
| **Imágenes** | Gemini "Nano Banana" (~$0.02–0.045/img) | Gemini Nano Banana **Pro** (~$0.13/img) o Flux LoRA |
| **Video** | Hailuo / Kling (silencioso) + voz aparte | **Veo 3.1** (¡habla solo con lip-sync!) |
| **Voz** | ElevenLabs (lo añadimos nosotros) | Incluida en Veo (o ElevenLabs igual) |
| **Montaje** | FFmpeg (gratis) | FFmpeg (gratis) |
| **Publicar** | Semi-auto (robot crea .mp4, tú subes) o auto | Auto (Instagram API) |
| **Costo por cómic (~5 escenas)** | **~$1.50–3** | **~$8–18** |
| **Esfuerzo de enseñanza** | Más eslabones = más que aprender ✅ | Menos pasos, menos didáctico |

**Recomendación:** empezar por la ECONÓMICA. Es más barata, enseña cada eslabón (lo que queremos con los niños), y subir a Veo después es trivial porque el resto de la tubería no cambia.

---

## ✅ Eslabón 1 — IMÁGENES (consistencia de personajes)

**VERIFICADO. Totalmente viable.**

- **Gemini "Nano Banana" (Gemini 2.5/3.1 Flash Image):** mejor consistencia del mercado, ~**$0.02–0.045/imagen**, una sola API key, mantiene a "Africa" idéntica pasándole una imagen de referencia **sin entrenar nada**.
- **Nano Banana Pro** (~$0.13/img) para tomas "hero" donde la calidad importa más.
- **Flux + LoRA** (en fal.ai): para consistencia pixel-perfect del pelaje, entrenando un modelito de cada perro con 25–50 fotos. Opción avanzada para más adelante.
- ❌ **Midjourney descartado:** no tiene API usable para un robot.
- ⚠️ Nota: las imágenes de Google llevan una marca de agua invisible (SynthID). No se ve, no molesta.

## ✅ Eslabón 2 — VIDEO (animar las imágenes)

**VERIFICADO. Viable en ambas rutas.**

- **Económica — Hailuo (MiniMax):** ~**$0.045/seg** → clip de 5s ≈ **$0.22**. El más barato y real. Image-to-video. Sin voz (la añadimos con ElevenLabs).
- **Mejor consistencia — Kling 2.5 / Runway Gen-4:** ~$0.05–0.07/seg. Runway tiene "References" para mantener el personaje entre clips.
- **Premium — Google Veo 3.1:** ~**$0.40/seg**. Único con **diálogo hablado real + lip-sync** (el perro habla de verdad).
- 🚨 **Pared evitada:** la API de **Sora 2 (OpenAI) cierra en septiembre 2026.** NO construimos sobre Sora.
- ⚠️ Honestidad: la animación realista acierta ~70–80% de las veces. Por eso la v1 es semi-automática (tú apruebas antes de publicar).

## ✅ Eslabón 3 — VOCES (ElevenLabs)

**VERIFICADO. Totalmente viable por API.**

- **Inventar la voz de cada perro:** API de "Voice Design" (texto → voz). Se hace una vez y se guarda el `voice_id`.
- **Generar diálogos:** API text-to-speech, con control de `stability`/`style`/`speed` por personaje.
- **Emoción y multi-perro en una llamada:** API "Text-to-Dialogue" (modelo v3) con etiquetas como `[excited]`, `[growls]`.
- **Efectos de sonido** (ladridos, timbre): API de sound effects.
- 🚨 **REQUISITO LEGAL:** el plan **gratis NO da derechos comerciales.** Para una cuenta que busca monetizar hay que estar mínimo en **Starter ($6/mes)**. (Andrés ya paga — confirmar que el plan es Starter o superior.)
- ⚠️ Límite de concurrencia (3–5 llamadas a la vez en Starter/Creator): el robot encola y reintenta. Ya está contemplado.

## ✅ Eslabón 4 — PUBLICAR EN INSTAGRAM

**VERIFICADO. ¡Mejor noticia de lo esperado!**

- 🎉 **NO se necesita App Review ni verificación de empresa** para publicar en **TU PROPIA cuenta.** (El "muro" de Meta solo aplica si quieres publicar en cuentas de OTRAS personas.)
- **Lo que SÍ se necesita (plomería, se hace una vez):**
  1. Convertir la cuenta a **Profesional (Business)** — gratis, 30 segundos en la app.
  2. Crear una **app de desarrollador en Meta** y añadir tu propia cuenta como "tester".
  3. Usar el flujo nuevo "Instagram Login" (desde jul-2024 **ya no exige** página de Facebook).
- **Detalles técnicos que el robot maneja:**
  - El video debe estar en una **URL pública** (Meta lo descarga). El robot lo sube a un hosting primero.
  - Flujo de 3 pasos: crear contenedor → esperar a que esté "FINISHED" → publicar.
  - **Token caduca cada 60 días** → el robot necesita un recordatorio/cron para renovarlo.
  - Formato Reels: 9:16, 5–90s, H.264, ≤100MB.
  - Límite: **~50–100 publicaciones / 24h** según la cuenta (se consulta con `content_publishing_limit`). De sobra para nosotros.
- 💡 **Para 1 sola cuenta, mejor API directa** que servicios tipo Ayrshare (caros y pensados para multi-plataforma).
- **Fallback siempre disponible:** si la plomería de Meta se hace cuesta arriba, el robot deja el `.mp4` listo y tú lo subes a mano (2 clics). Para un proyecto con niños, esto es perfectamente válido.

---

## 🙋 Qué pongo YO (Claude) y qué pones TÚ

**Yo construyo y enseño:**
- Todo el código del robot en Node (leer guion → voces → imágenes → video → montaje → publicar).
- Los guiones, los personajes, los prompts, la documentación paso a paso para los niños.

**Tú aportas (esto yo no lo puedo hacer por ti):**
- **Crear las cuentas y poner los métodos de pago.** Cada servicio (Google AI/Gemini, fal.ai, ElevenLabs, app de Meta) lo abres tú. Yo no puedo registrarme ni pagar por ti.
- **Las API keys.** Tú las generas y las pegas en un archivo de config local (nunca quedan en el código ni las veo yo).
- **El costo real por clip.** La generación de video/imágenes gasta dinero en TUS cuentas (los ~$1.50–3 por cómic de la ruta económica).
- **La aprobación creativa.** Como la IA acierta ~70–80%, tú (y los niños) revisan y deciden "este sí / regenerar".
- **El setup inicial de Instagram** (convertir a Business, crear la app de Meta) — con mi guía paso a paso.

---

## 🗺️ Plan de pasos del robot

- [x] **Paso 1 — Casting** (`characters.json`) ✅
- [ ] **Paso 2 — El guion** (formato simple que tú llenas)
- [ ] **Paso 3 — Robot de voces** (ElevenLabs) ← primera victoria, usa lo que ya pagas
- [ ] **Paso 4 — Robot de prompts** (imagen/video automáticos)
- [ ] **Paso 5 — Conectar imágenes** (Gemini)
- [ ] **Paso 6 — Conectar video** (Hailuo/Kling)
- [ ] **Paso 7 — Montaje** (FFmpeg: junta clips + voz + subtítulos)
- [ ] **Paso 8 — Publicar** (manual primero, luego API de Instagram)

---

*Fuentes verificadas: Google AI / Gemini pricing, fal.ai, Black Forest Labs, ElevenLabs docs & pricing, Meta Instagram Platform docs (content publishing, app review, token refresh). Junio 2026.*
