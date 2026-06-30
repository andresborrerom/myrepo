# 📝 Video (animar imágenes) con fal.ai — datos verificados (jun-2026)

Investigado en vivo antes de construir `robot-video.mjs`. Fuentes: fal.ai docs.

## Modelos (image-to-video) en fal.ai
| Modelo | Endpoint ID | Precio |
|---|---|---|
| **Hailuo-02 Standard 768p** (usamos este) | `fal-ai/minimax/hailuo-02/standard/image-to-video` | **$0.045/s** (~$0.27 / 6s) |
| Hailuo 2.3 Standard (más nuevo) | `fal-ai/minimax/hailuo-2.3/standard/image-to-video` | ~$0.28 / 6s |
| Kling v2.5 Turbo Pro | `fal-ai/kling-video/v2.5-turbo/pro/image-to-video` | $0.07/s |
| Veo 3.1 Fast (con voz + lip-sync) | `fal-ai/veo3.1/fast/image-to-video` | ~$0.15/s (audio on) |

Empezamos con **Hailuo-02 Standard** (el más barato y probado). Upgrade a Veo solo si
queremos que el perro hable con labios sincronizados.

## Cómo se llama (REST, sin librerías — cola asíncrona)
```
POST https://queue.fal.run/fal-ai/minimax/hailuo-02/standard/image-to-video
Header:  Authorization: Key <FAL_KEY>
Body:    { "prompt": "...", "image_url": "<URL o data:base64>", "duration": "6",
           "resolution": "768P", "prompt_optimizer": true }
→ responde { request_id, status_url, response_url }
```
- La imagen de entrada acepta **URL pública, data URI base64, o subir con fal.storage**.
  Nosotros mandamos **base64** (sin hosting). Límites: PNG/JPG/WebP, <20MB, lado corto >300px,
  aspect ratio entre 2:5 y 5:2 (9:16 entra bien).
- **9:16:** el video hereda el formato de la imagen (no hay parámetro aparte). Nuestras
  viñetas ya son 9:16 → el clip sale vertical.
- Se hace **poll** a `status_url` hasta `COMPLETED`; luego `response_url` da `{ video: { url } }`
  (un mp4 que descargamos). Tarda **~4 min por clip**.

## Cuenta / facturación
fal.ai es prepago (compras créditos). Da **~$20 gratis** al registrarte (alcanza para
probar). Sin plan gratis permanente → hay que activar facturación. Solo cobran clips
exitosos (no la espera ni errores).

## Gotchas
- Movimientos **suaves y una sola acción** por clip de ~5-6s (mucho movimiento = el perro
  "deriva"). Hailuo 2.3 es el mejor en mantener el personaje.
- Filtros de contenido pueden rechazar (raro en perros de caricatura) → el robot registra
  el error y sigue.

## Lip-sync ("que el perro hable con la boca sincronizada") — VERIFICADO

Pregunta clave del proyecto. Conclusión tras investigación en vivo:

- **Lip-sync encima de un clip, conservando NUESTRA voz (ElevenLabs):** ❌ NO sirve en
  perros. Los modelos (sync.so, Wav2Lip, LatentSync, MuseTalk, Hummingbird) dependen de
  detectar una **cara/boca humana**. sync.so dice textual: *"don't support animals or
  non-humanoid characters."* Un hocico de perro es justo el caso que falla.
- **Veo 3.1 (Google):** ✅ SÍ hace hablar al perro con boca sincronizada, en 9:16.
  PERO **genera su propia voz** desde el texto del prompt — **no acepta cargar nuestro
  mp3**. (`generate_audio` es solo on/off, no "usa este audio"). O sea: lip-sync real
  *a cambio de* perder la voz de ElevenLabs en ese clip.
  - Endpoint fal: `fal-ai/veo3.1/fast/image-to-video` (y `.../veo3.1/image-to-video`).
  - Input: `prompt` (diálogo entre comillas, formato `Dog (Name): "línea"`), `image_url`,
    `aspect_ratio: "9:16"`, `duration: "4s"|"6s"|"8s"`, `resolution: "720p"|"1080p"|"4k"`,
    `generate_audio: true`. Output igual que Hailuo (`response_url` → `video.url`).
  - Precio (audio on): **fast $0.15/s** (6s ≈ $0.90), standard $0.40/s (6s ≈ $2.40).
  - Gemini API alterno: modelos `veo-3.1-fast-generate-preview` / `veo-3.1-generate-preview`.

**Decisión de producto (pendiente del operador):**
1. Cómic barato: Hailuo + voces ElevenLabs + bocadillos, sin lip-sync (~$0.27/clip).
2. Película: Veo, lip-sync real, voz de Veo (~$0.90/clip fast), sin ElevenLabs.
3. Híbrido: Veo solo en primeros planos donde el perro habla; Hailuo en el resto.

---
*Fuentes: fal.ai/models/fal-ai/minimax/hailuo-02/..., fal.ai/models/fal-ai/veo3.1/...,
sync.so/docs/models, ai.google.dev/gemini-api/docs/video, fal.ai/pricing. Verificado jun-2026.*

## ⚠️ Veo y MENORES (hallazgo jun-2026)
Veo 3.1 (vía fal) **se niega a animar CUALQUIER toma con un personaje HUMANO** (niño O
adulto), no solo menores — devuelve `no_media_generated`. Probado: tomas solo-perros pasan;
tomas con Pepe niño Y con Pepe adulto fueron rechazadas (prevención de personas/likeness de
Google). → Para historias con un humano (Pepe), **Veo NO es viable**; solo sirve para tomas
SOLO-perros. Para cualquier toma con humano: motion-comic (A) o Hailuo (B).
