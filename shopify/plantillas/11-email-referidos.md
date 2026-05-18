# Sistema de referidos

> Mecánica completa, emails de recordatorio, kit de presentación que el cliente referidor manda al referido, y plantilla del tracking interno.

---

## Mecánica

**Promesa:** 500 € por cada referido que firma contrato con nosotros.

**Sin tope.** Si un cliente refiere 10 personas y todas firman, son 5 000 €.

**Cuándo se paga:**
- Cuando el referido firma contrato Y abona el primer plazo de honorarios.
- Pago al referidor por transferencia SEPA o equivalente local en LATAM dentro de los 7 días posteriores.
- Alternativamente: descuento de 500 € sobre próximo retainer del referidor (preferido por el referidor sobre todo si vive en país con cepo cambiario).

**Tracking:** cada cliente activo tiene código único de referido (formato `REF-XXXX`). Se incluye en sus emails post-cierre. Cuando llega una aplicación con código de referido, se atribuye automáticamente.

**Sin caducidad:** si un cliente cerrado hace 3 años refiere a alguien, se paga igual.

---

## Email 1 — Activación del programa (incluido en email de cierre, día de escritura)

Ya está en `10-emails-cierre-y-retainer.md`. Resumen:

> "Si conocés a alguien en tu situación, podés referirlo. Por cada referido que firma contrato, te devolvemos 500 €. Sin tope, sin caducidad. Tu código de referido: `REF-{{codigo}}`."

---

## Email 2 — Recordatorio mes 3 post-cierre

**Subject:** {{cliente_nombre}}, una pregunta rápida

**Preheader:** Nada de venta.

**Cuerpo:**

Hola {{cliente_nombre}},

Pasaron 3 meses desde que tenés las llaves. ¿Cómo va todo? ¿Algo del piso que esté funcionando bien o algo que se complicó?

Si tenés 2 minutos, contame por respuesta a este email. Me ayuda saber cómo siguen las cosas después de que cerramos.

Y una pregunta directa: en los últimos meses, ¿se te cruzó alguna conversación con alguien que estaba pensando en comprar algo en España? Si te ocurre, sabés que el programa de referidos sigue activo. Tu código: `REF-{{codigo}}`.

Andrés

---

## Email 3 — Recordatorio mes 6 post-cierre

**Subject:** Sin venderte nada, 30 segundos

**Cuerpo:**

Hola {{cliente_nombre}},

Llegando al medio año desde la escritura. Mando este email exactamente una vez cada 6 meses, no más.

Si en estos meses te cruzaste con alguien que mencionó España, mudanza, segunda casa, inversión inmobiliaria internacional, lo que sea, acordate del programa de referidos.

500 € por cada uno que termine firmando con nosotros. Tu código: `REF-{{codigo}}`.

Y si no te pasó nada de eso, ningún problema. Volvemos a hablar en 6 meses.

Si querés que dejemos de mandarte este email, respondé "ya basta" y desactivo el recordatorio para vos.

Andrés

---

## Emails 4+ — Recordatorios cada 6 meses

Mismo formato que email 3, ligeramente variado. Después de **3 recordatorios sin un solo referido**, pasar a frecuencia anual.

Después de **5 años sin referidos**, mover a newsletter general (un email mensual de mercado, sin pedido directo de referidos).

---

## Kit del referidor (lo que el cliente puede mandar a la persona que va a referir)

Cuando el cliente nos avisa que va a referir a alguien, le mandamos un **"kit del referidor"** para que pase a la persona. Hace la introducción cien veces más natural y aumenta conversión del referido en 3-4x vs presentación fría.

### El kit (Notion page o PDF de 2 páginas)

**Título:** "Para tu amigo que está pensando en España"

**Contenido:**

```
Hola.

[Tu nombre] te pasó esto porque sabe que estás pensando en algo relacionado
con inmuebles o residencia en España. Compartió con nosotros porque trabajó
con nosotros durante [3-4] meses y el resultado fue positivo.

Quiénes somos en 30 segundos:
- Andrés (Colombia) y Cami (España)
- Hacemos acompañamiento operativo end-to-end para inversores LATAM que
  compran piso en España
- Cobramos honorarios fijos (no comisión), 4 500-6 500 €
- 5 clientes por trimestre, no más

Si tu situación se parece a esto:
- Patrimonio líquido 200 000 € o más
- Querés cerrar una compra en los próximos 3-12 meses
- Te frenan cosas operativas (no conocer el mercado, no tener red local,
  fiscalidad LATAM-España, distancia)

Entonces probablemente tiene sentido que hablemos.

Lo primero es completar un cuestionario de 5 minutos:
[LINK_CUESTIONARIO]?ref=REF-{{codigo}}

Si encajamos, agendamos una llamada de 45 minutos. Sin venta, sin presión.

Si querés mirar antes:
- Web: [LINK_WEB]
- Guía gratuita "8 errores que cometen los latinoamericanos al comprar
  piso en España": [LINK_PDF]

Lo único que pedimos: si terminás firmando, [tu nombre] recibe 500 € de
agradecimiento de nuestra parte. No te cuesta nada a vos, ya está incluido
en nuestro presupuesto de adquisición.

Andrés y Cami
```

**El cliente referidor lo puede:**
- Reenviar por email
- Compartir como mensaje WhatsApp (versión texto plano más corta)
- Imprimir y dar en mano si lo cruza en persona

### Versión WhatsApp corta (que el cliente referidor pueda copiar/pegar)

```
Te paso esto que mencionamos:

Andrés y Cami son los que me ayudaron con la compra del piso en {{ciudad}}.
Acompañamiento completo, honorarios fijos, súper profesional.

Si te interesa, completá este formulario para que sepan que vas de mi parte:
[LINK_CUESTIONARIO]?ref=REF-{{codigo}}

Es de 5 min. Si encajan, hablan.
```

---

## Tracking interno de referidos

### Notion database "Referidos"

| Propiedad | Tipo |
|---|---|
| ID referido | Title |
| Cliente referidor | Relation a database de Clientes |
| Código usado | Text (REF-XXXX) |
| Fecha de aplicación | Date |
| Status | Select (Aplicó / Llamada / Propuesta / Firmó / No avanzó) |
| Cliente nuevo (si firma) | Relation a Clientes |
| Comisión 500 € | Status (Pendiente / Pagada / N/A) |
| Fecha de pago de comisión | Date |
| Método de pago | Select (SEPA / Transferencia LATAM / Descuento retainer) |

### Atribución técnica

El cuestionario Tally pasa el parámetro `?ref=REF-XXXX` como hidden field. El webhook a n8n captura ese campo y lo agrega al registro del lead.

Si el lead aplica sin código pero menciona en pregunta 9 ("¿qué te frena?") el nombre de un cliente nuestro, Andrés lo asigna manualmente.

---

## Métricas

- **% clientes activos que generan al menos 1 referido:** objetivo 20-30% en 12 meses post-cierre.
- **Tiempo medio del primer referido:** ~4-8 meses post-cierre (los primeros vienen rápido si el servicio fue impecable).
- **% referidos que aplican vs % referidos que firman:** los referidos firman al 50-70% (vs 1-3% del tráfico frío). Es el canal de mejor conversión de lejos.
- **CAC por referido:** 500 € + tiempo Andrés en llamada (~30€ equivalente) = ~530 €. Vs CAC pagado: 800-1 500 €.

**Conclusión:** el referido es 30-50% más barato que el tráfico pagado, y firma al doble o triple de conversión. Optimizar este canal es la palanca más alta del modelo a partir del cliente 10.

---

## Estrategia complementaria — referidos B2B

A partir de cliente 15-20, considerar referidos cruzados con:

- **Asesores patrimoniales LATAM** (private banking, family offices, asesores independientes). Acuerdo: 5% de honorarios por cliente referido. Para nuestro ticket de 5 000 €, son 250 €. Menos que un cliente directo pero con cero CAC inicial.
- **Abogados de migración LATAM** que tienen clientes saliendo de su país. Acuerdo similar.
- **Asesores fiscales LATAM-España.** Probable acuerdo bilateral: ellos nos refieren, nosotros les referimos.

Estos acuerdos no son automatizables: son relaciones humanas. Construirlos en años 2-3, no en año 1.

---

## Caja chica del programa

Reservar mensualmente **15-20% de los honorarios cobrados** en una cuenta destinada a pagos de referidos. Así no aparece como gasto sorpresa cuando llega el momento de pagar.

Ejemplo: si en el mes facturás 15 000 € de honorarios, dejá 2 250-3 000 € en cuenta destinada a referidos. Cuando un referidor cobra, el dinero ya está separado.
