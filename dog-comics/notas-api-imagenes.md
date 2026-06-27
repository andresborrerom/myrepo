# 📝 Imágenes con Gemini "Nano Banana" — datos verificados (jun-2026)

Investigado en vivo antes de construir el robot, para no reprocesar. Fuentes oficiales
(ai.google.dev) al final. Esto sustenta `robot-imagenes.mjs`.

## Modelos
| Apodo | ID de API | Rol | Costo/img |
|---|---|---|---|
| Nano Banana | `gemini-2.5-flash-image` | el barato, ~1024px | **$0.039** |
| Nano Banana Pro | `gemini-3-pro-image` | mejor calidad/texto, hasta 4K | ~$0.13 (4K $0.24) |
| Nano Banana 2 | `gemini-3.1-flash-image` | más rápido, más formatos | ~$0.045–0.151 |

Empezamos con **`gemini-2.5-flash-image`** (barato y suficiente). Si los bocadillos de
texto salen feos, subimos a `gemini-3-pro-image`.

## Cómo se llama (REST, sin librerías)
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent
Header:  x-goog-api-key: <GEMINI_API_KEY>
Body:    { "contents":[{"parts":[ ...texto e imágenes... ]}],
           "generationConfig": { "responseModalities":["TEXT","IMAGE"],
                                 "imageConfig": { "aspectRatio": "9:16" } } }
```
La imagen vuelve como base64 en `candidates[0].content.parts[].inlineData.data`.

## Consistencia de personajes (lo importante)
Se manda una **imagen de referencia** del perro como un `part` con `inlineData`
(mimeType + base64) en el MISMO pedido, junto al texto. El modelo mantiene al personaje
idéntico. `gemini-2.5-flash-image` admite ~3 imágenes de referencia; los 3.x admiten más.
→ Por eso el robot primero crea una "ficha" por perro (`refs-img/<Perro>.png`) y la
reutiliza en cada viñeta.

## Formatos y límites
- Aspect ratio: `1:1, 16:9, 9:16, 4:3, 3:4, 5:4, 4:5` → usamos **9:16** para Reels.
- Resolución: 2.5-flash ≈ 1024px fijo; el Pro hace 1K/2K/4K.
- **SynthID**: marca de agua invisible en TODAS las imágenes (inevitable, no se ve).
- Filtros de seguridad: pueden bloquear prompts (raro en perros de caricatura) → el robot
  registra el error y sigue.

## Facturación
La API de imágenes **NO tiene plan gratis** → hay que activar facturación (tarjeta) en el
proyecto de Google AI Studio / Cloud. El gasto corre en la cuenta de Andrés.

## SDK oficial (si algún día migramos de fetch)
`@google/genai` (clase `GoogleGenAI`). El viejo `@google/generative-ai` está **deprecado**.
Por ahora usamos `fetch` directo para no agregar dependencias.

---
*Fuentes: ai.google.dev/gemini-api/docs/image-generation, /docs/pricing, /docs/models/gemini-2.5-flash-image,
/docs/models/gemini-3-pro-image, firebase.google.com/docs/ai-logic/generate-images-gemini. Verificado jun-2026.*
