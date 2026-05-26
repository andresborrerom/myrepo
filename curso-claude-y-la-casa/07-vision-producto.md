# Producto: "Casa para ti" — regalos digitales personalizables

> Generalización del proyecto "La Casa de Papá" para que cualquiera pueda regalarle a un ser querido una PWA personal.
>
> Documento de visión + arquitectura. Para usar como pitch interno o base de construcción cuando se decida arrancar.

---

## 1. Manifesto

**El problema**: regalar algo significativo a un papá, mamá, abuelo, abuela, pareja o amigo cercano en un cumpleaños grande (50, 60, 75, 80, 90 años), aniversario o jubilación es difícil. Las opciones existentes son:
- Una fiesta — efímera
- Un libro impreso — costoso y rígido
- Un video compilado — pasivo de ver
- Un álbum digital — sin alma

**La oportunidad**: una PWA personal hecha para esa persona, con cartas reveladas día a día, tarjetas multimedia de cada miembro de la familia, árbol familiar, notificaciones push. Personalizable en colores, tipografía, motivos, ritmo. Toda la familia contribuye remotamente.

**El insight**: las personas tienen historias y la tecnología para contarlas existe, pero el puente entre las dos es la programación. Si removemos esa barrera (con Claude bajo el capó), millones de regalos quedan al alcance.

**El precio emocional**: una experiencia que dura 75 días (o 90, o el rango que escojas) y queda como reliquia digital. No se pierde como una fiesta.

---

## 2. Para quién

**Audiencia primaria**:
- 35-55 años, profesional/técnico, con padres/abuelos vivos
- Cumple-grande próximo (12 meses)
- Familia distribuida geográficamente
- Comodidad mínima con apps móviles (no necesita ser developer)

**Audiencia secundaria**:
- Parejas que celebran aniversario importante (10, 25, 50)
- Empresas que homenajean a un fundador retirándose
- Profesores de colegio creando regalos para alumnos graduados

**Anti-audiencia** (descartar de momento):
- Memoriales/in memoriam (similar pero requiere otra delicadeza)
- Eventos públicos / influencers (no privado)

---

## 3. Features mínimas (MVP)

Heredadas del proyecto original. Lo NO-negociable:

### 3.1 Setup wizard del comprador (1 sesión, ~30 min)
- Nombre completo del homenajeado + fecha de cumpleaños
- Foto principal
- Selección de paleta (3-5 presets: Hacienda, Editorial, Mediterráneo, Bosque, Costa)
- Idioma (es, en, pt)
- Mensaje del comprador para invitar familia
- Duración de cartas (30 / 60 / 90 / "todos los años de la vida")

### 3.2 Hub central del comprador
- Link compartible con la familia ("invita a tus hermanos")
- Editor de cartas (propias)
- Editor de tarjetas (propias)
- Vista de "lo que ha subido la familia"
- Botón "publicar al destinatario" (el día del cumpleaños empieza la cadencia)

### 3.3 Vista del destinatario
- Vestíbulo con hero personalizado + monograma generado a partir de iniciales
- Ritual diario "abre tu carta de hoy" (al azar entre las que existen y no abriste)
- Sección de tarjetas multimedia (cover + canción + body)
- Árbol familiar (foto opcional, fallback ilustración)
- Buzón con feed cronológico de aportes de la familia
- Push notification diaria
- Calendar de cumpleaños de toda la familia

### 3.4 Vista del contribuyente (familia)
- Link de invitación con código personal
- Subir tarjeta: foto + texto + opcional canción YouTube + opcional audio/video
- Subir carta: texto largo, opcional asociar a año
- Subir aporte al buzón: foto/audio/video/texto

### 3.5 Admin (oculto, para soporte)
- Moderación de aportes
- Estado de suscripciones push
- Métricas de uso

---

## 4. Arquitectura sugerida

Probada en el proyecto original. **Stack**:

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | Next.js 14 App Router | Server components + Edge runtime; gran ecosistema |
| Hosting | Vercel | Deploy push, cron, edge functions, dominios fáciles |
| DB | Supabase Postgres | Tablas, RLS, free tier generoso, sql migrations limpias |
| Storage media | Supabase Storage | Para fotos/audio/video subidos por la familia |
| Auth | Cookie simple por gift instance (1 contraseña familia + 1 destinatario) | Suficiente para el uso. No requiere OAuth. |
| Push | Web Push + VAPID | Funciona en iOS 16.4+ instalado como PWA |
| Email | Resend / SendGrid | Para invitaciones y digests opcionales |
| LLM (asistente) | Claude API | Para sugerir títulos, corregir texto, generar variaciones de paleta |

### Modelo SaaS multi-tenant

Una opción: cada regalo es una INSTANCIA independiente:
- **Dominio**: `casa-para-papa.casarte.app` (subdomain wildcard en Vercel)
- **DB**: schema separado por tenant en Supabase, o una sola tabla con `gift_id`
- **Storage**: prefix en bucket por gift_id
- **Auth**: cookies aisladas por dominio

Otra opción: cada regalo es un repo SEPARADO en Vercel (más caro, más aislado, pero más simple de personalizar profundamente).

**Recomendación**: empezar con SaaS multi-tenant. Si una familia quiere personalización extrema (más allá de los presets), ofrecer servicio "white glove" donde se forkea a un repo dedicado.

---

## 5. Modelo de negocio

**Tier gratuito** ("Casa Pequeña"):
- Hasta 30 cartas
- Hasta 8 contribuyentes
- 5 paletas preset
- 90 días de hospedaje a partir del cumpleaños
- Marca pequeña "Hecho con casarte.app" en el footer

**Tier pagado** ("Casa Grande") — **$49 USD por regalo**:
- Cartas ilimitadas
- Contribuyentes ilimitados
- Customización avanzada (paleta libre, fonts, motivos)
- 5 años de hospedaje
- Sin marca de tercero
- Backup descargable (HTML estático + ZIP de assets)

**Tier white-glove** ("Casa Hecha a Mano") — **$499 USD por regalo**:
- Todo lo anterior
- Setup asistido (1 hora con un humano)
- Diseño custom de monograma/identidad
- Cartas iniciales redactadas con asistencia de IA + revisión humana
- Soporte directo durante el período de regalo
- Garantía: si el destinatario no usa la app en 30 días, devolución completa

**Tier organizacional** — pricing custom:
- Empresas que homenajean fundadores, profesores, etc.

### Proyección base
- 100 ventas/mes Casa Grande = $4,900/mes = $58,800/año
- 10 ventas/mes white-glove = $4,990/mes = $59,880/año
- Total año 1 conservador: **~$100k USD** con poca operación

Costos: Vercel + Supabase + dominio ~$200/mes, Resend ~$50/mes, marketing/SEO/contenido ~$2k/mes. Margen alto.

---

## 6. Diferenciadores frente a competidores

| Competidor | Qué hace | Qué le falta |
|---|---|---|
| Tribute.co | Video compilation de mensajes | Solo video, no ritual diario, no personalizable |
| MemoryLane | Photo book impreso | Físico, sin updates en vivo, costoso por copia |
| Storyworth | Email semanal con preguntas para guardar memorias | Para que el destinatario escriba SU historia, no para que reciba el regalo. Modelo distinto. |
| **Nuestro producto** | PWA personal con ritual diario + multimedia + familia distribuida | — |

Nuestro pitch único: **"Un calendario de adviento de tu historia, hecho por quienes te aman"**.

---

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| iOS Push solo en home screen | Tutorial paso a paso de instalación + email fallback diario |
| Personalización pesa mucho en setup | Wizard MUY guiado + presets buenos + opción "déjame Claude diseñar por ti" |
| La familia no contribuye | Recordatorios automáticos a contribuyentes + ejemplos de tarjetas + plantillas |
| El destinatario no entiende cómo usarla | Setup pre-cumpleaños con un familiar; primer push tipo "tutorial" |
| Privacidad / GDPR | Datos del destinatario y familia bajo el control del comprador. Borrado completo a petición. Auditable. |
| Vendor lock-in (Vercel/Supabase) | Plan B documentado: Cloudflare Pages + Neon. Migración estimada en 1 semana. |

---

## 8. Plan de lanzamiento (alto nivel)

### Fase 0 — Privado, 1 mes
- Build del MVP completo (heredando este repo, anonimizando)
- Beta cerrada con 5 amigos. Que cada uno haga UN regalo real.
- Iteración basada en feedback

### Fase 1 — Lanzamiento suave, 2 meses
- Dominio + landing
- 50 ventas objetivo Casa Grande
- 5 ventas objetivo white-glove
- Contenido: 1 video del proceso, 3 testimonios beta

### Fase 2 — Escalar, 6+ meses
- SEO + contenido (blog sobre "cómo regalar algo significativo")
- Partnerships con servicios de eventos (planners de bodas/cumpleaños grandes)
- Affiliate (los compradores satisfechos refieren)
- I18N: inglés primero, después portugués

### Fase 3 — Plataforma, 12+ meses
- Marketplace de plantillas de paleta/motivo (creadores ganan revenue share)
- Templates para casos específicos (50 cumple, bodas plata, retiro, in memoriam)
- API para terceros (eventos planners construyen sobre nuestra infra)

---

## 9. ¿Qué se hace primero?

Si Andrés decide arrancar en otra sesión, mi recomendación de los primeros 7 días:

1. **Día 1**: forkear el repo actual a uno nuevo `casarte-template`. Crear branch `clean-no-personal-data`.
2. **Día 2**: borrar todo `cartas.ts`, `family.ts`, `cumpleanos.ts` específico. Reemplazar por placeholders genéricos. Conservar la **estructura** del dato, no el contenido.
3. **Día 3**: extraer la paleta v3 a un objeto `theme` configurable. Crear 3-5 presets.
4. **Día 4**: diseñar el wizard del comprador (mockup en markdown primero, luego React).
5. **Día 5**: armar `paletas/` y `motivos/` como folders con assets reutilizables.
6. **Día 6**: prototipo de tenant aislado — un gift en `localhost/test-gift-1`.
7. **Día 7**: review con un amigo. Decidir si seguir hacia lanzamiento.

---

## 10. Notas para Claude en la próxima sesión

Cuando esta visión se materialice:

- **Lee** el repo original como referencia, pero **NO heredes texto/datos**. La estructura técnica sí; el contenido nunca.
- **Lee** los archivos `.md` del curso (`curso-claude-y-la-casa/`) para entender qué patrones funcionaron y cuáles no.
- **Anonimiza** todo lo personal. Ni el nombre "Alejandro" ni "Borrero" ni los nombres de los hijos deben aparecer en el repo nuevo.
- **Mantén** la decisión de "no fight la complejidad" — si una feature es difícil de explicar al comprador, simplificarla o cortarla del MVP.
- **No reinvientes** lo que ya funcionó: el modelo de cartas al azar, el de tarjetas multimedia, el del árbol familiar son todos válidos. Lo que cambia es que ahora son CONFIGURABLES.

---

## Cierre

Este producto puede existir. La arquitectura está probada (este mismo repo es prueba viviente). El público existe (millones de personas tienen padres mayores cumpliendo cumpleaños grandes). El precio funciona (gente paga $499 por una fiesta de 4 horas; pagaría lo mismo por un regalo que dura 75 días).

El único bloqueo es la voluntad de construirlo. Si esa aparece, este `.md` es el plano.
