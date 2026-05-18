# Cuestionario de aplicación (Tally)

> Formulario que se envía después del email día 11 de nurture, o directamente desde el CTA del PDF lead magnet. Copy listo para pegar en Tally. 10 preguntas, 5 min de duración estimada.

---

## Configuración general del formulario

- **Plataforma:** Tally.so (gratuito, mejor UX que Google Forms a este volumen)
- **URL pública:** algo como `tally.so/r/[código]` o `apply.[dominio.com]`
- **Branding:** logo arriba, color primario del brand, font sobria
- **Lógica condicional:** sí (Tally lo soporta nativo)
- **Submit destination:** webhook a n8n + email a Andrés + registro Supabase

---

## Pantalla 1 — Bienvenida

**Título grande:**
Hablemos.

**Subtítulo:**
Este formulario tarda unos 5 minutos. Lo lee Andrés (no un bot). Si tu situación encaja con lo que hacemos, te respondemos en 48 horas con una llamada agendada. Si no encaja, te lo decimos claro y te sugerimos el camino que sí.

**Botón:** Empezar →

---

## Pantalla 2 — Datos básicos

**Pregunta 1**

Tu nombre completo.

`[campo de texto corto, requerido]`

---

**Pregunta 2**

¿Dónde resides actualmente?

`[campo desplegable, requerido]`

Opciones:
- México
- Colombia
- Argentina
- Chile
- Perú
- Venezuela
- Uruguay
- Panamá
- Estados Unidos (con conexión LATAM)
- España (ya residente)
- Otro país (especificar)

---

**Pregunta 3**

Tu rango de edad.

`[botones de selección única, requerido]`

- 25-34
- 35-44
- 45-54
- 55-64
- 65+

---

## Pantalla 3 — Patrimonio y operación

**Pregunta 4**

¿Qué patrimonio líquido tienes disponible para esta inversión específicamente?

(Líquido = efectivo, depósitos, fondos, instrumentos rápidamente convertibles. No incluyas inmuebles ya existentes ni patrimonio que no destinarías a esto.)

`[botones de selección única, requerido]`

- Menos de 200 000 €
- 200 000 - 500 000 €
- 500 000 - 1 000 000 €
- 1 000 000 - 3 000 000 €
- Más de 3 000 000 €
- Prefiero comentarlo en llamada

---

**Pregunta 5**

¿En qué horizonte quieres tener la operación cerrada?

`[botones de selección única, requerido]`

- Próximos 3 meses (urgencia alta)
- 3-6 meses
- 6-12 meses
- Más de 12 meses
- Estoy explorando, sin fecha definida

---

**Pregunta 6**

¿Cuál es el uso principal que le darías al inmueble?

`[botones de selección única, requerido]`

- Uso propio (vivir o segunda residencia familiar)
- Alquiler de larga duración (rentabilidad)
- Alquiler vacacional / corto plazo
- Mixto (uso ocasional + alquiler)
- Plan B residencial (no vivir aún, pero tener la opción)
- Diversificación pura, sin uso personal
- Todavía no lo tengo claro

---

## Pantalla 4 — Geografía

**Pregunta 7**

¿En qué zonas de España te llama comprar?

`[selección múltiple, requerido al menos una]`

- Madrid (capital)
- Barcelona
- Marbella / Costa del Sol
- Valencia
- Málaga (capital)
- Sevilla
- Islas Baleares (Mallorca, Ibiza)
- Islas Canarias
- Norte de España (Bilbao, San Sebastián)
- Sin preferencia clara, abierto a recomendación

---

## Pantalla 5 — Contexto cualitativo (lo importante)

**Pregunta 8**

¿Has comprado antes un inmueble fuera de tu país?

`[botones de selección única, requerido]`

- Sí, una vez
- Sí, varias veces
- No, sería mi primera operación internacional

---

**Pregunta 9**

¿Qué te frena para hacer esto solo?

(Respondé con honestidad. Esta pregunta es la más importante del formulario. No hay respuesta correcta, sólo respuesta verdadera.)

`[campo de texto largo, requerido, mínimo 50 caracteres]`

**Sugerencia debajo del campo (texto pequeño):**
Ejemplos de frenos comunes: "no sé en qué zona comprar", "no tengo contactos locales", "me da miedo el papeleo legal", "el riesgo cambiario me confunde", "no sé si mi situación fiscal lo permite", "tengo tiempo limitado y no puedo viajar", etc. Cuanto más concreto, mejor te podemos ayudar.

---

## Pantalla 6 — Contacto y cierre

**Pregunta 10**

¿Cómo te contactamos?

`[campos múltiples requeridos]`

- Email (campo email, requerido)
- WhatsApp con código de país (campo teléfono, requerido)
- Mejor franja horaria (campo desplegable: Mañana LATAM / Tarde LATAM / Sin preferencia)

---

## Pantalla 7 — Agradecimiento (post-submit)

**Título:**
Gracias, {{first_name}}.

**Cuerpo:**
Recibimos tu aplicación. En las próximas 48 horas vas a recibir una de estas dos respuestas:

1. **Si encajamos:** un email con link directo para agendar una llamada de 45 minutos con Andrés. Sin compromiso, sin venta. Es para entender bien tu caso y ver si podemos hacer un buen trabajo juntos.

2. **Si no encajamos en este momento:** un email honesto explicando por qué, y una recomendación específica de qué sí te puede servir (curso digital autoguiado, recursos gratuitos, otros profesionales del sector que respetamos).

Sea cual sea la respuesta, va a llegar.

**Botón:** Cerrar

---

## Lógica condicional (Tally)

**Regla 1:** Si en pregunta 4 selecciona "Menos de 200 000 €" → al final del formulario, mostrar mensaje adicional:
> "Por transparencia: nuestro servicio actual está diseñado para inversiones de 200 000 € en adelante porque los costes de transacción y operativos lo hacen poco rentable por debajo. Si querés un acompañamiento autoguiado, tenemos un curso digital de 497 € que puede servirte muy bien. Te mandamos la info junto con la respuesta."

**Regla 2:** Si en pregunta 5 selecciona "Estoy explorando, sin fecha definida" → al final, mostrar nota:
> "Vamos a entrar en contacto, pero por honestidad: nuestro acompañamiento funciona mejor con clientes que tienen una decisión más cerrada. Si todavía estás en fase exploratoria, quizás te sirve más nuestro curso digital o algunos contenidos gratuitos. Te mandamos opciones."

**Regla 3:** Si pregunta 9 (frenos) tiene menos de 50 caracteres → no avanza. Mensaje: "Ampliame un poco más. Esto nos ayuda a saber si te podemos ayudar en serio."

---

## Webhook y siguientes pasos automatizados

**Al recibir submission (n8n flow):**

1. Guardar registro completo en Supabase tabla `applications`.
2. Llamar a Claude API con el prompt de cualificación (ver `04-prompt-cualificacion.md`).
3. Recibir score 1-10 + tier A/B/C + razón.
4. Routing automático según tier:
   - **A (8-10):** email a Andrés con resumen + link Cal.com pre-cargado para enviar al lead.
   - **B (6-7):** email a Andrés con flag "indagar antes" + sugerencias de preguntas.
   - **C (≤5):** email automático al lead con redirección al curso (no involucra a Andrés en primera instancia).
5. Notificación a Telegram personal de Andrés con resumen 1-línea.

---

## Métricas a vigilar

- **Tasa de completado** del formulario (lo abren vs lo terminan). Objetivo: >70%.
- **Punto de abandono** más común. Si es la pregunta 4 (patrimonio), está OK. Si es la 9 (frenos), reescribir el copy.
- **Tier A/B/C distribución.** Si <30% sale tier A, hay un problema de fit en el tráfico anterior.
- **Tiempo medio de completado.** Si <2 min, se está respondiendo a la ligera. Si >10 min, el formulario es demasiado largo.
