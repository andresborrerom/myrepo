// Brand-page definitions. Para cada brand con >=2 productos en el catalog,
// definimos slug normalizado, display name, lead copy editorial y FAQs.
//
// Diseño:
//   - El `slug` lo genera `brandSlug()` de forma determinista (lowercase,
//     remueve apóstrofos y diacríticos, reemplaza non-alphanumeric por "-").
//     Lo cacheamos en `BRAND_META` para evitar drift entre páginas y
//     getStaticPaths.
//   - El `brandMatches(name)` normaliza variantes ("DeLonghi" → "De'Longhi")
//     para que el filtro de products agrupe correctamente.
//   - Lead copy: 2-3 párrafos factual, sin superlativos, sin marketing puff.
//     Si una afirmación no es verificable, se omite. Anti-gray-hat: no
//     inventamos history ni testing claims.
//   - FAQs: 4 preguntas head-term branded por brand. Respuestas neutrales
//     ("depends on use case") cuando la respuesta legítima es no-categórica.
//
// Brands con <2 products (single-product brands) NO tienen brand page —
// no hay agrupación útil. Se listan en `SINGLE_PRODUCT_BRANDS` solo a fines
// documentales, para que un futuro mantenedor sepa por qué falta tal marca.

export interface BrandFaq {
  q: string;
  a: string;
}

export interface BrandMeta {
  /** Canonical display name (igual al campo `brand` en el frontmatter). */
  name: string;
  /** URL slug — lowercase, sin apóstrofos, separadores "-". */
  slug: string;
  /** 2-3 párrafos editorial sobre la brand. Tono factual, no marketing. */
  lead: string[];
  /** 3-4 FAQ entries para el bloque "Frequently Asked Questions". */
  faq: BrandFaq[];
  /** Meta description para <head>. ≤160 chars. */
  description: string;
}

/**
 * Brands con ≥2 productos en el catalog. Cada entry genera 1 página en
 * /brands/[slug]/. Si agregás products de una marca nueva y cruzás el
 * umbral de 2, agregá la metadata acá.
 */
export const BRAND_META: BrandMeta[] = [
  {
    name: 'Breville',
    slug: 'breville',
    description:
      'Breville coffee equipment in our catalog: espresso machines from the Bambino through the Oracle, with built-in grinders and Thermojet boilers.',
    lead: [
      "Breville (sold as Sage in the UK and EU) is an Australian appliance manufacturer whose espresso lineup targets home users transitioning from pod or drip machines. The Barista series prioritizes built-in conical grinders and assisted milk steaming at price points below most prosumer machines from Italian manufacturers.",
      "Across the range, Breville uses a non-standard 54mm portafilter rather than the 58mm commercial size, which simplifies in-house parts but limits aftermarket basket and accessory choice. Higher-tier models (Dual Boiler, Oracle) move to 58mm and dual-boiler architecture, closing some of the gap to prosumer machines while keeping the touchscreen UI that defines the line.",
      "Breville positions its machines as approachable: short warm-up times via Thermojet thermocoil, PID temperature control across most of the lineup, and milk wands that range from auto (Bambino Plus) to fully manual (Dual Boiler).",
    ],
    faq: [
      {
        q: 'Where are Breville espresso machines made?',
        a: "Breville is an Australian company; the consumer espresso machines are manufactured in China to Breville's specifications. The brand is sold as Sage in the UK and continental Europe.",
      },
      {
        q: 'Is a Breville espresso machine worth the price?',
        a: "It depends on use case. For users who want short warm-up, PID, and assisted milk texturing in a compact footprint, the Bambino Plus and Barista series are reasonably priced for what they include. Buyers who want a 58mm commercial portafilter, deeper repairability, or commercial-grade build typically look at single-boiler machines from Rancilio, Gaggia, or prosumer Italian brands instead.",
      },
      {
        q: 'How does Breville compare to Gaggia?',
        a: "The Bambino Plus and Gaggia Classic Pro sit near the same price but represent different philosophies. Breville pairs short warm-up and auto milk with a 54mm basket; Gaggia uses a 58mm commercial portafilter and a manual steam wand with a steeper learning curve and a deeper aftermarket. Our head-to-head: /compare/breville-bambino-plus-vs-gaggia-classic-pro/.",
      },
      {
        q: "What's the entry-level Breville espresso machine?",
        a: "The Bambino (no Plus) is the entry point, with a manual steam wand and the same Thermojet boiler as the Bambino Plus. The Bambino Plus adds auto-milk texturing for around $100 more. Below that, Breville sells pod-based machines, which we do not review.",
      },
    ],
  },
  {
    name: 'Gaggia',
    slug: 'gaggia',
    description:
      'Gaggia coffee equipment in our catalog. The Classic Pro and the newer Classic Evo Pro — Milan-built single-boilers with 58mm commercial portafilters.',
    lead: [
      'Gaggia, founded in Milan in 1948, is best known for the Classic — a manual lever-derived semi-automatic that has remained in continuous production for decades. The current Gaggia Classic Pro inherits the chassis and the 58mm commercial portafilter that defined the lineage; the newer Classic Evo Pro variant adds modest material updates without changing the brewing fundamentals.',
      "The Classic line is a single-boiler, no-PID design out of the box. That places the burden of temperature management on the user (or on aftermarket PID kits, of which several are well-documented). In exchange, the machine has a deep parts ecosystem and a community of modifications spanning two decades.",
      "Beyond the Classic, Gaggia sells super-automatic bean-to-cup machines under the same name, but the Classic is the model most cross-shopped against Rancilio Silvia, Lelit Anna, and the Breville Bambino Plus at the sub-$700 tier.",
    ],
    faq: [
      {
        q: 'Where are Gaggia espresso machines made?',
        a: 'The Gaggia Classic Pro and Classic Evo Pro are manufactured in Italy at the Gaggia facility near Milan. Super-automatic models in the broader Gaggia lineup are made in Romania.',
      },
      {
        q: 'Is the Gaggia Classic Pro worth the price?',
        a: 'For users willing to learn manual milk steaming and to manage brew temperature without a PID, the Classic Pro delivers a 58mm commercial portafilter and a repairable chassis at a price most prosumer machines do not match. For users who want plug-and-play results, a Breville Bambino Plus is usually a better fit.',
      },
      {
        q: 'How does the Gaggia Classic Pro compare to the Rancilio Silvia?',
        a: 'Both are sub-$1,000 single-boilers with 58mm portafilters, manual steam wands, and a long mod culture. The Silvia has a thicker brass boiler and a more substantial chassis; the Classic Pro is lighter and cheaper. We cover the trade-offs in /compare/rancilio-silvia-vs-gaggia-classic-for-beginners/.',
      },
      {
        q: 'Is the Classic Evo Pro different from the Classic Pro?',
        a: 'The Evo Pro is an iterative update — revised chassis materials and minor cosmetic changes — rather than a redesign. Brewing performance, boiler, and portafilter dimensions are unchanged.',
      },
    ],
  },
  {
    name: "De'Longhi",
    slug: 'delonghi',
    description:
      "De'Longhi coffee equipment in our catalog: from the entry-level Dedica through the La Specialista and Eletta super-automatics, with thermoblock boilers across the range.",
    lead: [
      "De'Longhi is an Italian appliance maker based in Treviso. The coffee lineup spans pump espresso machines (Dedica, La Specialista), super-automatic bean-to-cup machines (Magnifica, Eletta), and Nespresso pod machines. Within pump espresso, De'Longhi targets the entry and mid tiers with thermoblock heaters and integrated grinders on the higher-spec models.",
      "The La Specialista line introduces a 51mm portafilter with active preinfusion and a Smart Tamping Station, positioning it between the Breville Bambino Plus and the Barista Express in terms of assistance level. Super-automatic models trade barista control for one-touch convenience and a single-piece milk carafe.",
      "The Dedica EC685 is the long-running entry point — a 4.2 cm-wide thermoblock machine that fits in nearly any kitchen and accepts pods or ground coffee via included baskets.",
    ],
    faq: [
      {
        q: "Where are De'Longhi espresso machines made?",
        a: "De'Longhi is headquartered in Treviso, Italy. Manufacturing for the consumer espresso lineup is split between Italian and Romanian facilities depending on the model; the super-automatic Magnifica and Eletta lines are largely produced in Romania.",
      },
      {
        q: "Is a De'Longhi espresso machine worth the price?",
        a: "For users who want pump espresso with minimal setup and a small footprint, the Dedica is reasonably priced. For users prioritizing milk drinks with assistance, the La Specialista line competes with the Breville Barista series. Buyers looking for true prosumer build (saturated group, dedicated steam boiler, 58mm) usually look elsewhere — De'Longhi does not target that segment.",
      },
      {
        q: "How does De'Longhi compare to Breville?",
        a: "Breville and De'Longhi compete most directly in the assisted-milk mid-tier. Breville's Bambino Plus and Barista Pro use Thermojet heating with sub-3-second warm-up; De'Longhi's La Specialista uses a slower thermoblock but offers a Smart Tamping Station and active preinfusion. Portafilter sizes also differ: 54mm (Breville) vs 51mm (De'Longhi La Specialista).",
      },
      {
        q: "What's the entry-level De'Longhi espresso machine?",
        a: 'The Dedica EC685 is the long-standing entry point — a thermoblock pump machine with a manual steam wand at the budget tier. Below that, the lineup moves to pod-based or super-automatic formats, which target a different buyer.',
      },
    ],
  },
  {
    name: 'Rancilio',
    slug: 'rancilio',
    description:
      'Rancilio coffee equipment in our catalog. The Silvia is the long-running home espresso machine that built a generation of self-taught baristas.',
    lead: [
      "Rancilio is an Italian commercial espresso manufacturer based in Parabiago, near Milan. The company is best known in the home market for the Silvia — a single-boiler, single-group machine in continuous production since 1997 that became one of the most-modded home espresso machines on the internet.",
      "The current Silvia (v6) retains the original brass boiler and 58mm commercial portafilter; the Silvia Pro X moves to a dual-boiler architecture, adds PID across both boilers, and positions Rancilio against entry-tier prosumer brands like Lelit and Profitec while keeping the Rancilio name and parts catalog.",
      "Outside the home lineup, Rancilio's commercial machines (Classe series) are common fixtures in independent cafes, which contributes to parts availability and serviceability for the Silvia line.",
    ],
    faq: [
      {
        q: 'Where are Rancilio espresso machines made?',
        a: 'Rancilio manufactures the Silvia line in Italy at the Parabiago facility, alongside its commercial machines. This is the same site that has produced the Silvia continuously since 1997.',
      },
      {
        q: 'Is the Rancilio Silvia worth the price?',
        a: "The Silvia rewards users who want to learn manual milk steaming and dial in brew temperature with surfing or a PID mod. Out of the box, it is a single-boiler with no PID — users who want PID without modding typically step up to the Silvia Pro X or look at Lelit. For users who match the Silvia's intended workflow, the brass boiler and commercial parts make it durable for the price.",
      },
      {
        q: 'How does the Rancilio Silvia compare to the Gaggia Classic Pro?',
        a: 'Both are 58mm single-boilers in the same price band with strong mod communities. The Silvia is heavier with a thicker brass boiler; the Gaggia Classic Pro is lighter and slightly cheaper. We compare them in /compare/rancilio-silvia-vs-gaggia-classic-for-beginners/.',
      },
      {
        q: "What's the entry-level Rancilio espresso machine?",
        a: "The Silvia (v6) is the entry point. Rancilio does not currently sell a sub-Silvia model — buyers looking for cheaper Italian-built espresso typically look at the Gaggia Classic Pro or step into De'Longhi's pump lineup.",
      },
    ],
  },
  {
    name: 'Lelit',
    slug: 'lelit',
    description:
      'Lelit coffee equipment in our catalog. Italian prosumer espresso machines that bridge the gap between the Gaggia Classic and dedicated dual-boilers.',
    lead: [
      "Lelit is an Italian espresso manufacturer based in Castegnato, in the Brescia province. The lineup targets the prosumer home segment with PID-controlled single-boilers (Anna), heat-exchanger machines with E61 group heads (Mara X), and dual-boilers (Bianca) at progressively higher tiers.",
      "The Mara X is the model most associated with the brand in the English-speaking home espresso community — an E61 heat-exchanger machine with an active temperature management system that adjusts boiler pressure based on group temperature, attempting to deliver temperature stability traditionally requiring a dual-boiler.",
      "Below the Mara X, the Anna PL41TEM offers a PID-controlled single-boiler with a 58mm portafilter at a price point near the Gaggia Classic Pro plus a PID mod kit — a useful comparison for buyers cross-shopping the modded-Gaggia route against a factory-PID alternative.",
    ],
    faq: [
      {
        q: 'Where are Lelit espresso machines made?',
        a: 'Lelit manufactures its espresso machines in Italy at the Castegnato facility in the Brescia province.',
      },
      {
        q: 'Is a Lelit espresso machine worth the price?',
        a: 'For users who want a PID-controlled single-boiler or an E61 heat-exchanger from an Italian manufacturer with documented parts availability, Lelit is competitively priced against Profitec and ECM at adjacent tiers. Users who do not need an E61 group or temperature surfing typically stay in the Gaggia / Rancilio / Breville tier instead.',
      },
      {
        q: 'How does the Lelit Mara X compare to a dual-boiler?',
        a: 'The Mara X is a heat-exchanger machine — one boiler serving both brew and steam, with a thermosyphon delivering brew temperature stability via an electronic management system. A true dual-boiler (e.g., Profitec Pro 700, Breville Dual Boiler) provides independent boiler control. The Mara X is smaller, lighter, and lower-priced; dual-boilers offer more headroom for back-to-back milk drinks.',
      },
      {
        q: "What's the entry-level Lelit espresso machine?",
        a: 'The Anna (PL41TEM) is the entry point: a PID-controlled single-boiler with a 58mm portafilter and a manual steam wand. It targets buyers who want PID out of the box without stepping into the heat-exchanger or dual-boiler tiers.',
      },
    ],
  },
  {
    name: 'Eureka',
    slug: 'eureka',
    description:
      'Eureka coffee equipment in our catalog. Italian flat-burr grinders centered on the Mignon platform — Silenzio and Specialita variants.',
    lead: [
      "Eureka is an Italian grinder manufacturer based in Florence, founded in 1920. The home espresso market knows the brand primarily through the Mignon platform — a compact flat-burr grinder with a small footprint and direct-to-portafilter dosing, sold in several variants that differ mainly in burr size, motor specification, and display.",
      "The Mignon Silenzio uses a slower motor for reduced operating noise and 50mm flat burrs; the Specialita keeps the same chassis but pairs it with a faster motor and larger burrs, targeting users grinding multiple shots in sequence. Both share Eureka's stepless adjustment system and the same single-dose-friendly chute geometry.",
      'Beyond the Mignon line, Eureka also makes larger flat-burr grinders (Atom series) for prosumer and commercial use, though the Mignon is the model most cross-shopped against the Niche Zero and Baratza Sette at the home tier.',
    ],
    faq: [
      {
        q: 'Where are Eureka grinders made?',
        a: 'Eureka grinders are manufactured in Italy at the Florence facility, where the company has operated since 1920.',
      },
      {
        q: 'Is a Eureka Mignon worth the price?',
        a: 'For users grinding for espresso daily on a single machine with a single basket size, the Mignon platform offers stepless adjustment, low retention with single-dosing workflow, and a compact footprint. Users grinding for multiple brew methods or who want zero retention typically look at the Niche Zero or DF64 at adjacent prices.',
      },
      {
        q: 'How does the Eureka Specialita compare to the Niche Zero?',
        a: 'The Specialita uses 55mm flat burrs in a chute-fed design; the Niche Zero uses 63mm conical burrs in a single-dose, zero-retention design. The Niche has near-zero retention by design; the Mignon retains a few grams and benefits from purge-shot workflow. Flat vs conical also changes the cup profile — flat tends toward more clarity, conical toward more body. Our comparison: /compare/niche-zero-vs-eureka-mignon-specialita/.',
      },
      {
        q: "What's the entry-level Eureka grinder?",
        a: 'The Mignon Silenzio is the entry point in the espresso-capable lineup. Below that, Eureka does not currently target the budget home tier — buyers in that range typically look at the Baratza Encore ESP or DF64 instead.',
      },
    ],
  },
  {
    name: 'Baratza',
    slug: 'baratza',
    description:
      'Baratza coffee equipment in our catalog: the Encore platform for filter coffee, the Encore ESP variant for entry-level espresso, and the Sette 270 for single-dose espresso workflows.',
    lead: [
      "Baratza is a Seattle-based grinder manufacturer founded in 1999 with a singular focus on home coffee grinding. The company's reputation rests on two design choices: serviceable construction with widely available spare parts, and a customer-support model that ships replacement parts directly to end users instead of routing through retailer warranty.",
      "The Encore is the long-running budget filter grinder; the Encore ESP variant adds finer adjustment steps suitable for espresso pressure ranges. The Sette 270 uses a top-down vertical burr design with sub-second time-based dosing, originally developed in partnership with Etzinger.",
      "Outside the Encore and Sette families, Baratza sells the Virtuoso+ (filter) and Vario+ (espresso-capable) for users wanting more burr surface area, but the three models in our catalog cover the price tiers most home buyers cross-shop.",
    ],
    faq: [
      {
        q: 'Where are Baratza grinders made?',
        a: "Baratza designs in Seattle; manufacturing is contracted out — historically to Taiwan for the Encore platform and to a Liechtenstein-based partner (Etzinger) for the Sette. The serviceable-parts model is Baratza's defining commercial choice regardless of manufacturing geography.",
      },
      {
        q: 'Is a Baratza Encore worth the price?',
        a: "For filter coffee and pour-over, the Encore is widely cited as a reasonable entry-tier grinder with the parts and support infrastructure to keep it running for years. For espresso, the standard Encore lacks the fine-adjustment range — buyers grinding for espresso should look at the Encore ESP or step up to the Sette.",
      },
      {
        q: 'How does the Baratza Encore ESP compare to the Sette 270?',
        a: 'The Encore ESP shares the chassis and conical burrs of the standard Encore with added espresso-range adjustment; the Sette 270 uses a different burr architecture (top-down conical) with near-zero retention and time-based dosing. The Sette costs roughly 2x more and targets single-dose espresso users specifically. Our comparison: /compare/baratza-encore-esp-vs-baratza-sette-270/.',
      },
      {
        q: "What's the entry-level Baratza grinder for espresso?",
        a: 'The Encore ESP is the entry point for espresso specifically. The standard Encore can do filter and coarser brew methods but does not have the fine adjustment range for consistent espresso extraction.',
      },
    ],
  },
  {
    name: 'Fellow',
    slug: 'fellow',
    description:
      'Fellow coffee equipment in our catalog: the Ode Gen 2 and Opus grinders, plus the Stagg EKG variable-temperature kettle.',
    lead: [
      "Fellow is a San Francisco design-led coffee equipment company founded in 2013. The lineup is built around aesthetics-first hardware for pour-over and filter coffee — variable-temperature kettles, flat-burr filter grinders, and brewing accessories — with a smaller espresso footprint than competitors at adjacent prices.",
      "The Ode Gen 2 is the filter grinder anchor — a 64mm flat-burr grinder designed specifically for brewed coffee (not espresso). The Opus moves to all-purpose burrs that can grind espresso-fine, though espresso-focused users typically prefer dedicated espresso grinders for retention and adjustment precision.",
      "The Stagg EKG is the variable-temperature kettle most commonly cited by pour-over users in our catalog. The brewing fundamentals — gooseneck spout geometry and 1-degree temperature control — overlap with kettles from Brewista and OXO, but the Stagg uses a more compact 0.9L capacity tuned for single-server brewing.",
    ],
    faq: [
      {
        q: 'Where is Fellow coffee equipment made?',
        a: 'Fellow designs in San Francisco; manufacturing is contracted out to factories in China, which is standard for the consumer coffee accessories category. The brand has not publicly committed to specific factory partners.',
      },
      {
        q: 'Is Fellow coffee equipment worth the price?',
        a: 'For users who value industrial design and small-batch pour-over workflows, Fellow products tend to price at a modest premium over functionally comparable alternatives (Brewista kettles, Baratza filter grinders). For users prioritizing pure brewing performance per dollar, the alternatives often match or exceed the Fellow equivalent.',
      },
      {
        q: 'How does the Fellow Ode Gen 2 compare to the Baratza Encore?',
        a: 'The Ode Gen 2 uses 64mm flat burrs vs the Encore conical burrs and costs roughly 3x more. The Ode targets users who want flat-burr clarity in filter coffee and are willing to pay for the larger burr surface area. The Encore remains the entry-tier reference at its price point.',
      },
      {
        q: "What's the entry-level Fellow product?",
        a: 'The Opus is the entry-tier grinder; the Stagg EKG is the entry-tier kettle in the Fellow lineup. Fellow does not currently sell sub-$100 brewers or grinders.',
      },
    ],
  },
  {
    name: 'Normcore',
    slug: 'normcore',
    description:
      'Normcore coffee accessories in our catalog: WDT tools, tampers in 54mm and 58mm, and puck screens for espresso preparation.',
    lead: [
      "Normcore is an accessories-focused brand that sells espresso preparation tools — WDT (Weiss Distribution Technique) tools, calibrated tampers, puck screens, and dosing funnels — primarily through direct e-commerce and Amazon. The lineup targets home baristas standardizing their puck prep without stepping up to artisan-machined accessories from brands like Decent or Pesado.",
      "Across the catalog, Normcore covers both 54mm (Breville) and 58mm (commercial standard) basket diameters, which makes the brand useful for home users on Breville machines who want quality accessories without size mismatch.",
      "The brand does not manufacture espresso machines or grinders — pure accessories play. The pricing typically undercuts artisan equivalents while exceeding generic Amazon offerings on tolerances and finish.",
    ],
    faq: [
      {
        q: 'Where are Normcore accessories made?',
        a: 'Normcore products are manufactured in China. The brand sells direct-to-consumer through its website and Amazon storefronts.',
      },
      {
        q: 'Are Normcore tampers and WDT tools worth the price?',
        a: 'For home baristas standardizing puck prep, Normcore covers the mid-tier between generic Amazon tools and artisan-machined alternatives. Tolerances are tighter than the generic tier; finish and material choices fall short of artisan-machined accessories. For most users this is the reasonable price-to-performance spot.',
      },
      {
        q: 'Does Normcore make 54mm accessories for Breville machines?',
        a: 'Yes. The lineup includes 54mm tampers, WDT tools, and puck screens compatible with the Breville Bambino, Barista, and Infuser series. This is one of the differentiators against brands that ship 58mm-only.',
      },
      {
        q: 'What does Normcore not sell?',
        a: 'Normcore does not manufacture espresso machines, grinders, or brewing devices. The catalog is limited to preparation accessories.',
      },
    ],
  },
  {
    name: 'Rattleware',
    slug: 'rattleware',
    description:
      'Rattleware coffee accessories in our catalog: milk pitchers, knock boxes, and shot-time thermometers — the cafe-standard accessory line distributed by Mahlkonig.',
    lead: [
      "Rattleware is an accessories brand acquired by Mahlkonig in 2014 and now distributed alongside Mahlkonig's commercial grinder lineup. The products in our catalog — milk pitchers, knock boxes, milk thermometers — are common fixtures in independent cafes and serve home users looking for cafe-standard accessories without the artisan-tier price.",
      "The 12oz milk pitcher is the model most cited by home baristas working with 6oz cappuccino and 8oz latte volumes; the knock box short variant fits in counter footprints where a full-height knock box would not.",
      "The brand does not sell espresso machines or grinders directly. As a Mahlkonig sub-brand, the accessories share distribution with commercial-grade grinders, which is part of why availability is steady through specialty channels.",
    ],
    faq: [
      {
        q: 'Where are Rattleware accessories made?',
        a: 'Rattleware products are manufactured in China and distributed by Mahlkonig (Hemro Group) since the 2014 acquisition. The brand was originally founded in San Francisco in 1999.',
      },
      {
        q: 'Are Rattleware accessories worth the price?',
        a: "For users who want a cafe-tested milk pitcher or knock box at home, Rattleware sits between budget Amazon options and artisan-grade equivalents. The build is consistent and the dimensions match what cafes use. Users buying their first pitcher generally get more from the Rattleware line than from generic alternatives.",
      },
      {
        q: 'How does Rattleware compare to Joe Frex for accessories?',
        a: 'Both target the cafe-accessory tier. Rattleware has the wider distribution and the longer track record; Joe Frex (a German brand) tends toward slightly more polished finishes on the pitchers but a narrower catalog. Functionally, both lines are above generic Amazon and below artisan tiers.',
      },
      {
        q: 'What pitcher size is right for home espresso?',
        a: 'The 12oz pitcher fits 6oz cappuccino volumes; the 20oz handles 8-12oz latte volumes and back-to-back drinks. Home users with a single milk drink at a time typically pick the 12oz; users making two drinks back-to-back move up to 20oz.',
      },
    ],
  },
  {
    name: 'Joe Frex',
    slug: 'joe-frex',
    description:
      'Joe Frex coffee accessories in our catalog: knock boxes and milk pitchers from the German espresso-accessory brand.',
    lead: [
      "Joe Frex is a German espresso-accessory brand based in Hamburg, manufacturing tampers, milk pitchers, knock boxes, and tamping mats targeted at the cafe and committed-home segment. The product range is narrower than Normcore or Rattleware but the finishes tend to be slightly more polished — visible weld seams are absent on the pitchers, and the knock-box rubber bars are machined to tighter tolerances.",
      "In our catalog, Joe Frex is represented by the Knock Box Mini (small-footprint counter knock box) and the 20oz milk pitcher (back-to-back milk drink capacity). Both target home users who want cafe-grade accessories without stepping up to artisan-machined equivalents.",
      "The brand does not manufacture espresso machines or grinders. Distribution in the US is primarily through specialty resellers and Amazon.",
    ],
    faq: [
      {
        q: 'Where are Joe Frex accessories made?',
        a: 'Joe Frex is a German brand headquartered in Hamburg. Manufacturing of the accessories is contracted out to factories in Asia, which is standard across the consumer espresso-accessory category.',
      },
      {
        q: 'Are Joe Frex accessories worth the price?',
        a: 'For users prioritizing finish quality on pitchers and knock boxes, Joe Frex tends to edge out Rattleware on weld seams and surface tolerance at a similar price. For users prioritizing catalog breadth (more sizes, more colors), Rattleware has the wider range.',
      },
      {
        q: 'How does Joe Frex compare to Rattleware?',
        a: 'Both target the cafe-accessory tier. Joe Frex generally has more polished finishes on pitchers; Rattleware has wider US distribution and a deeper catalog. Functionally, the two are very close at the same price point.',
      },
      {
        q: 'Does Joe Frex sell espresso machines or grinders?',
        a: 'No. The catalog is limited to preparation and post-extraction accessories — pitchers, knock boxes, tampers, tamping mats, and similar.',
      },
    ],
  },
  {
    name: 'Cafelat',
    slug: 'cafelat',
    description:
      'Cafelat coffee equipment in our catalog: the Robot manual lever espresso machine and the Knock Tube knock-box variant.',
    lead: [
      "Cafelat is a Hong Kong-based company founded by Paul Pratt, an espresso-machine technician with a long history in commercial repair. The brand is best known for the Robot — a manual lever espresso machine that produces 9-bar shots without electricity, a heating element, or a pump — and for a range of well-regarded silicone group head gaskets and accessories sold under the same name.",
      "The Robot occupies an unusual position in the home espresso market: pressure comes from the user's arms pressing two levers, water heat comes from a separate kettle, and the only moving parts are the levers and the portafilter assembly. This makes the Robot durable, repairable, and inexpensive to ship internationally — but it also means the learning curve is different from any pump machine in the catalog.",
      "Beyond the Robot, the brand's gaskets and tamping mats are commonly cited as upgrade parts for other manufacturers' machines.",
    ],
    faq: [
      {
        q: 'Where are Cafelat products made?',
        a: 'Cafelat is headquartered in Hong Kong. The Robot espresso machine is manufactured in mainland China to Cafelat specifications. Smaller accessories (gaskets, mats) share the same supply chain.',
      },
      {
        q: 'Is the Cafelat Robot worth the price?',
        a: 'For users willing to heat water on a separate kettle and to press the shot manually, the Robot delivers genuine 9-bar espresso with no electricity and almost zero serviceable parts to fail. For users who want plug-and-play results or who make milk drinks (the Robot has no steam wand), a pump machine is the better fit.',
      },
      {
        q: 'How does the Cafelat Robot compare to the Flair 58?',
        a: 'Both are manual lever machines without pumps. The Flair 58 uses a 58mm commercial portafilter and a pre-heating water reservoir; the Robot uses a 58mm naked portafilter and an external kettle. The Flair has more refined temperature management; the Robot is mechanically simpler and lower-priced. Users prioritizing portability often pick the Robot; users prioritizing temperature control often pick the Flair.',
      },
      {
        q: 'Does the Cafelat Robot have a steam wand?',
        a: 'No. The Robot is brewing-only. Users making milk drinks pair it with a separate milk frother (manual or electric) or step up to a pump machine with a steam wand.',
      },
    ],
  },
  {
    name: 'Flair',
    slug: 'flair',
    description:
      'Flair coffee equipment in our catalog: the Classic Signature and Flair 58 manual lever espresso machines.',
    lead: [
      "Flair Espresso is a US-based manufacturer (Boise, Idaho) that designs portable manual lever espresso machines. The lineup spans the Classic Signature (entry-level, 50mm basket) through the Flair 58 (58mm commercial portafilter, pre-heating water reservoir) — all electric-free, pump-free machines that rely on a hand-operated lever for the brew pressure.",
      'The Flair 58 differentiates from the Classic by adopting a commercial 58mm portafilter, a heating element in the brew chamber for active temperature management, and a pressure gauge on the lever. The Classic Signature remains the entry point for users wanting to try lever espresso without committing to the higher tier.',
      "Like Cafelat with the Robot, Flair targets a buyer who values portability, repairability, and lever-driven control. The brand does not produce pump espresso machines or steam wands — milk drinks require a separate milk frother.",
    ],
    faq: [
      {
        q: 'Where are Flair espresso machines made?',
        a: 'Flair is headquartered in Boise, Idaho, with manufacturing contracted to factories in Asia. The brand handles design and quality control from the US.',
      },
      {
        q: 'Is a Flair espresso machine worth the price?',
        a: 'For users who want genuine 9-bar espresso without electricity, who travel with their equipment, or who value mechanical simplicity, the Flair lineup is competitively priced. For users who make milk drinks regularly or want shot-after-shot speed, a pump machine with a steam wand is the better fit.',
      },
      {
        q: 'How does the Flair 58 compare to the Cafelat Robot?',
        a: 'Both are manual lever machines with no pump and no electricity required (Flair 58 has an optional heating element). The Flair 58 has a pre-heating water reservoir and an active heating element for temperature management; the Robot uses an external kettle. The Flair has more refined temperature control; the Robot is mechanically simpler and lower-priced.',
      },
      {
        q: "What's the entry-level Flair espresso machine?",
        a: 'The Classic Signature is the entry point — a 50mm-basket manual lever with no heating element, suitable for users who want to learn lever extraction at a lower price before committing to the Flair 58.',
      },
    ],
  },
];

/**
 * Single-product brands. NO generan brand page — un solo producto no
 * constituye agrupación útil. Lista documental para que un futuro
 * mantenedor sepa qué falta y por qué.
 */
export const SINGLE_PRODUCT_BRANDS = [
  '1Zpresso',
  'Acaia',
  'AeroPress',
  'Ascaso',
  'Bellman',
  'Bialetti',
  'Bodum',
  'Bplus',
  'Casabrews',
  'Chemex',
  'Comandante',
  'DF64',
  'ECM',
  'Espro',
  'Hario',
  'Kalita',
  'La Marzocco',
  'Mahlkonig',
  'Niche',
  'OXO',
  'Profitec',
  'Rocket Espresso',
  'Technivorm',
  'Timemore',
  'Urnex',
  'Wilfa',
];

/**
 * Normaliza una string de brand a su slug canónico. Si la brand no
 * tiene metadata definida (single-product brand o brand nueva), genera
 * un slug derivado.
 */
export function brandSlug(brandName: string): string {
  const meta = BRAND_META.find((b) => b.name === brandName);
  if (meta) return meta.slug;
  return brandName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/['`’]/g, '') // strip apostrophes (DeLonghi ↔ De'Longhi)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Devuelve el BrandMeta para una brand name dada, o null si la brand no
 * tiene página (single-product). Útil para related-content que linkea
 * desde product pages a la brand page.
 */
export function brandMetaFor(brandName: string): BrandMeta | null {
  return BRAND_META.find((b) => b.name === brandName) ?? null;
}
