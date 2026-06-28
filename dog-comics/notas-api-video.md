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

---
*Fuentes: fal.ai/models/fal-ai/minimax/hailuo-02/..., fal.ai/docs/model-apis/client, fal.ai/pricing,
fal.ai/models/fal-ai/veo3.1/... Verificado jun-2026.*
