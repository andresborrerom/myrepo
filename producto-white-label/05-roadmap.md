# Roadmap

> Plan día-a-día del primer mes del white-label, fases siguientes, y criterios para salir del MVP.
>
> Asume: 1 persona (Andrés) + Claude, 1-2 horas al día, ritmo del proyecto original. Si dispones de más tiempo, comprime los días.

---

## Semana 0 — Setup (días 1-2)

### Día 1 — Repo limpio
- [ ] Crear repo `casarte-template` (o el nombre final) en GitHub.
- [ ] Fork del repo original `andresborrerom/myrepo` → push a `casarte-template`.
- [ ] Crear rama `chore/anonimizar-fork`.
- [ ] Crear proyecto Supabase nuevo. Anotar `URL`, `anon key`, `service role`.
- [ ] Generar VAPID keys nuevas (`npx web-push generate-vapid-keys`). Guardar en password manager.
- [ ] Configurar `.env.local.example` con todos los placeholders sin valores.

**Salida del día**: repo nuevo en GitHub, Supabase nuevo creado, `.env.local` funcional en local.

### Día 2 — Anonimización
- [ ] Seguir `04-anonimizacion.md` paso por paso. Borrar contenido personal de:
  - `src/data/cartas.ts`, `family.ts`, `cumpleanos.ts`, `casas.ts`, `timeline.ts`, `audios.ts`, `updates.ts`.
  - `public/images/people/*`, `public/images/cumpleanos/*`, `papa-caballo.png`.
  - `contexto.md`, `producto-regalo-generalizado.md`, `errores-que-generaron-reproceso.md` (mover a `docs/`), `curso-claude-y-la-casa/`.
- [ ] Reemplazar VAPID y Supabase env vars en local.
- [ ] `npm run dev` debe levantar sin crashear, mostrando home con placeholders.
- [ ] Commit: `chore: anonimizar fork`.

**Salida del día**: app levanta en `localhost:3000` con datos ficticios. Cero referencias personales en código.

---

## Semana 1 — Multi-tenant foundation (días 3-7)

### Día 3 — Schema multi-tenant
- [ ] Crear migración Supabase `001_multi_tenant.sql` con tablas:
  - `gifts` (id, slug, owner_email, recipient_name, birthday, palette_preset, language, started_at, ends_at, status, created_at)
  - `gift_state` (gift_id, revealed_years jsonb, last_reveal_date)
  - `family_members` (gift_id, name, email, role, invite_code, created_at)
  - Añadir `gift_id uuid not null` a las tablas existentes (`aportes`, `push_subscriptions`).
- [ ] Crear RLS policies básicas: filtrar todas las queries por `gift_id`.
- [ ] Refactor `src/lib/supabase.ts` para recibir `giftId` en cada helper.

**Salida del día**: schema en Supabase listo. Una query con `gift_id` retorna solo data de ese gift.

### Día 4 — Routing por gift
- [ ] Decidir entre path-based (`/g/[giftId]/...`) o subdomain (`<giftId>.casarte.app`). **Recomendación para arrancar**: path-based. Subdomain se añade en Fase 2.
- [ ] Crear estructura `src/app/g/[giftId]/...` con todas las rutas actuales reorganizadas dentro.
- [ ] Crear middleware (`src/middleware.ts`) que extrae `giftId` y lo inyecta en el contexto del request.
- [ ] Crear `src/lib/gift-context.tsx` (React context) que provee config del gift a todos los client components.

**Salida del día**: `localhost:3000/g/demo-1/` levanta la home con config del gift "demo-1".

### Día 5 — Setup wizard `/crear-casa`
- [ ] Crear ruta `src/app/crear-casa/page.tsx` con form multi-paso:
  - Paso 1: nombre del homenajeado + fecha de cumple + foto principal
  - Paso 2: paleta (seleccionar de 5 presets) + idioma
  - Paso 3: mensaje del comprador para invitar familia + duración del ritual
  - Paso 4: confirmar + crear instancia → genera `gift_id`, devuelve link compartible
- [ ] API endpoint `POST /api/gifts` que crea registros en `gifts`, `gift_state`, y siembra `aportes` de demo.
- [ ] Genera invite codes para 3-5 contribuyentes iniciales y los devuelve al comprador.

**Salida del día**: puedes crear una "Casa" entrando en `/crear-casa`, llenando el form, y obtener un link `/g/<id>/`.

### Día 6 — Presets de paleta
- [ ] Crear `src/lib/palettes.ts` con 5 presets como TS:
  - `hacienda` (la del proyecto original)
  - `editorial` (Apartamento puro, neutros + acento rojo)
  - `mediterraneo` (azul + cal + ocre)
  - `bosque` (verdes + marrones + crema)
  - `costa` (turquesa + arena + coral)
- [ ] Convertir `tailwind.config.ts` a usar CSS variables (`--color-primary`, `--color-paper`, etc.).
- [ ] Aplicar la paleta del `gift.palette_preset` vía `<style>` en el layout server-side.
- [ ] Verificar que cada preset se ve coherente en home, cartas, tarjetas, árbol.

**Salida del día**: el mismo gift se ve distinto si lo recreas con paleta `bosque` vs `hacienda`.

### Día 7 — Demo populada
- [ ] Crear seed script `scripts/seed-demo-gift.ts` que crea un gift demo "Casa Maritza 60" con:
  - 12 cartas ficticias (años 1965-2024 con texto Lorem-biográfico)
  - 6 tarjetas con covers/songs/avatares ficticios
  - Árbol de 8 personas con avatares placeholder
  - Aportes en el buzón
- [ ] Levantar el demo en `/g/demo-maritza-60/`. Verificar que TODO funciona: ritual, push, árbol, buzón.
- [ ] Documentar el demo en `docs/demo.md`.

**Salida de la semana**: puedes crear casas vía wizard, cada una con su paleta, y hay un demo navegable para mostrar.

---

## Semana 2 — Vista del contribuyente + invitaciones (días 8-14)

### Día 8 — Auth simple por gift
- [ ] Sistema de 3 roles por gift: `recipient` (1 password), `family` (1 password compartido), `admin` (1 password del comprador).
- [ ] Passwords generadas en el wizard, guardadas hasheadas en `gifts.passwords`.
- [ ] Cookie `gift_role_<giftId>` con role tras login en `/g/[id]/entrar`.

### Día 9 — Magic link de invitación
- [ ] Endpoint `POST /api/gifts/[id]/invite` que envía email con Resend.
- [ ] Email contiene link `/g/[id]/aporta?code=<invite_code>` que pre-llena el autor.
- [ ] Vista `/g/[id]/comunidad` para que el comprador vea quién contribuyó.

### Día 10-11 — Editor de cartas para contribuyentes
- [ ] Vista `/g/[id]/aporta?type=carta`:
  - Selector de año (opcional)
  - Editor markdown simple
  - Preview en vivo con la paleta del gift
- [ ] Vista `/g/[id]/mis-aportes` para que cada contribuyente vea/edite lo suyo.

### Día 12-13 — Editor de tarjetas
- [ ] Vista `/g/[id]/aporta?type=tarjeta`:
  - Upload de foto cover
  - Texto del body
  - Opcional: YouTube URL para la canción
  - Opcional: upload de audio/video
- [ ] Reusar el componente `TarjetaAbrible` del original adaptado a multi-tenant.

### Día 14 — Buzón unificado
- [ ] Vista `/g/[id]/buzon` cronológica de todos los aportes.
- [ ] Filtros por tipo (carta / tarjeta / aporte libre).
- [ ] Soft-delete por el admin del gift.

**Salida de la semana**: una familia puede recibir un invite, subir cartas + tarjetas + aportes, y verlos en el buzón del destinatario.

---

## Semana 3 — Ritual + push + landing (días 15-21)

### Día 15 — Ritual diario multi-tenant
- [ ] Refactor de `cartas-fetch.ts` para recibir `giftId`.
- [ ] Vista `/g/[id]/abrir-carta` que aplica el modelo random correcto (pool = no-placeholder, no-revealed).
- [ ] Vista `/g/[id]/cartas` con el grid de sobres.
- [ ] **Crítico**: leer y aplicar TODAS las lecciones de `03-bugs-aprendizajes.md` antes de tocar este flujo.

### Día 16 — Push notifications per-gift
- [ ] Tabla `push_subscriptions` ya tiene `gift_id`.
- [ ] Cron `/api/cron/recordatorio` itera sobre `gifts` activos y manda push a sus subscribers.
- [ ] Mensaje del push leído desde `gift.push_message` (configurable en wizard).
- [ ] Hora del push configurable per-gift (default 8:00 AM en zona horaria del gift).

### Día 17 — Vestíbulo configurable
- [ ] `/g/[id]/` (vestíbulo) usa:
  - Foto de portada del gift (subida en wizard)
  - Monograma generado de iniciales + edad
  - CTA "abrir mi carta de hoy" → `/g/[id]/abrir-carta`
  - Recorrido con motivos del preset
- [ ] PushOptIn component adaptado a multi-tenant.

### Día 18 — Árbol familiar
- [ ] Vista `/g/[id]/arbol/[familyMemberId]`:
  - Si el comprador subió foto de un árbol real → fondo con esa foto + nodos posicionados.
  - Si no → ilustración SVG de árbol genérico + nodos.
- [ ] Drag-and-drop reorder de aportes (heredar de la implementación original).

### Día 19-20 — Landing comercial `casarte.app`
- [ ] Crear ruta `src/app/(marketing)/page.tsx` separada del flow del gift.
- [ ] Secciones:
  - Hero: "Regala una historia que dura 75 días"
  - Demo embed (link a `/g/demo-maritza-60/` en iframe o screenshots)
  - Cómo funciona (3 pasos: crea, invita, regala)
  - Pricing (mostrar Casa Pequeña / Casa Grande / White Glove, aunque pagos no estén activos)
  - FAQ
  - CTA "Crear casa" → `/crear-casa`
- [ ] Footer con email de contacto.

### Día 21 — QA del MVP
- [ ] Crear 3 gifts de prueba con datos distintos. Verificar que no se cruzan datos.
- [ ] Probar todo en mobile iOS instalado como PWA: push, ritual, navegación.
- [ ] Verificar performance (Lighthouse > 85 en mobile).
- [ ] Fix bugs encontrados.

**Salida de la semana**: MVP funcional. Cualquier persona puede entrar a `casarte.app`, crear una casa, invitar familia, y entregarla al destinatario.

---

## Semana 4 — Beta cerrada (días 22-30)

### Día 22-23 — Onboarding flow
- [ ] Email de bienvenida al comprador con video corto de "cómo funciona".
- [ ] Email a contribuyentes con tutorial de cómo subir su primera tarjeta.
- [ ] Email al destinatario el día del cumple con instrucciones para instalar PWA en iPhone/Android.

### Día 24 — Sistema de feedback
- [ ] Componente flotante "Cuéntanos cómo va" en el dashboard del comprador.
- [ ] Envía a un endpoint que lo guarda en `feedback` y notifica via email.

### Día 25-27 — Beta privada
- [ ] Reclutar 5 amigos con familiares con cumpleaños próximos (próximos 3 meses).
- [ ] Onboarding 1-a-1 con cada uno (1 hora c/u).
- [ ] Documentar todo lo que rompe o confunde.

### Día 28-30 — Iterar sobre feedback
- [ ] Priorizar bugs y mejoras según severidad.
- [ ] Fix de los 5-10 problemas más críticos.
- [ ] Documentar aprendizajes en `docs/beta-aprendizajes.md`.

**Salida de la semana / del mes**: MVP probado por 5 familias reales. Lista de mejoras para Fase 2.

---

## Fase 2 — Pagos y i18n (mes 2-3)

- [ ] Integrar Stripe/Polar/Lemon (decidir según fees + facilidad).
- [ ] Tres tiers funcionales: Gratis, Casa Grande ($49), White Glove ($499).
- [ ] Flujo de pago en el wizard (paso 5: "elige tu plan").
- [ ] Webhooks para activar/desactivar features por plan.
- [ ] i18n con `next-intl`: español + inglés (portugués después).
- [ ] Traducir landing + wizard + emails.
- [ ] Backup descargable: endpoint que genera ZIP (HTML estático + assets) para los planes pagados.

---

## Fase 3 — Voz cross-lingüe (mes 3-4)

> Esta es la feature de "Valentina" del proyecto original, adaptada como producto.

- [ ] Integración con ElevenLabs API:
  - Endpoint `POST /api/gifts/[id]/voice-clone/[memberId]/sample`: contribuyente sube 30-90s de audio en su idioma. Crea voice clone en ElevenLabs.
  - Endpoint `POST /api/gifts/[id]/voice-clone/[memberId]/message`: contribuyente graba mensaje en su idioma fuente. Backend:
    1. Whisper transcribe.
    2. Claude traduce a `gift.language`.
    3. ElevenLabs sintetiza con la voz clonada del contribuyente.
    4. Resultado: audio en idioma del destinatario, con voz original.
- [ ] UX:
  - Toggle en wizard: "¿algún familiar habla otro idioma?"
  - En aporta de ese familiar: opción "grabar en mi idioma".
  - En reproductor para destinatario: tabs "audio en español" / "audio original".
- [ ] Considerar Privacy + costos (ElevenLabs cobra por chars sintetizados).

---

## Fase 4 — Plataforma (mes 5-12)

- [ ] Marketplace de paletas custom (creadores ganan revenue share).
- [ ] Templates específicos: "75 cumple", "50 aniversario", "jubilación", "graduación".
- [ ] Partners con planners de eventos.
- [ ] Programa de afiliados.
- [ ] API pública para que terceros construyan encima.

---

## Criterios para salir del MVP (cuándo declarar Fase 1 cerrada)

Antes de lanzar comercialmente:

- [ ] 5+ beta-testers reales terminaron un regalo completo.
- [ ] Cero pérdida de data en los últimos 14 días de uso real.
- [ ] Push funciona en iOS PWA instalado + Android nativo.
- [ ] Lighthouse mobile > 85 en home, cartas, tarjetas.
- [ ] Tiempo de creación de una casa < 30 min para un comprador no-técnico.
- [ ] CSAT > 8/10 entre beta-testers.
- [ ] Privacy policy + términos publicados.
- [ ] Borrado de cuenta funciona end-to-end (GDPR).
- [ ] El comprador puede descargar su casa como backup ZIP.

---

## Métricas para Fase 2

Trackear desde el inicio:

| Métrica | Objetivo Fase 1 | Objetivo Fase 2 |
|---|---|---|
| Casas creadas / mes | 5 (beta) | 100 |
| Conversión wizard → publicada | — | > 60% |
| Conversión free → paid | — | > 15% |
| Contribuyentes promedio por casa | — | > 5 |
| Cartas promedio por casa | — | > 12 |
| Retención del destinatario (días con app abierta / duración del ritual) | — | > 70% |
| CSAT | > 8 | > 9 |
| NPS | — | > 50 |

---

## Anti-features para el primer año

Cosas que NO debes hacer en los primeros 12 meses (para no perder foco):

- ❌ App nativa (iOS / Android). PWA es suficiente.
- ❌ Chat / mensajería entre familia dentro del app.
- ❌ Versión "memorial" (in memoriam) — requiere otra delicadeza, otra UX.
- ❌ Marketplace open (cualquier persona vende plantillas). Solo curado.
- ❌ Multi-idioma del MISMO gift (un solo idioma por casa).
- ❌ Versión print/PDF del gift. Es digital first.

---

## Cierre

Si llegas al día 30 con el MVP cerrado y 5 betas felices, **tienes un producto**. El resto es escala, marketing y refinamiento.

Si te trabas, vuelve a leer `03-bugs-aprendizajes.md`. La mayoría de los problemas técnicos del proyecto original tienen su lección documentada.

**Buena suerte. Que la primera casa que vendas no sea para ti — sino para alguien que no tiene idea de que esto era posible.**
