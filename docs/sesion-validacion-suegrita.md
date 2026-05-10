# Guía: sesión de validación de 1 hora con la suegrita

> Objetivo: validar que el modelo de dominio y los flujos centrales corresponden a cómo realmente se administra una PH en Colombia. **Sin la mirada de la suegrita, vamos a codear cosas que nadie usa.**

## Reglas de la sesión

1. **No le mostramos código ni esquemas SQL.** Le mostramos lenguaje de negocio.
2. Tomamos notas de **todo lo que diga distinto de lo que ya escribimos** — eso son nuestros bugs.
3. Si algo no se entiende a la primera, el problema es nuestro, no de ella.
4. La sesión termina con **una lista priorizada de cambios** al `docs/domain-model.md`.

## Materiales para llevar

- Impreso o en pantalla grande: las secciones de `docs/domain-model.md`.
- Papel y lapiceros para que ella dibuje.
- Si tiene a la mano: una **carta de cobro real**, un **estado de cuenta**, un **acta de asamblea**, una **convocatoria** y un **paz y salvo** de los conjuntos donde trabajó. Esto es oro puro.

## Agenda (60 min)

### Bloque 1 — Mes típico de una administradora (15 min)

Pregunta abierta: **"Cuéntame cómo se ve un mes normal tuyo cuando administras un conjunto, día por día."**

Notas a capturar:
- ¿En qué día del mes se generan los recibos de administración?
- ¿En qué día se vencen?
- ¿Cuándo y cómo manda los recordatorios?
- ¿Qué pasa con quien no paga al día 5? ¿Al día 15? ¿Al mes?
- ¿Cómo aplica un pago que llega? ¿Manualmente revisa el extracto del banco?
- ¿Cuándo hace el cierre contable y qué le pasa a la contadora?

### Bloque 2 — Cartera y cobranza (15 min)

Mostrarle el listado de conceptos que escribimos y preguntar: **"¿Falta alguno? ¿Sobra alguno?"**

> `expensa_ordinaria, expensa_extraordinaria, parqueadero, salon_social, cuota_extraordinaria, multa, intereses_mora, papelería, otros`

Preguntas concretas:
- Cuando un residente paga **menos de lo que debe**, ¿a qué se aplica primero? ¿Mora? ¿Capital antiguo? ¿Lo más nuevo?
- ¿Tienes residentes con **acuerdos de pago**? ¿Cómo los lleva hoy?
- ¿Qué porcentaje del conjunto está en mora típicamente?
- ¿Cuándo se llama al abogado para cobro jurídico? ¿2 meses? ¿3? ¿6?
- ¿Qué pasa cuando un propietario vende el apartamento debiendo? ¿La PH se entera a tiempo?
- ¿Qué dato de un residente le **falta siempre** y le toca buscar a las malas?

### Bloque 3 — Comunicaciones (10 min)

- ¿Por dónde se comunica con los residentes hoy? Email, WhatsApp, físico, cartelera.
- ¿Tiene autorización **escrita** de cada residente para mandarle WhatsApp? (esto es Ley 1581 — alta probabilidad de que no).
- ¿Cuáles son las 5 plantillas que más usa? (cobro, recordatorio, citación, paz y salvo, ¿cuál más?).
- ¿Le ha pasado que alguien impugne una asamblea por mala convocatoria?

### Bloque 4 — Pesadillas (10 min)

Pregunta abierta: **"¿Qué es lo que **más odia** del trabajo? Lo que la pone de mal humor."**

Esta pregunta vale toda la sesión. Las respuestas típicas en este sector:
- Conciliar el banco con la cartera (cruzar consignaciones).
- Residentes que pagan y mandan foto del recibo por WhatsApp.
- Cerrar el mes a tiempo.
- Asamblea anual: firmar 200 actas.
- Cuotas extraordinarias mal explicadas que generan reclamos.
- Cuando el consejo cambia y el nuevo no entiende los EEFF.

Lo que más se repita: **es nuestra primera demo gancho.**

### Bloque 5 — Compromiso (10 min)

- ¿De los conjuntos que conoce, **cuáles 2 estarían dispuestos a probar gratis 3 meses**?
- ¿Qué administrador o consejal aceptaría una llamada de 20 min con nosotros para validar?
- ¿Cuánto paga hoy un conjunto de 60 unidades por su software actual? (referencia de precio).
- ¿Qué precio sería **caro** para ella vender? ¿Qué precio sería **regalado**?

## Después de la sesión

1. Subir las **notas crudas** a `docs/sessions/<fecha>-suegrita-validacion.md`.
2. Abrir un **issue por cada gap** detectado entre lo que ella dijo y lo que tenemos en `docs/domain-model.md`.
3. Marcar los issues como `must-mvp` los que sean bloqueantes para la cartera; el resto entra al backlog.
4. Confirmar la **lista de 2 copropiedades piloto** comprometidas.
5. Recién entonces empezamos a codear el monorepo.

## Lo que **no** preguntamos en esta sesión

- Cómo se debería ver la pantalla. (Eso es Figma, otro día.)
- Si prefiere botón rojo o azul. (Irrelevante hoy.)
- Detalles tributarios finos. (Lo valida un contador, no la suegrita.)
- Stack técnico. (No le interesa ni le concierne.)
