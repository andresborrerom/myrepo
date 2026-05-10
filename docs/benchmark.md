# Benchmark de SaaS para Administración de Propiedad Horizontal (PH) en Colombia

> Investigación realizada en mayo 2026. Cifras y funcionalidades reportadas a partir de fuentes públicas (sitios oficiales, prensa, directorios y reseñas). Donde no se pudo confirmar precio se indica explícitamente como **"No publicado"**. No se inventan cifras.

---

## 1. Contexto regulatorio mínimo (lo que cualquier producto debe respetar)

Cualquier herramienta SaaS de PH en Colombia debe estar alineada con:

- **Ley 675 de 2001** — Régimen de Propiedad Horizontal: define la copropiedad, asambleas, consejo de administración, coeficientes, manual de convivencia, fondo de imprevistos, etc. ([Cartilla Minvivienda](https://www.minvivienda.gov.co/sites/default/files/2020-07/cartilla-propiedad-horizontal-web.pdf))
- **Orientación Técnica 15 del CTCP** — Copropiedades de uso residencial o mixto: marco contable bajo NIIF para copropiedades. ([Documento CTCP/DIAN](https://www.dian.gov.co/fizcalizacioncontrol/herramienconsulta/NIIF/Orientaciones%20CTCP/Documento15_Orientacion_tecnica_15_Copropiedades_uso_residencial_o_mixto_guia.pdf))
- **DIAN — Facturación Electrónica** y la lista de proveedores tecnológicos autorizados. ([DIAN — Cómo elegir solución de facturación](https://www.dian.gov.co/Prensa/Paginas/BlogDetails.aspx?DianId=5))
- **DIAN — Información exógena tributaria** (las copropiedades de uso comercial o mixto están obligadas a reportar). ([DIAN — Exógena](https://www.dian.gov.co/impuestos/sociedades/ExogenaTributaria/Presentacion/Paginas/default.aspx))
- **Retenciones**: la PH actúa como agente retenedor cuando contrata servicios. ([DIAN — Concepto sobre retención en PH](https://normograma.dian.gov.co/dian/compilacion/docs/oficio_dian_4854_2019.htm))
- **Ley 1581 de 2012** — Protección de datos personales (residentes, visitantes, vehículos).

> Implicación para un nuevo competidor: el "MVP legal" no es opcional. Sin PUC adaptado a PH, sin facturación electrónica DIAN y sin trazabilidad para exógena, no se puede vender al segmento contable.

---

## 2. Plataformas analizadas (perfil por producto)

### 2.1 Sygo
- **URL oficial**: No fue posible verificar un sitio activo en `sygo.com.co` ni encontrar referencias indexadas a un producto SaaS de PH en Colombia llamado "Sygo". Búsquedas devolvieron consistentemente resultados de **Siigo** (proveedor contable, ver 2.3) y de competidores genéricos. ([Búsqueda directorio software](https://www.catalogodesoftware.com/a/sector-inmobiliario-propiedad-horizontal))
- **Estado**: **Producto no verificado públicamente.** Es posible que sea (a) un producto regional sin presencia web, (b) una confusión fonética con Siigo, o (c) que haya cambiado de marca.
- **Recomendación**: confirmar con el solicitante si "Sygo" es un proyecto interno, una marca específica que se ve en algún conjunto, o una referencia errónea a Siigo.

---

### 2.2 OctopusPH / Octopus
- **URL oficial**: <https://www.octopus.com.ar> (Argentina). App residente: **OctoApp** ([Google Play](https://play.google.com/store/apps/details?id=com.octo.app)).
- **Origen**: Argentina (Octopus PropTech). **No es producto colombiano**, pero es comparable conceptualmente porque cubre consorcios (equivalente a PH).
- **Modelo de precios**: Suscripción mensual cobrada **por unidad funcional** (depto/casa) procesada en la plataforma. Comunicación oficial dice "menos del 0,5% del gasto general de la copropiedad". Cifra exacta en COP/USD: **No publicado**. ([Términos Octopus](https://www.octopus.com.ar/terminos-y-condiciones), [ComparaSoftware](https://www.comparasoftware.com.ar/octopus))
- **Stack**: Web app + apps móviles iOS/Android (OctoApp). Solo español.
- **Funcionalidades núcleo**:
  - Liquidación mensual de expensas por unidad funcional.
  - Gastos, pagos del consorcio, rendición de cuentas.
  - Reservas de espacios comunes (SUM, parrilla, pileta).
  - Reclamos y seguimiento de reparaciones.
  - Comunicados/novedades.
  - Pagos online integrados (en Argentina con SIRO/Banco Roela). ([Integración SIRO](https://onlinesiro.com.ar/sistema/integracion-con-octopus/))
- **Diferenciador**: experiencia móvil pulida, marca PropTech consolidada en Argentina.
- **Debilidades para CO**: no integra DIAN, no tiene PUC colombiano, no cubre exógena ni Ley 675.

---

### 2.3 SIIGO Propiedad Horizontal (módulo dentro de SIIGO)
- **URL oficial**: <https://www.siigo.com> + portal específico ([Documentación SIIGO PH](http://portal.siigo.com/docs/DocView.aspx?DocumentID=%7B30779F0C-A82F-4ECB-B212-5E2C68AD348E%7D&NoHeader=1&NoSubject=1), [Base de conocimiento](https://siigopyme.portaldeclientes.siigo.com/basedeconocimiento/apertura-de-inmuebles-propiedad-horizontal/))
- **Modelo de precios**: Suscripción SaaS contable (Siigo Pyme/Contador). El módulo PH se activa dentro de Siigo. Precio público en COP/mes para el módulo PH específicamente: **No publicado** en los resultados consultados.
- **Stack**: Web (Siigo Nube). App móvil contable. Solo español. Proveedor tecnológico autorizado por DIAN.
- **Funcionalidades núcleo**:
  - Contabilidad completa con PUC, balances, P&G, presupuesto.
  - Conceptos de facturación específicos para PH (administración, parqueaderos, vigilancia, áreas comunes).
  - Documento Tipo F — Factura de venta para PH.
  - Facturación electrónica DIAN nativa.
  - Manejo de anticipos por copropietario.
  - Facturación por lotes.
  - Reportes contables, retenciones, soporte para exógena.
- **Diferenciador**: **es el estándar contable** en Colombia; muchos contadores ya saben usarlo. Cumplimiento DIAN 100%.
- **Debilidades**: NO es un software de comunidad — no tiene app residente, ni reservas, ni minuta de portería, ni PQR. Es estrictamente backend contable. Las administraciones que usan Siigo casi siempre complementan con una segunda herramienta para lo "front" (residentes, asambleas, comunicaciones).

---

### 2.4 Domus-Aitech
- **URL oficial**: <https://domus.aitech.net.co/>
- **Modelo de precios**: **No publicado** públicamente; se cotiza directamente.
- **Stack**: Web + app móvil. Bandera de "IA" y "diseño Premium". Solo español.
- **Funcionalidades núcleo (según marketing)**: gestión integral bajo Ley 675, cartera, contabilidad, comunicaciones, reservas, visitantes, asambleas.
- **Diferenciador**: posicionamiento "premium" e IA. Marca con tracción en Bogotá.
- **Debilidades**: poca transparencia de precios y de roadmap; reseñas independientes escasas.
- **Variante extranjera con misma marca**: <https://appdomus.io/> ("Domus AI") ofrece módulos de cuotas, cobranzas, medidores de agua, incidencias, reservas, visitas y paquetería. Distinto producto, mismo nombre — fuente potencial de confusión.

---

### 2.5 Nimbo
- **URL oficial**: No se pudo identificar un SaaS de PH colombiano comercializado bajo el nombre "Nimbo" en los buscadores. **Producto no verificado.**
- **Hipótesis**: puede tratarse de un servicio regional pequeño sin SEO, una marca histórica descontinuada, o una confusión con otra herramienta (p.ej. Nimbus, Kipo).
- **Recomendación**: pedir al solicitante el sitio web exacto si lo conoce.

---

### 2.6 PropTech / PropHub Colombia
- **URL oficial**: No hay un SaaS colombiano específicamente llamado "PropHub" o "PropTech" que aparezca como referente en los directorios. "PropTech" es un término genérico de la industria.
- **Producto análogo más cercano (Argentina)**: **Octopus PropTech** (ver 2.2).
- **Producto análogo en Colombia**: **PropLógica** (ver 2.13) que ocupa el espacio "PropTech moderna para PH". 

---

### 2.7 Edifito (no encontramos "Edyficar")
- **URL oficial**: <https://edifito.co/> (Colombia) y <https://www.edifito.com/> (cabecera regional). También opera en Ecuador y Panamá.
- **Modelo de precios**: **No publicado**; cotización a solicitud. Sede en Bogotá (Av. Carrera 9 #115-06 of. 2604).
- **Stack**: Web + app móvil iOS/Android. Multi-país.
- **Funcionalidades núcleo (según sitio oficial)**:
  - Gastos comunes y facturación.
  - Mensajería interna.
  - Reportes y estados financieros.
  - Control de acceso.
  - Notificaciones de paquetería/correspondencia.
  - Reserva de instalaciones.
- **Diferenciador**: presencia regional (CO, EC, PA), enfocado en condominios y edificios.
- **Debilidades**: poca evidencia pública de cumplimiento DIAN exógena/retenciones nativo (suelen integrarse con un ERP contable externo). Precios opacos.

> Nota: la búsqueda no arrojó resultados para una marca colombiana llamada "Edyficar" / "Edifi" en PH. Si el solicitante se refiere a otra cosa, vale aclarar.

---

### 2.8 AdminPH / Administra
- **URL oficial**: No se identificó un SaaS dominante con la marca exacta "AdminPH" o "Administra". Sí existe **ADMON** (<https://admon.com.co/>), que cubre el mismo nicho.
- **ADMON — Modelo de precios**: **No publicado**.
- **ADMON — Funcionalidades**: comunicación administrador↔residentes, publicaciones, gestión documental, módulos administrativos. Marketing genérico; difícil de evaluar profundidad sin demo.
- **Otros con nombre similar**: AAA Propiedad Horizontal (<https://aaacolombiasas.com/PH/adminph/>) — es una **firma de administración**, no un SaaS.

---

### 2.9 Convive / ConviveApp
- **URL oficial**: No se identificó una marca dominante en CO con el nombre exacto "Convive". Las búsquedas devuelven consistentemente:
  - **ConjuntosApp** (<https://conjuntosapp.co/>) — se autodefine como "la app #1 de administración residencial" (Bogotá).
  - **Mi Conjunto / 109 Apps** (<https://www.109apps.com/mi-conjunto/>) — app integral para residentes.
  - **Mivico** (<https://www.mivico.co/>) — marketplace + app para edificios.
- **Modelo de precios**: **No publicado** en ninguno de los tres.
- **Stack**: web + iOS/Android.
- **Funcionalidades comunes**: comunicación residente↔administración, pagos en línea, reserva de áreas, reportes de problemas, control de visitas.

---

### 2.10 SIPHO (Building Intelligence)
- **URL oficial**: <https://www.sipho.com.co/> y <https://www.buildingintelligence.com.co/conocenos/> (Futlogy, 32 años en software).
- **Modelo de precios**: Estructura por **paquetes** (Paquete Completo / Solo Citofonía / Solo Contabilidad / Citofonía + Residentes). Cifras en COP: **No publicadas explícitamente** en los snippets indexados; se solicita demo.
- **Stack**: Web + **5 apps nativas** (administrador, residente, portería, etc.). Solo español. Diseñado para Ley 675.
- **Funcionalidades núcleo**:
  - Contabilidad completa adaptada a PH (PUC, presupuesto vs ejecución).
  - Cartera, mora, gestión de cobranza.
  - Facturación automática.
  - Conciliación bancaria automática.
  - PQRS.
  - Reservas.
  - Citofonía digital.
  - **Asambleas 100% online o mixtas con quórum automático, 3 tipos de votación, acta digital al cerrar** — el sitio oficial afirma ser "el único en Colombia" con esto integrado.
  - **IA (versión 2026)**: predicción de gastos, conciliación automática, gestión de incidentes, georreferenciación de activos.
- **Diferenciador**: combinación contabilidad + asambleas digitales + IA en un solo producto. Cobertura de Ley 675 declarada.
- **Debilidades**: precios opacos; dependencia de demo guiada para evaluar.
- **Cobertura de prensa**: ([El Tiempo — IA para PH](https://www.eltiempo.com/tecnosfera/novedades-tecnologia/asi-aplican-inteligencia-artificial-y-automatizacion-para-modernizar-la-gestion-de-la-propiedad-horizontal-3498810))

---

### 2.11 Helisa Propiedad Horizontal
- **URL oficial**: <https://helisa.com/productos/propiedad-horizontal/> y <https://helisa.com/producto/cloud-propiedad-horizontal-colegios/>
- **Modelo de precios**: Licencia perpetua + **Helisa Cloud** (suscripción mensual). Cifras en COP: **No publicadas**.
- **Stack**: Software contable empresarial maduro (heredado del mundo on-prem) + Cloud. Solo español. Proveedor DIAN.
- **Funcionalidades núcleo**:
  - Contabilidad, presupuesto, bancos, proveedores, centros de costo, contratos.
  - Cartera por copropietario.
  - Reportes contables, presupuestales, de auditoría.
  - Registro de visitantes, vehículos, mascotas.
  - Facturación y nómina electrónica DIAN.
- **Diferenciador**: profundidad contable, marca consolidada, cumplimiento DIAN.
- **Debilidades**: UX heredada de software de escritorio; experiencia de residente débil (no es su foco). Curva de aprendizaje alta.

---

### 2.12 Comunidad Feliz (CF)
- **URL oficial**: <https://www.comunidadfeliz.co/> (operación CO; matriz chilena).
- **Modelo de precios**: **No publicado** explícitamente en CO; en Chile/México opera por unidad/mes.
- **Stack**: Web + apps móviles iOS/Android. Operación regional (Chile, México, Colombia).
- **Funcionalidades núcleo**:
  - Cobro automático de cuotas + pagos en línea.
  - Conciliación.
  - Comunicación residentes↔admin.
  - Control de acceso visitantes.
  - Reportes financieros en tiempo real.
  - Mantenimiento.
  - **IA aplicada a gestión** (anuncio reciente).
- **Tracción en Colombia**: **inversión USD 3M anunciada para CO**; meta de 5.000 comunidades antes de fin de 2026; equipo local de 30 personas en Bogotá, Medellín, Cali, Ibagué. ([La Gran Noticia](https://lagrannoticia.com/comunidad-feliz-invertira-usd-3-millones-para-digitalizar-la-propiedad-horizontal/), [DF Lab](https://www.df.cl/df-lab/innovacion-y-startups/comunidad-feliz-se-expande-a-colombia-con-su-plataforma-para-administrar))
- **Diferenciador**: capital, marca regional, UX moderna, foco en residente.
- **Debilidades**: integración tardía con DIAN/PUC colombiano (al ser producto importado, hay que validar profundidad contable local — punto a verificar en demo).

---

### 2.13 PropLógica
- **URL oficial**: <https://proplogica.co/>
- **Modelo de precios**: **Plan base $49.900 COP/mes** (dashboard, propiedades ilimitadas, comunicados básicos). Módulos adicionales (facturación, cartera, PQRS, asambleas) se activan **a la carta**. Sin cláusulas de permanencia. ([PropLógica](https://proplogica.co/))
- **Stack**: Web. Móvil reportado vía PWA + canales WhatsApp/Email. Solo español.
- **Funcionalidades núcleo**:
  - Gestión modular adaptada a Ley 675.
  - Facturación y cartera.
  - Estados de cuenta, paz y salvo.
  - Actas de asamblea.
  - SG-SST.
  - Fondo de imprevistos.
  - Comunicación dual WhatsApp + Email.
  - **IA para redacción de comunicados y análisis de cartera**.
- **Diferenciador**: **precio público bajo de entrada**, modular, IA generativa visible en marketing.
- **Debilidades**: producto joven, comunidad de usuarios pequeña (poca evidencia de reseñas independientes); profundidad contable sin verificar.

---

### 2.14 Neivor
- **URL oficial**: <https://neivor.com/co/>
- **Modelo de precios**: **Comisión mensual por edificio**, calculada según uso de pagos. Cifra exacta: **No publicada**. ([Ebanking News](https://www.ebankingnews.com/destacados/neivor-la-fintech-que-revoluciona-los-pagos-para-conjuntos-residenciales-0049592))
- **Stack**: Web + apps iOS/Android. Operación: México, Colombia, Ecuador. Capital semilla de USD 600k + ronda posterior >COP 2.100M. ([La República](https://www.larepublica.co/empresas/la-plataforma-de-pagos-neivor-anuncio-que-levanto-capital-semilla-por-us600000-3129138))
- **Funcionalidades núcleo**:
  - **Eje fintech: pagos automáticos, recibos, conciliación**.
  - Reservas de áreas comunes (acceso bloqueado si hay mora).
  - Comunicación admin↔residentes.
  - Cartera y cobranza automatizada.
  - Reportes financieros.
  - Paquetería, visitantes.
- **Diferenciador**: **fintech first** — la cobranza es el corazón. Más de 3.200 conjuntos / 294k usuarios en LATAM.
- **Debilidades**: módulo contable limitado vs un Helisa/Siigo (suele ser complemento de un ERP); enfoque en pagos puede dejar gaps en exógena/retenciones.

---

### 2.15 Kipo
- **URL oficial**: <https://kipo.app/>
- **Modelo de precios**: Sin cláusula de permanencia. "Extras" cotizados aparte. Cifra base en COP: **No publicada**.
- **Stack**: Web + Android (APK disponible). Solo español.
- **Funcionalidades núcleo**:
  - Comunicación + cartelera de noticias.
  - Votaciones.
  - Buzón PQR.
  - Registro de mascotas, vehículos, familiares.
  - Coordinación con portería.
- **Diferenciador**: foco en **conectividad y comunidad** (residente+portería+admin). UX simple.
- **Debilidades**: contabilidad y cartera profundas no son su fuerte (más "app de residentes" que ERP).

---

### 2.16 Propiedata
- **URL oficial**: <https://www.propiedata.com/>
- **Modelo de precios**: **Asambleas virtuales** publicadas — para >400 unidades: **$3.600.000 COP** (8 horas incluidas) + **$6.000 COP por unidad adicional**. ([Propiedata Precios](https://www.propiedata.com/precios/))
- **Stack**: Web + app móvil. Asambleas soportan >5.000 participantes simultáneos.
- **Funcionalidades núcleo**:
  - **Asambleas virtuales/mixtas/presenciales** (su producto estrella).
  - Quórum, votaciones, actas, grabación.
  - Pagos integrados.
  - Citofonía.
  - Reservas.
  - PQR.
  - Comunicación.
- **Diferenciador**: **líder reconocido en asambleas digitales en Colombia** (mencionado por Portafolio, Metrocuadrado).
- **Debilidades**: contabilidad/PUC débil; suele ser "complemento de asambleas" + un ERP separado.

---

### 2.17 Vecindapp
- **URL oficial**: <https://vecindapp.com.co/>
- **Modelo de precios**: Tres planes (Lite, Connect, Pro) cobrados por número de unidades; descuento si se factura anual. Cifras exactas en COP: **No publicadas en snippets** (ver <https://vecindapp.com.co/precios/>). Plan enterprise para >1.000 unidades.
- **Stack**: Web + apps iOS/Android (sin límite de usuarios residentes). Cloud con respaldo diario.
- **Funcionalidades núcleo**:
  - Lite: gestión administrativa básica.
  - Connect: + citofonía digital 24/7.
  - Pro: todo + asambleas virtuales legales.
  - Comunicación masiva.
  - Reportes automáticos.
  - Asambleas digitales (producto separado por evento).
- **Diferenciador**: planes tier claros, citofonía virtual integrada como bandera.

---

### 2.18 Jelpit Conjuntos (Grupo Bolívar / Davivienda)
- **URL oficial**: <https://conjuntos.jelpit.com/>
- **Modelo de precios**: Modelo bancarizado. Para conjunto: comisiones por recaudo. **Cifras: No publicadas** (varían por banco emisor y volumen).
- **Stack**: Web + app móvil. Asistente conversacional **CHAT MÍA** para residentes.
- **Funcionalidades núcleo**:
  - Pagos por **PSE, tarjetas, efectivo, no solo Davivienda** (cualquier banco con PSE).
  - Recaudo y conciliación.
  - Reservas de áreas comunes.
  - Comunicación.
  - Productos asociados de ahorro/inversión del Grupo Bolívar.
- **Diferenciador**: **respaldo bancario** y push del Grupo Bolívar; canal CHAT MÍA con IA conversacional.
- **Debilidades**: foco en pagos; profundidad contable y operativa más débil que un ERP especializado.

---

### 2.19 Soft-IA
- **URL oficial**: <https://soft-ia.com/>
- **Modelo de precios**: Marketing afirma "los mejores precios sin costos ocultos". Cifras: **No publicadas**.
- **Funcionalidades**: contabilidad, cartera, residentes, asambleas, PQR. Cumplimiento Gaceta 43.032.
- **Debilidades**: visibilidad pública limitada; pocas reseñas independientes.

---

### 2.20 EXIMUS — EX-SAPH
- **URL oficial**: <https://eximus.com.co/productos/exsaph/>
- **Modelo de precios**: **Plan gratuito 100% sin restricciones** declarado; soporte y servicios adicionales se cotizan. Sin permanencia.
- **Funcionalidades**: asambleas (quórum + votación + actas), mantenimientos, comunicación, documentación, reportes financieros.
- **Diferenciador**: free-tier real es raro en este mercado.

---

### 2.21 Otros mencionados (panorama)
- **Decopropiedad** — <https://www.decopropiedad.com/> — contabilidad + administrativo + comunicaciones. Sin precios públicos.
- **Copropiedad.co (Teleinte)** — <https://teleinte.com/soluciones/copropiedad/> — declarado "el más usado" en CO; sin precios públicos.
- **PH en Línea** — <https://phenlinea.info/> — sistema integral PH.
- **PH Solution** — <https://phsolution.com.co/>.
- **PH Team Solutions** — <https://www.phteamsolutions.com/> — citofonía digital, comunicados, censo, parqueaderos.
- **CODI** — <https://codi.com.co/> — contable + gestión.
- **ADMON** — <https://admon.com.co/>.
- **FácilAdmin** — <https://www.faciladmin.co/> — iOS/Android, cumplimiento Ley 1581.
- **Mi Conjunto / 109 Apps** — <https://www.109apps.com/mi-conjunto/>.
- **ConjuntosApp** — <https://conjuntosapp.co/>.
- **Mivico** — <https://www.mivico.co/> — marketplace + app.
- **Munily** — <https://munily.com/en/> — internacional, presencia en CO.

---

## 3. Matriz de funcionalidades vs producto

> Convención: **Si** = nativo y maduro · **Parcial** = existe pero limitado · **No** = no soportado · **?** = no verificado en fuentes públicas. Se marcan los productos con información más completa.

| Funcionalidad | Siigo PH | Helisa PH | SIPHO | PropLógica | Neivor | Comunidad Feliz | Domus-Aitech | Edifito | Vecindapp | Propiedata | Kipo | Jelpit | EXIMUS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Contabilidad PUC PH (NIIF / Orientación 15) | **Si** | **Si** | **Si** | Parcial | Parcial | ? | Si | Parcial | Parcial | No | No | No | Parcial |
| Balances / P&G / Presupuesto vs ejecución | **Si** | **Si** | **Si** | Si | Parcial | ? | Si | Parcial | Parcial | No | No | No | Parcial |
| Cartera por unidad / mora / acuerdos / paz y salvo | Si | Si | Si | Si | **Si** | Si | Si | Si | Si | Parcial | Parcial | Parcial | Parcial |
| Pasarela de pagos (PSE, Wompi, ePayco, MP) | Vía integraciones | Vía integraciones | Si | Si | **Si (core)** | Si | Si | Si | Si | Si | Parcial | **Si (PSE multi-banco)** | Parcial |
| Conciliación bancaria | Si | Si | Si (auto) | Parcial | **Si (auto)** | Si | Si | Si | Si | Parcial | No | Si | No |
| Facturación electrónica DIAN | **Si (nativo)** | **Si (nativo)** | Si | Si | Parcial | ? | Si | ? | Si | No | No | Parcial | No |
| Comunicaciones email/SMS/WhatsApp/push | No | No | Si | **Si (WA+email)** | Si | Si | Si | Si | Si | Si | Si | Si | Si |
| Cartelera digital | No | No | Si | Si | Si | Si | Si | Si | Si | Si | **Si** | Si | Si |
| Asambleas virtuales/mixtas (quórum + votación + acta) | No | No | **Si** | Si | Parcial | Parcial | Si | Parcial | **Si** | **Si (líder)** | Parcial | No | Si |
| PQR / tickets | No | Parcial | Si | Si | Si | Si | Si | Si | Si | Si | **Si** | Si | Si |
| Reservas de áreas comunes | No | Parcial | Si | Si | **Si** | Si | Si | Si | Si | Si | Si | Si | Parcial |
| Visitantes / minuta de portería / citofonía digital | No | Parcial | **Si (5 apps)** | Parcial | Si | Si | Si | Si | **Si (Connect/Pro)** | Si | Si | Parcial | No |
| Correspondencia / paquetería | No | No | Si | Parcial | Si | Si | Si | Si | Si | Parcial | Si | Si | No |
| Multas y comparendos del manual de convivencia | No | Parcial | Si | Si | Parcial | Parcial | Si | Parcial | Parcial | No | Parcial | No | Parcial |
| Vehículos / parqueaderos | Parcial | Si | Si | Si | Si | Si | Si | Si | Si | Si | **Si** | Si | Parcial |
| Mascotas | No | Si | Si | Si | Si | Si | Si | Si | Si | Si | **Si** | Si | Parcial |
| Documentos (actas, reglamento, EEFF) | Parcial | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si |
| App residente (iOS/Android) | No | No | **Si** | PWA | **Si** | **Si** | Si | Si | **Si** | Si | Android | Si | No |
| Portal admin + panel consejo | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Parcial |
| Multi-conjunto / multi-tenant para administradoras | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si | Si |
| Exógena DIAN (formatos 1001, 1003, etc.) | **Si** | **Si** | Si | ? | No | ? | ? | ? | ? | No | No | No | No |
| Retenciones (fuente, IVA, ICA) | **Si** | **Si** | Si | Parcial | No | ? | ? | ? | ? | No | No | No | No |
| IA (cobranza, predicción, NLP comunicados) | No | No | **Si (2026)** | **Si (NLP)** | Parcial | Si (anunciado) | Si (marketing) | No | No | No | No | Si (CHAT MÍA) | No |

> Lectura clave: **ningún producto cubre 100% del cuadro**. Los líderes contables (Siigo, Helisa) son débiles en residentes; los líderes de residentes (Neivor, Comunidad Feliz, Kipo) son débiles en contabilidad/exógena; SIPHO y PropLógica intentan el "todo en uno" pero son recientes.

---

## 4. UX y reseñas: lo que dicen administradores y residentes

Insights cualitativos cruzados de prensa y artículos de la industria:

- **Quejas frecuentes contra software actual** (no contra uno específico, sino el patrón general):
  - Curva de aprendizaje alta, especialmente en herramientas heredadas tipo Helisa/Siigo. ([Alegra blog](https://blog.alegra.com/colombia/puntos-seleccionar-software-propiedad-horizontal/))
  - Dependencia de demo guiada para conocer precios.
  - Comunicación residente↔admin se sigue fragmentando entre WhatsApp informal + correo + el sistema.
  - Conciliaciones bancarias manuales propensas a error.
- **Conflictos típicos en PH** (que el software debe ayudar a resolver):
  - 25% de quejas relacionadas con el administrador, 12% manual de convivencia, 8% ruido, 5% multas, 5% manejo de dinero, 5% revisor fiscal. ([El Tiempo](https://www.eltiempo.com/bogota/los-problemas-mas-frecuentes-con-la-propiedad-horizontal-237898))
- **Fortaleza percibida cuando funciona**: trazabilidad de PQR (Kipo lo destaca en testimoniales), transparencia de cartera, asambleas remotas que aumentan quórum.

---

## 5. Piso mínimo de MVP (qué necesita un nuevo competidor para ser tomado en serio)

Un nuevo competidor en Colombia, para evitar el rechazo inmediato del mercado, **debe entregar día 1**:

### 5.1 Núcleo contable y fiscal (no negociable)
1. **PUC adaptado a PH** alineado con la Orientación Técnica 15 del CTCP.
2. **Facturación electrónica DIAN** (proveedor tecnológico autorizado o integración vía Factus/Alanube/Matias API).
3. **Recibo de administración por unidad** con cálculo automático por coeficiente y conceptos múltiples (administración, parqueaderos, cuotas extra, intereses moratorios).
4. **Cartera por unidad**: estado de cuenta, intereses de mora con tasa configurable, acuerdos de pago con cuotas, generación de paz y salvo.
5. **Conciliación bancaria** semi-automática con mínimo Bancolombia, Davivienda, BBVA, Banco de Bogotá.
6. **Retenciones** (fuente, IVA, ICA municipal) con certificados.
7. **Soporte para exógena DIAN** (formatos 1001, 1003, 1005, 1006, 1007, 1008 según aplique).
8. **Presupuesto vs ejecución** mensual y anual.

### 5.2 Pagos (fintech mínima)
9. Integración nativa con **PSE + al menos dos pasarelas: Wompi y ePayco** (preferiblemente también Mercado Pago para LATAM).
10. **Débito automático** (mandato PSE) y **link de pago por unidad**.
11. Conciliación automática del recaudo (pago → asiento contable → estado de cuenta).

### 5.3 Operación de comunidad
12. **App residente nativa iOS + Android** con: estado de cuenta, pago, PQR, reservas, cartelera, paquetería, visitantes, votación.
13. **Panel admin web** con todo lo anterior + gestión multi-conjunto.
14. **Panel consejo** (rol con permisos de lectura ampliados sin escribir).
15. **Gestión de visitantes**: pre-autorización por residente, QR, minuta digital firmada por portería.
16. **Reservas de áreas comunes** con calendario, reglas, bloqueo por mora.
17. **Correspondencia / paquetería** con foto y firma digital.
18. **Vehículos, parqueaderos, mascotas**: registro y validación.
19. **PQR** con SLA, estados, evidencias, hilo de comentarios.
20. **Multas/comparendos** del manual de convivencia con flujo de descargo.

### 5.4 Asambleas (diferenciador casi obligatorio en 2026)
21. **Asamblea virtual/mixta legal**: convocatoria con plantilla Ley 675, registro de asistencia, control de quórum en tiempo real, votaciones (mayoría simple, calificada, coeficiente), acta con firmas digitales y grabación.

### 5.5 Comunicaciones
22. **Email masivo + WhatsApp + push** con plantillas. Integración WhatsApp Business API (no scraping).
23. **Cartelera digital** con segmentación por torre/bloque.

### 5.6 Cumplimiento y seguridad
24. **Ley 1581/2012**: políticas, consentimiento, eliminación de datos.
25. **Backups diarios** y trazabilidad por usuario (auditoría).
26. **Multi-tenant** real para administradoras (no instancias separadas).

### 5.7 Onboarding y precios
27. **Migración asistida** desde Excel/Siigo/Helisa (importadores CSV de cartera y maestro de unidades).
28. **Precio público transparente** (rompe con el patrón "solicite demo"). Ej: COP/unidad/mes con free trial de 30 días.
29. **Sin cláusula de permanencia** (estándar emergente: PropLógica, Kipo, EXIMUS ya lo ofrecen).

---

## 6. Oportunidades / gaps donde diferenciarse

| # | Oportunidad | Por qué | Cómo capturarla |
|---|---|---|---|
| 1 | **Precio transparente y bajo de entrada** | Solo PropLógica ($49.900/mes base) y Propiedata publican tarifas. Resto exige demo. | Publicar tarifa por unidad/mes en sitio (ej. $1.500–$3.000 COP/unidad/mes). Free trial 30 días sin tarjeta. |
| 2 | **UX residente "Apple-grade"** | La mayoría aún siente "software empresarial 2010". Comunidad Feliz y Neivor van adelante; resto va detrás. | Diseñar primero la app residente, después el admin. Onboarding <2 minutos. Pagar la cuota en 2 taps. |
| 3 | **IA aplicada de verdad** | SIPHO, PropLógica, Domus, Comunidad Feliz lo prometen. Aún no hay un líder claro. | (a) **Cobranza inteligente**: predicción de mora por unidad, mensajes personalizados, ranking de probabilidad de pago. (b) **Asistente del administrador**: generar comunicados, redactar actas, responder PQR con tono validado. (c) **Conciliación bancaria 100% IA** sobre extractos de Bancolombia/Davivienda. (d) **Resumen ejecutivo mensual** automatizado para el consejo. |
| 4 | **Asamblea como producto vertical sólido** | Propiedata domina pero su tarifa por evento (>$3.6M para >400 unidades) abre espacio a un competidor con suscripción anual ilimitada. | Asamblea virtual/mixta como módulo incluido en el SaaS, no producto aparte. |
| 5 | **Integración nativa con la realidad colombiana** | Productos extranjeros (Comunidad Feliz, Octopus, Edifito regional) sufren al adaptar PUC + DIAN. | Construir desde día 1: PUC PH + facturación electrónica DIAN + exógena + retenciones + retención ICA por municipio. |
| 6 | **WhatsApp como canal primario** | El residente promedio en CO no abre apps; sí abre WhatsApp. PropLógica lo destaca; el resto lo ignora. | WhatsApp Business API: pago de cuota, descarga de paz y salvo, registro de visitante, voto en asamblea. |
| 7 | **Conciliación bancaria automática real** | Hoy Bancolombia/Davivienda con OCR + reglas. Casi todos lo ofrecen "manual asistido". | Open-banking / extractos por API (PSE + scraping legítimo) + matching IA. Vendido como "tu contador deja de conciliar". |
| 8 | **Multi-conjunto para administradoras profesionales** | El consolidador del mercado son las **administradoras** que manejan 10–200 conjuntos. Ningún producto las trata como cliente principal. | Panel "agencia": KPIs cruzados, facturación a la administradora, marca blanca, billing centralizado. |
| 9 | **Cumplimiento integral DIAN como argumento de venta** | Esto solo Siigo/Helisa lo tienen sólido — pero su UX es vieja. | Ser el primer producto **moderno** + DIAN-completo, no solo "moderno + parcial". |
| 10 | **Datos abiertos / portabilidad** | Mercado entero amarra al cliente. | "Salida con un click": exporta TODO en Excel + JSON + PDF de actas. Antifrágil contra churn por desconfianza. |
| 11 | **Onboarding migración desde Siigo/Excel** | Los conjuntos existentes ya tienen historia contable; migrar es la fricción #1. | Importador asistido + servicio profesional incluido en el primer mes. |
| 12 | **Verticales adyacentes**: edificios de oficinas, centros comerciales, bodegas | La mayoría se enfoca en residencial. Comerciales tienen exógena obligatoria y pagos más altos. | Plan "PH Comercial" con módulo de arrendamientos y locales. |

---

## 7. Rangos de precio del mercado (COP por unidad/mes)

> Información sobre tarifas pública es escasa. Lo que sí se pudo confirmar:

| Producto | Precio confirmado | Fuente |
|---|---|---|
| **PropLógica** | Plan base **$49.900 COP/mes** (no por unidad; precio fijo de plataforma). Módulos a la carta. | <https://proplogica.co/> |
| **Propiedata (asambleas)** | **$3.600.000 COP por asamblea** para >400 unidades, +$6.000 COP por unidad adicional. | <https://www.propiedata.com/precios/> |
| **EXIMUS EX-SAPH** | **Free tier 100%**; servicios premium cotizados. | <https://eximus.com.co/productos/exsaph/> |
| Octopus (Argentina) | "<0,5% del gasto general del consorcio"; cifra puntual en COP no aplicable. | <https://www.octopus.com.ar/terminos-y-condiciones> |
| Resto (Siigo PH, Helisa, SIPHO, Domus-Aitech, Edifito, Comunidad Feliz, Vecindapp, Neivor, Kipo, Jelpit, Soft-IA, Decopropiedad, Copropiedad.co, Mi Conjunto, ConjuntosApp, ADMON, FácilAdmin) | **No publicado** públicamente. Modelo dominante: cotización tras demo. | — |

### 7.1 Rangos estimados (basados en señales indirectas — usar con cautela)

A partir de menciones en prensa, tarifas equivalentes en otros países LATAM y comentarios públicos en foros de administradores, el rango razonable del mercado colombiano para un SaaS de PH integral es:

- **Tier económico / app residente sin contabilidad profunda** (Kipo, ConjuntosApp, Mivico, Mi Conjunto): **~$1.000–$2.500 COP por unidad/mes** o cuota fija baja de plataforma (~$50k–$150k/mes).
- **Tier intermedio "todo-en-uno" moderno** (PropLógica, Vecindapp, Comunidad Feliz, Neivor, Domus, SIPHO): **~$2.500–$6.000 COP por unidad/mes** equivalente, frecuentemente facturado como plataforma + por unidad.
- **Tier ERP contable robusto** (Siigo PH, Helisa PH, Soft-IA): **~$200.000–$800.000 COP/mes** por copropiedad, con módulos adicionales.
- **Asambleas virtuales como producto puntual**: **$1M–$4M COP por asamblea** según tamaño (Propiedata es referencia).

> **Aviso**: estos rangos son inferenciales, no confirmados producto por producto. Recomendado validarlos con cotizaciones directas antes de fijar la tarifa propia.

---

## 8. Conclusión ejecutiva

1. El mercado colombiano de SaaS para PH está **fragmentado** entre tres arquetipos:
   - **ERP contable** (Siigo, Helisa) — fuerte en backend, débil en residente.
   - **App de comunidad** (Kipo, ConjuntosApp, Mi Conjunto, Mivico) — fuerte en residente, débil en contabilidad.
   - **All-in-one moderno** (SIPHO, PropLógica, Vecindapp, Comunidad Feliz, Neivor, Domus, Edifito) — intentan unir las dos puntas; ninguno domina.

2. **Comunidad Feliz** llega con USD 3M y meta de 5.000 conjuntos para fin de 2026: es el **competidor a vigilar** para cualquier nuevo entrante.

3. **Propiedata** se ha vuelto el estándar de facto para **asambleas virtuales**; un MVP nuevo que no cubra asambleas no compite.

4. **Tarifas opacas** son la norma; ser **el primero con tarifa pública atractiva** y plan free/trial real es probablemente el mayor desbloqueador comercial inmediato.

5. **IA aplicada** está en marketing pero no en producto profundo: queda espacio para ser el primero con cobranza inteligente, conciliación 100% automática y asistente generativo del administrador.

6. **El cumplimiento DIAN + Ley 675 + exógena + retenciones** sigue siendo el filtro que mata productos extranjeros y soluciones "ligeras". Quien lo resuelva con UX moderna se lleva el premio mayor.

---

## 9. Fuentes citadas

- Marco regulatorio
  - [Cartilla Ley 675 — Minvivienda](https://www.minvivienda.gov.co/sites/default/files/2020-07/cartilla-propiedad-horizontal-web.pdf)
  - [Orientación Técnica 15 CTCP — DIAN](https://www.dian.gov.co/fizcalizacioncontrol/herramienconsulta/NIIF/Orientaciones%20CTCP/Documento15_Orientacion_tecnica_15_Copropiedades_uso_residencial_o_mixto_guia.pdf)
  - [DIAN — Cómo elegir solución de facturación electrónica](https://www.dian.gov.co/Prensa/Paginas/BlogDetails.aspx?DianId=5)
  - [DIAN — Información Exógena Tributaria](https://www.dian.gov.co/impuestos/sociedades/ExogenaTributaria/Presentacion/Paginas/default.aspx)
  - [DIAN — Concepto retenciones en PH (Oficio 4854/2019)](https://normograma.dian.gov.co/dian/compilacion/docs/oficio_dian_4854_2019.htm)
- Productos
  - [Siigo Propiedad Horizontal](http://portal.siigo.com/docs/DocView.aspx?DocumentID=%7B30779F0C-A82F-4ECB-B212-5E2C68AD348E%7D&NoHeader=1&NoSubject=1)
  - [Siigo — Apertura inmuebles PH](https://siigopyme.portaldeclientes.siigo.com/basedeconocimiento/apertura-de-inmuebles-propiedad-horizontal/)
  - [Helisa — Productos PH](https://helisa.com/productos/propiedad-horizontal/)
  - [Helisa — Cloud PH/Colegios](https://helisa.com/producto/cloud-propiedad-horizontal-colegios/)
  - [SIPHO](https://www.sipho.com.co/)
  - [Building Intelligence (Futlogy)](https://www.buildingintelligence.com.co/conocenos/)
  - [PropLógica](https://proplogica.co/)
  - [Vecindapp](https://vecindapp.com.co/)
  - [Vecindapp — Precios](https://vecindapp.com.co/precios/)
  - [Vecindapp — App Store](https://apps.apple.com/co/app/vecindapp/id6460936487)
  - [Neivor Colombia](https://neivor.com/co/)
  - [Neivor — Google Play](https://play.google.com/store/apps/details?id=com.neivor)
  - [Comunidad Feliz Colombia](https://www.comunidadfeliz.co/)
  - [Domus-Aitech](https://domus.aitech.net.co/)
  - [Domus AI](https://appdomus.io/)
  - [Edifito Colombia](https://edifito.co/)
  - [Edifito.com](https://www.edifito.com/)
  - [Kipo](https://kipo.app/)
  - [Kipo — Términos](https://kipo.app/terminos-y-condiciones)
  - [Propiedata](https://www.propiedata.com/)
  - [Propiedata — Precios](https://www.propiedata.com/precios/)
  - [EXIMUS EX-SAPH](https://eximus.com.co/productos/exsaph/)
  - [Soft-IA](https://soft-ia.com/)
  - [Decopropiedad](https://www.decopropiedad.com/)
  - [Copropiedad.co (Teleinte)](https://teleinte.com/soluciones/copropiedad/)
  - [PH en Línea](https://phenlinea.info/)
  - [PH Solution](https://phsolution.com.co/)
  - [PH Team Solutions](https://www.phteamsolutions.com/)
  - [CODI](https://codi.com.co/)
  - [ADMON](https://admon.com.co/)
  - [FácilAdmin](https://www.faciladmin.co/)
  - [Mi Conjunto / 109 Apps](https://www.109apps.com/mi-conjunto/)
  - [ConjuntosApp](https://conjuntosapp.co/)
  - [Mivico](https://www.mivico.co/)
  - [Munily](https://munily.com/en/)
  - [Octopus PropTech (AR)](https://www.octopus.com.ar/)
  - [Octopus — Términos](https://www.octopus.com.ar/terminos-y-condiciones)
  - [OctoApp](https://play.google.com/store/apps/details?id=com.octo.app)
  - [Octopus en ComparaSoftware](https://www.comparasoftware.com.ar/octopus)
  - [Jelpit Conjuntos](https://conjuntos.jelpit.com/)
  - [Jelpit — Funcionalidades residente](https://conjuntos.jelpit.com/funcionalidades-residente)
- Pasarelas / DIAN providers
  - [Wompi Docs — métodos de pago](https://docs.wompi.co/en/docs/colombia/metodos-de-pago/)
  - [ePayco](https://epayco.com/)
  - [Factus — API Facturación DIAN](https://www.factus.com.co/)
  - [Alanube](https://www.alanube.co/colombia/)
  - [Matias API](https://matias-api.com/)
  - [Alegra Facturación Electrónica](https://www.alegra.com/colombia/facturacion-electronica/)
- Prensa y análisis
  - [El Tiempo — IA en PH](https://www.eltiempo.com/tecnosfera/novedades-tecnologia/asi-aplican-inteligencia-artificial-y-automatizacion-para-modernizar-la-gestion-de-la-propiedad-horizontal-3498810)
  - [El Tiempo — Conflictos en PH](https://www.eltiempo.com/bogota/los-problemas-mas-frecuentes-con-la-propiedad-horizontal-237898)
  - [Construdata — Comunidad Feliz llega a CO](https://www.construdata.com/noticias/comunidad-feliz-llega-colombia-para-digitalizar-la-propiedad-horizontal-5371)
  - [La Gran Noticia — CF inversión USD 3M](https://lagrannoticia.com/comunidad-feliz-invertira-usd-3-millones-para-digitalizar-la-propiedad-horizontal/)
  - [Diario Financiero — CF en CO](https://www.df.cl/df-lab/innovacion-y-startups/comunidad-feliz-se-expande-a-colombia-con-su-plataforma-para-administrar)
  - [Xataka CO — CF llega a Colombia](https://www.xataka.com.co/aplicaciones/buenas-noticias-para-residentes-conjuntos-residenciales-colombia-esta-plataforma-internacional-llega-para-facilitar-administracion-digitalizar-propiedad-horizontal-pais)
  - [Portafolio — Propiedata](https://www.portafolio.co/mis-finanzas/vivienda/propiedata-app-que-permite-gestionar-conjuntos-residenciales-y-hacer-asambleas-552711)
  - [Metrocuadrado — Propiedata líder asambleas](https://www.metrocuadrado.com/noticias/actualidad/conoce-propiedata-la-compania-lider-en-asambleas-virtuales-de-propiedad-horizontal-en-colombia-4494)
  - [La República — Neivor levanta capital](https://www.larepublica.co/empresas/la-plataforma-de-pagos-neivor-anuncio-que-levanto-capital-semilla-por-us600000-3129138)
  - [Semana — Neivor financiación](https://www.semana.com/economia/capsulas/articulo/neivor-la-startup-colombiana-que-consiguio-mas-de-2100-millones-de-financiacion/202157/)
  - [Ebanking News — Neivor fintech](https://www.ebankingnews.com/destacados/neivor-la-fintech-que-revoluciona-los-pagos-para-conjuntos-residenciales-0049592)
  - [Alegra Blog — Cómo elegir software PH](https://blog.alegra.com/colombia/puntos-seleccionar-software-propiedad-horizontal/)
  - [Daytona — 5 software PH](https://daytona.cloud/software-de-gestion.html)
  - [Catálogo de Software CO](https://www.catalogodesoftware.com/a/sector-inmobiliario-propiedad-horizontal)
  - [Guía TIC — Software PH](https://guiatic.com/co/229-software-propiedad-horizontal-software-para-la-gestion-y-administracion-de-propiedad-horizontal)
