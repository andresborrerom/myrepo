# Glosario

Términos clave del proyecto. Si Claude usa una sigla y no aparece aquí,
es bug — me lo agregás.

Orden alfabético. Cuando una sigla tiene equivalente en español, pongo
los dos nombres.

---

## A

**ACH** (Automated Clearing House)
Sistema de transferencias bancarias domésticas en US. Lento (1-3 días)
pero gratis o casi gratis. Es como las transferencias interbancarias
locales de un país, pero específicamente del sistema US.

**ADR** (Architecture Decision Record / Registro de Decisión de
Arquitectura)
Documento corto que captura una decisión técnica o estratégica:
contexto, decisión, consecuencias, alternativas descartadas. Los
nuestros viven en `docs/decisions/`.

**Allintitle**
Operador de Google (`allintitle:"frase"`) que devuelve solo páginas con
TODAS esas palabras en el título. Sirve para medir competencia real de
una keyword: si hay <10 resultados con baja autoridad, la keyword es
fácil de rankear.

**AML** (Anti-Money Laundering)
Regulaciones contra lavado de dinero. Bancos como Mercury o Wise piden
detalle del negocio por este motivo.

**Amazon Associates**
Programa de afiliados de Amazon. Vos generás un link especial; si
alguien clickea y compra cualquier cosa en las siguientes 24h, te pagan
comisión (1-10% según categoría). No requiere cuenta de Seller. Es
nuestro motor de monetización principal.

**API** (Application Programming Interface)
Forma estructurada de pedir datos a un sistema vía código. Ejemplo:
Keepa API te da historial de precios y BSR de cualquier producto Amazon
sin tener que scrapear.

## B

**BSR** (Best Sellers Rank)
Ranking de Amazon dentro de cada categoría. BSR #1 = el más vendido de
esa categoría. Proxy de demanda: BSR <10,000 vende mucho; >500,000 casi
nada. La métrica más usada para estimar volumen de ventas.

## C

**COGS** (Cost of Goods Sold / Costo de mercancía vendida)
Costo directo de producir o adquirir lo que vendés. En FBA típico:
costo fabricante + shipping al warehouse de Amazon.

**CPC** (Cost Per Click)
Cuánto pagás por click en publicidad (Google Ads, Amazon Ads). Si CPC
es alto ($3-5), señal de competencia fuerte y que la keyword convierte.
Si es bajo ($0.10), o no hay tráfico o nadie monetiza ahí.

**CTR** (Click-Through Rate)
Clicks / impresiones. Si tu página aparece 1,000 veces en Google y te
clickean 30 veces, CTR = 3%. CTR bajo con muchas impresiones = problema
de título o meta description.

## D

**DA / DR** (Domain Authority / Domain Rating)
Métricas inventadas por Moz (DA) y Ahrefs (DR) que estiman cuán fuerte
es un dominio para rankear. No vienen de Google directamente pero
correlacionan. Sitio nuevo arranca en 0-10; establecido 30-50; gigantes
(NYTimes, Amazon) 90+. Útil para evaluar si un nicho está dominado por
sitios fuertes o débiles.

**DGI** (Dirección General de Ingresos)
Autoridad fiscal de Panamá.

**DIAN** (Dirección de Impuestos y Aduanas Nacionales)
Autoridad fiscal de Colombia.

**DTC** (Direct to Consumer)
Modelo donde la marca le vende directo al consumidor sin intermediarios.
Shopify es la plataforma DTC clásica.

## E

**EIN** (Employer Identification Number)
Número de identificación fiscal de empresa en US, equivalente al NIT
para personas jurídicas. Lo da el IRS gratis. Necesario para una US
LLC.

**EPC** (Earnings Per Click)
En afiliados: cuánto ganás en promedio por cada click que enviás al
merchant. EPC alto ($1+) = afiliado rentable. EPC bajo ($0.05) = vas a
necesitar volumen masivo.

## F

**FBA** (Fulfillment by Amazon)
Vos enviás inventario a los warehouses de Amazon; ellos almacenan,
empacan, envían y manejan devoluciones. Cobran fees. Es lo que permite
operar sin tocar producto físicamente.

**FBM** (Fulfilled by Merchant)
Vos manejás storage, packing y shipping. Más control, menos fees, más
operativa propia.

## I

**IVA / VAT** (Impuesto al Valor Agregado / Value Added Tax)
Impuesto al consumo. Si vendés en Amazon UE tenés que registrarte para
VAT en al menos un país europeo.

## K

**KDP** (Kindle Direct Publishing)
Plataforma de Amazon para autopublicar libros (eBook + paperback +
hardcover). No requiere stock; Amazon imprime on-demand. Sin Seller
account.

**Keepa**
Herramienta (web + extensión + API) que guarda histórico de precios,
BSR, reviews, etc. de todos los productos Amazon. API arranca en ~€19/mes.
Es el dataset base para casi cualquier análisis de mercado Amazon
serio.

**KGR** (Keyword Golden Ratio)
Método de Doug Cunnington para encontrar keywords ultra-fáciles de
rankear. Fórmula: `allintitle(keyword) / volumen_mensual < 0.25` y
`volumen < 250/mes`. Páginas que cumplen KGR rankean en 2-8 semanas en
lugar de 6-12 meses. Volumen chico individual pero stackeable: 200
keywords KGR = mucho tráfico agregado.

**KPI** (Key Performance Indicator)
Métrica que indica salud del negocio. Las nuestras: cashflow mensual
neto, ROI sobre capital invertido, horas operador, % automatización.

## L

**Long-tail keyword**
Keyword de 3+ palabras con volumen bajo pero intención alta. Ejemplo:
"mejores audífonos para correr con menos de 100 dólares" vs. "audífonos"
(head term, super competitivo).

**LLC** (Limited Liability Company)
Tipo de entidad legal en US. Para non-residents, una LLC de un solo
miembro en Wyoming, Delaware o Nuevo México es la opción típica para
e-commerce.

## M

**MOQ** (Minimum Order Quantity)
Cantidad mínima que un proveedor exige por orden. Típico en fábricas
chinas: 500-1000 unidades. Hay proveedores low-MOQ (50-200) que cobran
premium.

## P

**P&L** (Profit and Loss / Estado de Pérdidas y Ganancias)
Reporte financiero: ingresos − costos = utilidad. Lo trackeamos
mensual en `finance/pnl/`.

**PL** (Private Label / Marca propia)
Fabricás o subcontratás un producto con tu propia marca. Opuesto a
revender marcas existentes (wholesale, arbitrage).

**POD** (Print on Demand)
Vos diseñás, el partner (Printify, Printful, Merch by Amazon) imprime
y envía cuando alguien compra. Cero inventario.

**Programmatic SEO**
Estrategia de generar muchas páginas (cientos a miles) automáticamente
desde una base de datos. Cada página apunta a una keyword específica.
Funciona porque Google indexa long-tail y cada página suma. Riesgo: si
el contenido es thin/genérico, Google penaliza el sitio entero.

## R

**ROI** (Return on Investment / Retorno sobre inversión)
Utilidad / capital invertido. Si invertís $1000 y ganás $200, ROI = 20%.

## S

**Search Console** (Google Search Console)
Herramienta gratis de Google que muestra qué keywords envían tráfico a
tu sitio, qué páginas, posición promedio, clicks, impresiones. Es donde
vivimos para entender qué funciona.

**SEM** (Search Engine Marketing)
Tráfico pagado en buscadores (Google Ads, Microsoft Ads). Tu campo de
trabajo actual.

**SEO** (Search Engine Optimization / Optimización para buscadores)
Conseguir tráfico orgánico (no pagado) desde Google y otros buscadores.

**SERP** (Search Engine Results Page)
La página de resultados de Google. "La SERP de X keyword" = el top 10
que aparece cuando alguien busca esa keyword.

**Sitemap**
Archivo XML que le dice a Google qué páginas tiene tu sitio. Se sube a
Search Console. Crítico para sitios con mucho contenido programático.

**SKU** (Stock Keeping Unit / Unidad de Inventario)
Código único que identifica una variante específica de producto.
"camiseta-azul-M" y "camiseta-azul-L" son SKUs distintos.

**SP-API** (Selling Partner API)
API oficial de Amazon para vendedores. Da acceso a ventas, inventario,
ads. Requiere Seller account aprobada y registro como developer.

## T

**ToS / TOS** (Terms of Service)
Términos de uso de una plataforma. Violar el ToS de Amazon es la causa
#1 de suspensión de cuenta.

## W

**W-8BEN / W-8BEN-E**
Formularios IRS que persona natural extranjera (W-8BEN) o entidad
extranjera (W-8BEN-E) presenta a Amazon u otro US payer para declarar
status fiscal y evitar withholding excesivo.
