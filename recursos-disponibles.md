# Recursos disponibles — inventario vivo

> **Léeme antes de proponer alternativas técnicas.** Andrés ya tiene contratadas/configuradas las cuentas y servicios listados abajo. Si necesitas una capacidad que está en esta lista, **úsala** — no investigues "cuál es el mejor X" ni propongas migrar a otro proveedor.
>
> Si necesitas algo NUEVO que no esté aquí, **pregunta** antes de asumir / contratar / sugerir.
>
> Este archivo es la fuente de verdad sobre infraestructura. Si lo cambias, actualiza la fecha y firma abajo.

---

## Por qué este archivo existe

En sesiones pasadas, Claude propuso evaluar/comparar herramientas (TTS, hosting, DB) cuando **ya teníamos la cuenta lista**. Esto cuesta tiempo y a veces dinero (suscripciones duplicadas, créditos no usados).

**Regla**: antes de proponer un servicio externo, consultar este `.md`. Si el servicio que necesitas YA está aquí, úsalo sin discusión. Si no está, pregunta a Andrés antes de elegir.

---

## Cuentas y APIs activas

| Categoría | Proveedor | Estado | Notas |
|---|---|---|---|
| **Voice cloning + TTS multilingüe** | **ElevenLabs** | ✅ Cuenta activa, API key disponible | Usar para: voz de Valentina (inglés → español), futuros mensajes cross-lingüe. Modelo recomendado: Multilingual v2. Soporta voice cloning con muestras 30-90s. |
| **Speech-to-text** | OpenAI Whisper API | ❓ Confirmar con Andrés | Necesario para el paso de transcripción del feature de voz cruzada. Alternativa local: `whisper.cpp` self-hosted. |
| **LLM (traducción, asistente)** | Claude API (Anthropic) | ✅ Disponible | Usar para traducción ES↔EN, sugerencias de texto, generación de variaciones. |
| **Hosting + edge runtime + cron** | Vercel | ✅ Proyecto desplegado | Cron jobs ya configurados. Wildcard domain pendiente para el white-label. |
| **DB + Storage + RLS** | Supabase | ✅ Proyecto activo | Free tier hasta hoy. Buckets para fotos/audio. |
| **Email transaccional** | ❓ No contratado aún | — | Cuando se necesite (invites, digests): preferir Resend por DX. Confirmar antes. |
| **Pagos** | ❓ No contratado aún | — | Para Fase 2 del white-label. Opciones: Stripe / Polar / Lemon Squeezy. Confirmar antes de implementar. |
| **Push Web (VAPID)** | Self-hosted con `web-push` npm | ✅ Funcionando | Llaves VAPID en env vars de Vercel. |
| **Domain** | ❓ Pendiente confirmar | — | El producto white-label tentativamente en `casarte.app`. |
| **Background removal de fotos** | `rembg` + `onnxruntime` (Python local) | ✅ Funciona offline | Usado para recortar fotos de personas. No requiere cuenta. |

---

## Antes de proponer un servicio externo

Pregúntate **en este orden**:

1. **¿Está en la tabla de arriba como ✅?** → Úsalo. No evalúes alternativas.
2. **¿Está como ❓?** → Pregunta a Andrés antes de elegir / contratar.
3. **¿No está en absoluto?** → Pregunta a Andrés si vale la pena la dependencia nueva. Si lo confirma, agregar a esta tabla.

**Mal patrón** (que ya hemos evitado): "voy a investigar las mejores opciones de voice cloning y te presento un comparativo". Si ya tenemos ElevenLabs, ese tiempo es perdido.

**Buen patrón**: "Para clonar la voz de Valentina, usaré ElevenLabs (Multilingual v2) ya que está en `recursos-disponibles.md`. Te confirmo el endpoint y los pasos antes de pegar el API key."

---

## Uso esperado por proyecto

### App de papá (este repo)

- **Inmediato**: ElevenLabs para Valentina, Claude API para traducción.
- **Ya en uso**: Supabase, Vercel, Web Push.

### White-label (`producto-white-label/` → repo nuevo)

- **Heredar todos los recursos** de la columna ✅ cuando se cree el proyecto nuevo.
- Ver `producto-white-label/02-arquitectura.md` para cómo se integran.

---

## Política de costos

- Si una integración genera costo recurrente (>$10/mes), confirmar con Andrés antes de habilitar.
- Si una integración genera costo por uso (ElevenLabs, Whisper, Claude API), **estimar costo de un mes promedio** antes de implementar y mostrar el número.
- Para el white-label: marcar features cuyo costo escala por gift (voz, almacenamiento) como tier pagado, no tier gratis.

---

## Cambios en este archivo

Actualizar cuando:
- Se contrata un servicio nuevo (cambio ❓ → ✅).
- Se cancela un servicio (eliminar fila o marcar ❌).
- Cambian las API keys (no escribir las keys aquí; solo notar que rotaron).

Última actualización: 2026-05-27 — Claude (sesión de Andrés)
