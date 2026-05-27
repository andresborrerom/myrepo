# PROMPT PARA CLAUDE — Construye el white-label de "La Casa de Papá"

> **Léeme primero.** Soy el archivo de entrada para una nueva sesión de Claude en un repo nuevo (forkeado del original `andresborrerom/myrepo`). Mi propósito: que conviertas un regalo personal de cumpleaños 75 en un producto SaaS que cualquiera pueda usar para regalar lo mismo a su ser querido.

---

## Tu tarea

Tomar la arquitectura del repo original (que está como referencia visual y técnica) y construir una versión **anonimizada, configurable y multi-tenant** que se pueda vender.

**Marca tentativa**: `casarte.app` (nombre tentativo, Andrés decide).

**Modelo**: SaaS multi-tenant. Cada comprador crea una "Casa" (instancia) personalizada para su homenajeado, invita a la familia a contribuir, y la app vive durante el período definido (ej. 75 días a partir del cumpleaños).

---

## Paso cero — Fork limpio

1. Estás en un repo nuevo (`casarte-template` o el nombre que Andrés escogió).
2. **NO heredes contenido personal.** Si encuentras nombres como "Alejandro", "Borrero", "Marce", "Camilo", "Lucía", etc., **elimínalos**. Si encuentras fotos en `public/images/`, **elimínalas** (excepto la ceiba si decides que sirve como ilustración genérica).
3. Mantén la **estructura técnica** del proyecto original (rutas, componentes, lib/, supabase/), pero vacía de contenido específico.
4. Lee `04-anonimizacion.md` para el checklist exacto de qué borrar y qué dejar.

---

## Lee en este orden

Todos los archivos en esta misma carpeta:

- **`01-vision.md`** — Manifesto, audiencia, features mínimas, modelo de negocio, riesgos. Es el "qué construir y por qué".
- **`02-arquitectura.md`** — Stack técnico decidido (Next.js + Supabase + Vercel + web-push + ElevenLabs opcional), decisiones de diseño multi-tenant, esquema de DB. Es el "cómo construir".
- **`03-bugs-aprendizajes.md`** — Bitácora de los bugs del proyecto original. **CRÍTICO** para no repetirlos. Léelo entero antes de tocar el modelo de datos.
- **`04-anonimizacion.md`** — Checklist explícito de qué borrar del fork. Sigue el orden indicado.
- **`05-roadmap.md`** — Plan día a día del primer mes, fases siguientes, criterios de salida del MVP.

---

## Diferencias críticas vs el proyecto original

El proyecto original era un **regalo único, hardcoded**. Este es un **producto configurable**. Esto significa:

| Aspecto | Original | White-label |
|---|---|---|
| Datos del homenajeado | Hardcoded en `family.ts`, `contexto.md` | Configurable vía wizard al crear instancia |
| Paleta | Hardcoded en `tailwind.config.ts` | 3-5 presets + opción custom |
| Tipografía | Hardcoded | Por preset, opcional override |
| Cartas | Sembradas en `cartas.ts` por Andrés | Subidas por el comprador + invitados |
| Tarjetas de cumpleaños | Sembradas en `cumpleanos.ts` | Subidas por contribuyentes via UI |
| Push subject | `mailto:andres.borrerom@gmail.com` | Configurable, default = email del comprador |
| Dominio | `casa-de-papa.vercel.app` | `<gift-id>.casarte.app` o subdomain wildcard |
| Auth | Una contraseña familia, una admin | Por gift instance: una contraseña destinatario, una familia, una admin |
| Idioma | Solo español | i18n: es, en, pt mínimo |

---

## Entregable del primer hito (1 mes)

Un MVP que cumpla:

1. **Setup wizard funcional** (`/crear-casa`): pide nombre, foto, fecha, paleta, idioma, mensaje para la familia, duración del ritual. Genera una instancia y devuelve link compartible.
2. **Vista del destinatario** funcional con: vestíbulo personalizado, ritual diario de cartas al azar, sección de tarjetas, árbol familiar opcional, buzón, push notification.
3. **Vista del contribuyente** funcional con: form para subir tarjeta/carta/aporte, "mis aportes" para editar.
4. **Una "Casa demo"** poblada con datos ficticios (familia ejemplo), para mostrar a compradores potenciales.
5. **Landing comercial** con: pitch, demo embed, pricing, FAQ, CTA "crear casa".

---

## Lo que NO debe hacerse en el primer hito

- Pagos integrados (Stripe). Empieza con "casas gratis" para feedback. Pagos en hito 2.
- Internacionalización completa. Empieza solo español, deja la infra lista para añadir idiomas.
- Email digest. El push del original es suficiente para empezar.
- Sistema de moderación con IA. Que la moderación sea manual al principio.
- Marketplace de paletas/temas. Solo presets fijos al inicio.

---

## Acuerdos con Andrés (estilo de trabajo)

Heredados del proyecto original (ver `curso-claude-y-la-casa/02-momentos-clave.md` y `03-lecciones-tecnicas.md` si tienes acceso, o pídelos a Andrés):

- **PRs pequeños y atómicos.** Un asunto por PR.
- **Mensajes de commit descriptivos** que cuentan qué + por qué.
- **Bitácora de errores.** Cualquier bug que cause reproceso → documentar en `bugs-aprendizajes.md` (este mismo proyecto). La próxima vez se señala con un link al .md.
- **Iteración corta.** Lanza, mira, corrige. No pretendas perfección al primer intento.
- **Pregunta cuando hay ambigüedad.** "Random entre los años con carta" puede significar dos cosas. Pregunta antes de asumir.
- **Documentar mecánicas en `contexto-app.md`** (o equivalente). El código no es spec — el .md es spec.

---

## Cuando estés listo

Pregúntale a Andrés:

1. ¿Confirmaste el nombre del producto / marca?
2. ¿Hay diseñador o trabajamos solos? (referencia visual de paletas)
3. ¿Hosting: Vercel o algo más barato a escala?
4. ¿Stripe vs Polar vs Lemon Squeezy para los pagos del MVP 2?
5. ¿Cuáles son los 3-5 casos de uso que quieres priorizar en el landing? (75 años, 50 cumple, aniversarios, jubilación, in memoriam, etc.)

Después de eso, arranca con `04-anonimizacion.md` antes de tocar ninguna línea nueva.

---

¿Listo? Empieza leyendo `01-vision.md`.
