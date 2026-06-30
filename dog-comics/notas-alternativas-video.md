# 📝 Alternativas a Veo para animar HUMANOS + animales (verificado jun-2026)

**Contexto:** Veo bloquea image-to-video cuando la imagen tiene un humano (niño O adulto).
Es el modelo MÁS restrictivo. Hay muchas alternativas más permisivas y baratas (varias chinas).
Todas en fal.ai salvo nota. Precios por clip ~5-6s.

## Las que SÍ animan humanos+animales (image-to-video), con audio/lip-sync nativo
| Modelo | fal endpoint | Audio/lip-sync | Precio ~5-6s | Notas |
|---|---|---|---|---|
| **PixVerse V6** ✅ PROBADO | `fal-ai/pixverse/v6/image-to-video` | sí (`generate_audio_switch`) | ~$0.20 (720p) – $0.57 (1080p) | Animó a Pepe niño. Permisivo. 9:16. |
| **Wan 2.5** | `fal-ai/wan-2.5/...` | sí (nativo, 1 pase) | ~$0.25–0.30 ($0.05/s) | Más barato con audio. Open-weights. |
| **Vidu Q3** | `fal-ai/vidu/q3/image-to-video` | sí (nativo) | ~$0.33 (turbo) – 0.92 | Permisivo. 9:16. |
| **Kling 2.6/3.0** | `fal-ai/kling-video/v2.6/pro/image-to-video` | audio nativo / Avatar v2 | ~$0.35–0.56 | Avatar v2 hace lip-sync de cartoons y animales. |
| **Sora 2** | `fal-ai/sora-2/image-to-video` | sí (top lip-sync) | ~$0.50–0.60 | PERO bloquea humanos peor que Veo. Evitar. API cierra sep-2026. |

## Las baratas SIN lip-sync (movimiento) → emparejar con un lip-sync aparte
- **Hailuo 02** `fal-ai/minimax/hailuo-02/standard/image-to-video` — $0.27/6s, fuerte en humanos.
- **Luma Ray2 Flash** — $0.20/5s, pero silencioso.

## Lip-sync que ACEPTA NUESTRA voz (ElevenLabs) y soporta ANIMALES — el "santo grial"
Permitiría conservar nuestras voces Y tener boca sincronizada (2 pasos):
- **LatentSync** `fal-ai/latentsync` — soporta anime y **animales**; **$0.20** hasta 40s. (toma VIDEO+audio)
- **Kling AI Avatar v2** `fal-ai/kling-video/ai-avatar/v2/pro` — imagen+audio; soporta cartoons y **animales**; $0.115/s.
- **OmniHuman 1.5** `fal-ai/bytedance/omnihuman/v1.5` — anuncia **gatos/perros**; imagen+audio; $0.16/s.
- **HeyGen Avatar IV** `fal-ai/heygen/avatar4/image-to-video` — cartoons+animales; imagen+audio; $0.10/s; 9:16.
  - ⚠️ Calidad de lip-sync en hocico de perro: "soportado pero no su fuerte" → probar.

## Conclusión
- Veo NO es necesario. **PixVerse V6 / Wan 2.5 / Vidu Q3** animan a Pepe + perros, con audio,
  más barato que Veo, y conservan a Pepe niño.
- Si queremos **conservar las voces de ElevenLabs** + lip-sync: animar barato (Hailuo/PixVerse)
  y pasar un lip-sync con **LatentSync/OmniHuman/Avatar v2** usando nuestro audio (probar en perro).

*Fuentes: fal.ai model pages, foros ai.google.dev (bloqueos Veo), docs de cada modelo. Jun-2026.*
