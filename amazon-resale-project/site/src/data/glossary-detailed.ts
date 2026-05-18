// Glossary detailed pages — páginas dedicadas tipo /glossary/[slug]/ para
// los head terms más buscados ("what is X" queries).
//
// Diseño:
//   - Cada entry tiene `slug` que matchea uno del GLOSSARY base
//     (src/data/glossary.ts). Esto permite al autolink script priorizar
//     /glossary/[slug]/ sobre /glossary/#slug cuando hay entry detallado.
//   - `tldr` es la respuesta corta highlighted al tope (suele ser idéntico
//     o muy cercano a `definition` del glossary base).
//   - `inDepth` son secciones de prosa (heading + body HTML) — 300-600
//     palabras totales. Anti-gray-hat: cuando el término es debated en la
//     comunidad (flat vs conical, etc.) reflejamos el debate honestly.
//   - `examples` son ASINs del catalog que ilustran el feature. Se
//     resuelven al name + URL en el template.
//   - `faqs` son 4-6 Q&A reales que la gente pregunta.
//   - `relatedTermSlugs` son slugs de otros entries del glossary (base o
//     detallado) — el template prefiere la página dedicada si existe.
//   - `relatedHowToSlugs` / `relatedTroubleshootSlugs` / `relatedBestSlugs`
//     son links a guides existentes que mencionan el término.

export interface GlossaryDetailedSection {
  /** H2 / H3 heading natural ("Why PID matters", "Flat vs conical debate"). */
  heading: string;
  /** Body HTML — 1-4 párrafos. Permite <p>, <ul>, <strong>, <em>, <a>. */
  body: string;
}

export interface GlossaryDetailedExample {
  /** ASIN existente en src/content/products/. Validado en build. */
  asin: string;
  /** 1-2 oraciones — por qué este producto ilustra el término. */
  note: string;
}

export interface GlossaryDetailedFaq {
  question: string;
  answer: string;
}

export interface GlossaryDetailedPage {
  /** Matches glossary entry slug en src/data/glossary.ts. */
  slug: string;
  /** SEO <title>. Mantener natural ("What is a PID controller in espresso?"). */
  title: string;
  /** Meta description ≤160 chars. */
  description: string;
  /** Heading principal (H1) — natural phrasing en inglés. */
  h1: string;
  /** Answer corta arriba (1-3 oraciones). Highlighted en TL;DR box. */
  tldr: string;
  /** Secciones in-depth ordenadas. */
  inDepth: GlossaryDetailedSection[];
  /** 2-4 productos del catalog que ilustran el término. */
  examples: GlossaryDetailedExample[];
  /** 4-6 preguntas reales. */
  faqs: GlossaryDetailedFaq[];
  /** Otros slugs del glossary (anchors o detailed pages). */
  relatedTermSlugs: string[];
  /** Best-of pages que mencionan el término (opcional). */
  relatedBestSlugs?: string[];
  /** How-to slugs (opcional). */
  relatedHowToSlugs?: string[];
  /** Troubleshoot slugs (opcional). */
  relatedTroubleshootSlugs?: string[];
  /** ISO date de la última revisión. */
  updatedAt: string;
}

// El set inicial: 12 head terms con la mayor masa de "what is X" intent.
// Selección basada en (a) frecuencia esperada de búsqueda informacional,
// (b) profundidad disponible para 600-1500 palabras totales por página
// sin rellenar, (c) relevancia para nuestro catalog (productos donde el
// feature es decisorio), (d) anclaje en el autolink script existente.
export const GLOSSARY_DETAILED: GlossaryDetailedPage[] = [
  // -------------------------------------------------------------------
  // 1. PID CONTROLLER — la query más típica del nicho sub-$1k.
  // -------------------------------------------------------------------
  {
    slug: 'pid-controller',
    title: 'What is a PID controller in espresso? — Coffee Equipment Reviews',
    description:
      'PID controllers hold an espresso boiler within ±1°C of a target. Plain-English explanation, when it matters, machines that have it, and whether the upgrade is worth it.',
    h1: 'What is a PID controller in an espresso machine?',
    tldr:
      'A PID (proportional-integral-derivative) controller is a small circuit that holds your espresso machine\'s boiler within roughly ±1°C of a target temperature. It replaces the simple on/off thermostat found on cheaper machines, and it is the single highest-impact specification under $1,000 for shot consistency.',
    inDepth: [
      {
        heading: 'How a PID actually works',
        body:
          '<p>A standard thermostat is a switch: when boiler water cools below a setpoint, the heater turns on; when it rises above, the heater turns off. The temperature in the boiler oscillates within a wider band — often ±5°C or more — because the heater\'s thermal inertia overshoots the target in both directions.</p>'
          + '<p>A PID controller samples the boiler temperature many times per second and modulates power to the heating element using three terms: the current error (proportional), the accumulated error over time (integral), and the rate of change (derivative). The output is a duty cycle that lands much closer to setpoint with much smaller oscillation — typically ±1°C in a well-tuned consumer machine.</p>',
      },
      {
        heading: 'Why temperature stability matters for espresso',
        body:
          '<p>Espresso extraction is sensitive to brew temperature. A 2°C swing changes the solubility of compounds in the puck: cooler shots extract less acidity and more bright fruit notes; hotter shots pull more bitterness and body. Without a PID, you compensate for boiler drift by guessing at grind adjustments shot-to-shot, which only partially recovers the loss.</p>'
          + '<p>Practically: with a PID you can dial in a recipe (grind + dose + time + temp) once, and reproduce it the next morning. Without one, you re-dial every session — which is fine if you enjoy the ritual, but tedious if you just want the same drink twice.</p>',
      },
      {
        heading: 'Built-in vs aftermarket PID',
        body:
          '<p>Many sub-$1,000 machines ship with PID stock today (Breville Bambino Plus, Barista Pro, Gaggia Classic Evo Pro, ECM Classika PID). A few popular older designs do not (Gaggia Classic Pro, Rancilio Silvia V6); both have well-supported aftermarket PID kits in the $80-150 range that drop in with intermediate DIY skill.</p>'
          + '<p>A PID kit on a Gaggia Classic Pro or Rancilio Silvia transforms shot consistency more than any other single mod — most owners describe it as the cheapest upgrade with the largest visible result. The trade-off is the install (an hour of soldering or quick-connect splicing) and the warranty implications of opening the case.</p>',
      },
      {
        heading: 'When PID does not buy you much',
        body:
          '<p>If you are pulling shots from a thermoblock-driven machine (most entry Breville and De\'Longhi units), PID controls flow-through water temperature but cannot fix the lower thermal mass of the design. Back-to-back shots still drift more than on a boilered machine with PID.</p>'
          + '<p>Super-automatic machines also tend to ship with PID-style controls baked in (they have to — pre-ground puck delivery is built around a fixed recipe). The spec is therefore most decisive when comparing semi-automatic machines without it (cheap thermoblocks, older Silvia/Classic generations) against the PID-equipped tier above them.</p>',
      },
    ],
    examples: [
      {
        asin: 'B0B5BC5VXM',
        note:
          'The Gaggia Classic Evo Pro is the post-2019 revision of the iconic Classic with PID and a 3-way solenoid added at the factory, removing the two biggest aftermarket mods that owners used to do themselves.',
      },
      {
        asin: 'B07BJ4HT4P',
        note:
          'The ECM Classika PID is a single-boiler prosumer machine where the PID is the named feature — temperature stability + E61 group head for shot-to-shot repeatability at the lower end of the prosumer tier.',
      },
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus pairs PID-style control with a Thermojet thermocoil — fast warm-up but lower thermal mass than a boilered design. Good example of PID being a necessary-but-not-sufficient spec.',
      },
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro is the most popular aftermarket-PID candidate: stock it ships without PID, but $100 kits (MeCoffee, Auber) transform shot consistency dramatically.',
      },
    ],
    faqs: [
      {
        question: 'Is a PID worth the extra $100-200 over a non-PID machine?',
        answer:
          'For most home users pulling more than two shots a week, yes — PID is the single highest-impact spec for consistency in the sub-$1,000 segment. If you brew once or twice a month or only pull milk drinks where temperature precision matters less, the upgrade is harder to justify.',
      },
      {
        question: 'Can I add a PID to my older Gaggia Classic or Rancilio Silvia?',
        answer:
          'Yes. MeCoffee, Auber, and several other vendors sell $80-150 kits that install in 30-90 minutes with basic electrical skills. The Gaggia Classic Pro and Rancilio Silvia V6 are the two most common candidates and have step-by-step community guides.',
      },
      {
        question: 'Does PID change brew temperature, or just hold it steady?',
        answer:
          'Both, depending on the implementation. Stock PID kits hold the factory setpoint; programmable PIDs let you adjust setpoint by 1-2°C for lighter or darker roasts. Most users land within the 90-94°C range regardless.',
      },
      {
        question: 'How is PID different from "temperature control" on a thermoblock machine?',
        answer:
          'On a thermoblock (Breville Bambino, De\'Longhi Dedica), the heater is in-line with the water flow, so software-controlled flow temperature can be tight even without classic PID. The trade-off is lower thermal mass: rapid sequential shots drift more than a boilered machine with PID would.',
      },
      {
        question: 'Does PID help with milk steaming?',
        answer:
          'PID on the steam boiler keeps steam pressure more consistent, which helps with predictable milk texturing — but it is less decisive than for brewing. Manual technique still dominates milk results.',
      },
    ],
    relatedTermSlugs: ['boiler', 'thermoblock', 'single-boiler', 'dual-boiler', 'extraction'],
    relatedBestSlugs: [
      'best-espresso-machine-under-1000-with-pid',
      'best-espresso-machine-under-500',
    ],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 2. DUAL BOILER — boiler architecture, decisión clave en $1k-2k.
  // -------------------------------------------------------------------
  {
    slug: 'dual-boiler',
    title: 'What is a dual boiler espresso machine? — Coffee Equipment Reviews',
    description:
      'Dual-boiler espresso machines have separate brew and steam boilers. Plain explanation of why this matters, who benefits, and how dual boilers compare with HX and single-boiler designs.',
    h1: 'What is a dual boiler espresso machine?',
    tldr:
      'A dual-boiler espresso machine has two independent boilers — one held at brew temperature (~93°C) and one at steam temperature (~130°C) — so you can pull a shot and steam milk at the same time, with stable temperature on both sides.',
    inDepth: [
      {
        heading: 'Why two boilers',
        body:
          '<p>Single-boiler machines have to choose: heat water to brew temperature for the shot, or heat it to steam temperature for milk. The user flips a switch and waits 30-60 seconds for the boiler to ramp up between the two. That delay is fine for a single solo flat white, painful for a family making three drinks in a row.</p>'
          + '<p>Dual boilers solve the workflow problem mechanically: brew boiler stays at brew temp, steam boiler stays at steam temp, both ready continuously. You can be steaming milk for cup two while shot one is dripping. This is the workflow most cafés and serious home users want.</p>',
      },
      {
        heading: 'Dual boiler vs heat exchanger',
        body:
          '<p>A heat exchanger (HX) machine accomplishes similar parallel workflow with one boiler held at steam temperature, plus a thin water coil that runs through the steam boiler picking up brew-temperature water on its way to the group. HX machines (Rocket Appartamento, Lelit Mara X, ECM Classika HX) cost $300-800 less than equivalent dual boilers.</p>'
          + '<p>Trade-offs: HX brew temperature is less precisely controlled — the first shot of the day is too hot and needs a "cooling flush" to reset coil water. Dual boilers eliminate the flush and let you set brew temperature precisely with PID. For light roasts and shot-to-shot consistency, dual boilers have a measurable edge. For dark roasts and casual users, HX is hard to fault.</p>',
      },
      {
        heading: 'What dual boiler does not solve',
        body:
          '<p>Dual boiler is a workflow and temperature-stability feature. It does not fix:</p>'
          + '<ul>'
          + '<li><strong>Bad grinder pairing</strong> — a dual-boiler machine with a $40 blade grinder will still produce bad shots. The grinder is the more decisive piece.</li>'
          + '<li><strong>Untrained milk technique</strong> — more available steam pressure lets you make worse latte art faster if your stretch-and-spin technique is off.</li>'
          + '<li><strong>Light-roast extraction</strong> — flow control or pressure profiling matters more than dual boiler for the hardest light roasts.</li>'
          + '</ul>',
      },
      {
        heading: 'When to choose dual boiler',
        body:
          '<p>Dual boiler makes sense when (a) you regularly make 2+ back-to-back milk drinks, (b) you are dialing light or single-origin roasts where 0.5°C precision matters, or (c) the parallel-workflow ergonomics actively make you brew more often. For one cup of espresso a day, a single-boiler machine with PID achieves the same cup quality at $600-1,500 less.</p>',
      },
    ],
    examples: [
      {
        asin: 'B00CSAYE9W',
        note:
          'The Breville Dual Boiler BES920XL is the canonical mid-tier dual boiler — full PID on both sides, programmable shot temperature, and a saturated brew group, at roughly half the price of a Profitec or ECM dual boiler.',
      },
      {
        asin: 'B07D8YHHG9',
        note:
          'The Profitec Pro 300 is a German-made dual boiler with E61 group head — prosumer materials and serviceability, parallel-workflow ergonomics, no shot programming.',
      },
      {
        asin: 'B09F2HFGHN',
        note:
          'The Rancilio Silvia Pro X is the dual-boiler evolution of the iconic single-boiler Silvia — adds parallel workflow + adjustable brew temperature while keeping the commercial 58mm group and stout build.',
      },
      {
        asin: 'B07PYTQ8YN',
        note:
          'The La Marzocco Linea Mini uses saturated dual boilers — the gold-standard architecture from the commercial side, with brew water sitting inside the brew boiler for maximum thermal stability.',
      },
    ],
    faqs: [
      {
        question: 'Is dual boiler worth the price premium over heat exchanger?',
        answer:
          'For light roasts and serious dialing, yes — the temperature precision is measurable. For dark roasts and the "I want a flat white in the morning" use case, a heat exchanger at $500-800 less is hard to fault.',
      },
      {
        question: 'How long does a dual boiler take to warm up?',
        answer:
          'Typically 15-25 minutes for a prosumer dual boiler with E61 group. Breville Dual Boiler is faster (about 8 minutes) because the brew boiler is smaller and there is no thermosiphon group to heat soak.',
      },
      {
        question: 'Can I steam and brew at the same time on a dual boiler?',
        answer:
          'Yes — that is the headline feature. The two boilers operate independently, so a long steaming session does not affect brew temperature and vice versa.',
      },
      {
        question: 'Are dual boilers harder to maintain?',
        answer:
          'Modestly. You descale two boilers instead of one, and many dual boilers have a separate steam boiler safety valve that needs occasional cleaning. Owners report no major reliability difference vs single boilers at the same price tier.',
      },
      {
        question: 'What is "saturated group" and is it different from dual boiler?',
        answer:
          'A saturated group means the brew group head is integral with the brew boiler — water sits in the group full-time at brew temperature. La Marzocco and some ECM machines use saturated groups for ultimate thermal stability. Most home dual boilers use heat-exchanger or thermosiphon groups instead.',
      },
    ],
    relatedTermSlugs: ['boiler', 'single-boiler', 'heat-exchanger', 'pid-controller', 'e61-group'],
    relatedBestSlugs: ['best-dual-boiler-espresso-machine', 'best-prosumer-espresso-machine-under-2000'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 3. HEAT EXCHANGER — mid-tier prosumer architecture.
  // -------------------------------------------------------------------
  {
    slug: 'heat-exchanger',
    title: 'What is a heat exchanger (HX) espresso machine? — Coffee Equipment Reviews',
    description:
      'Heat-exchanger machines pull brew water through a coil inside a steam boiler. Plain explanation, the cooling-flush trade-off, and where HX fits between single-boiler and dual-boiler.',
    h1: 'What is a heat exchanger espresso machine?',
    tldr:
      'A heat-exchanger (HX) espresso machine has one steam boiler held at ~125°C with a thin water coil running through it. Brew water flows through the coil on demand, picking up brew temperature on its way to the group head — so you can brew and steam in parallel from a single boiler.',
    inDepth: [
      {
        heading: 'How HX works mechanically',
        body:
          '<p>Inside an HX boiler is a tube — usually copper or stainless — that carries cold tank water through the boiler chamber. The boiler itself is held at steam temperature; the tube water heats by conduction as it travels. Length and diameter of the tube are tuned so that water exits the boiler at brew temperature when flow rate matches a normal shot.</p>'
          + '<p>The clever part is that this happens passively. There is no second boiler, no second heating element, no PID on the brew side — the architecture itself delivers brew-temperature water alongside steam-temperature water from one tank.</p>',
      },
      {
        heading: 'The cooling-flush ritual',
        body:
          '<p>HX has a real flaw: when no water is flowing, the tube water sits inside the steam boiler and heats above brew temperature — sometimes above 100°C. The first shot of the morning, or any shot after a long idle, can be 5-10°C too hot, which scorches the puck and produces a bitter shot.</p>'
          + '<p>The standard fix is a "cooling flush" — pull 50-100ml of water through the group head before the shot to flush the over-temperature water out of the coil. Owners learn to read the time-since-last-shot vs flush-length relationship intuitively. Some HX machines (Lelit Mara X) implement automated electronic cooling cycles to remove the variable.</p>',
      },
      {
        heading: 'HX vs single boiler vs dual boiler',
        body:
          '<p>The three architectures sit on a price-vs-workflow ladder:</p>'
          + '<ul>'
          + '<li><strong>Single boiler with PID</strong> — $400-1,200. Brew and steam alternate. Temperature stability excellent. One-cup user.</li>'
          + '<li><strong>Heat exchanger</strong> — $1,200-2,500. Parallel brew + steam. Temperature stability good (with cooling flush). Two-cup user.</li>'
          + '<li><strong>Dual boiler</strong> — $1,800-4,500+. Parallel brew + steam. Temperature stability excellent (no flush). Light-roast user.</li>'
          + '</ul>'
          + '<p>HX is the architecture for someone who wants a real espresso bar in their kitchen, makes 2-3 drinks at a time, and is happy to learn the flush rhythm rather than pay $500-1,500 more for the dual-boiler convenience.</p>',
      },
      {
        heading: 'Service and longevity',
        body:
          '<p>HX boilers (and the E61 groups they typically pair with) are extraordinarily serviceable — most parts are commodity items shared across Italian prosumer brands. A well-maintained HX machine often outlives multiple generations of plastic-bodied entry machines. Trade-off: heavier (15-20 kg), bigger footprint, slower warm-up (25-40 minutes for full thermal soak of the E61 group).</p>',
      },
    ],
    examples: [
      {
        asin: 'B01N6DZJVQ',
        note:
          'The Rocket Appartamento is the entry to prosumer HX — Italian-made, E61 group, copper-and-brass internals, with the cooling flush as part of the daily ritual.',
      },
      {
        asin: 'B08FZB7N9V',
        note:
          'The Lelit Mara X uses electronic temperature management on the HX coil to minimize the cooling flush — one of the smartest implementations of the architecture for users who want HX without the flush guesswork.',
      },
    ],
    faqs: [
      {
        question: 'Do I really have to do a cooling flush every shot?',
        answer:
          'Only when the machine has been idle for more than 15-30 minutes. Mid-session, the coil water turns over fast enough that flushing is unnecessary. The Lelit Mara X minimizes the flush requirement electronically.',
      },
      {
        question: 'How long is the cooling flush?',
        answer:
          'Typically 5-20 seconds for a first-of-morning shot, until the water exiting the group feels at-temperature (no longer hissing-hot to the touch). Owners learn the rhythm within a week of ownership.',
      },
      {
        question: 'Is HX dying out as a category?',
        answer:
          'No, but it has narrowed. As dual-boiler prices fall and entry single-boiler+PID machines improve, HX occupies a smaller niche than it did 15 years ago. The Italian prosumer brands still make HX their core lineup.',
      },
      {
        question: 'Can I add PID to an HX machine?',
        answer:
          'Yes, several brands sell PID kits for HX boilers. The PID controls steam-boiler temperature, which indirectly controls brew temperature via the coil. The effect is smaller than PID on a dedicated brew boiler but still measurable.',
      },
      {
        question: 'Does HX work well with light roasts?',
        answer:
          'It can, but you have to dial the flush precisely to land brew temperature at the high end (95-96°C) where light roasts extract well. Dual boiler is easier for light roasts because brew temperature is set directly.',
      },
    ],
    relatedTermSlugs: ['boiler', 'dual-boiler', 'single-boiler', 'e61-group', 'pid-controller'],
    relatedBestSlugs: ['best-prosumer-espresso-machine-under-2000'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 4. SINGLE BOILER — entry tier, important explainer.
  // -------------------------------------------------------------------
  {
    slug: 'single-boiler',
    title: 'What is a single-boiler espresso machine? — Coffee Equipment Reviews',
    description:
      'Single-boiler espresso machines switch between brew and steam temperature. Plain explanation of the workflow, when it is enough, and where the architecture stops working.',
    h1: 'What is a single-boiler espresso machine?',
    tldr:
      'A single-boiler espresso machine has one boiler that switches between brew temperature (~93°C) and steam temperature (~130°C). You brew first, then flip a switch and wait 30-60 seconds for the boiler to ramp before steaming milk.',
    inDepth: [
      {
        heading: 'The single-boiler workflow',
        body:
          '<p>One boiler, two jobs, done in sequence. The user pulls the shot first while the boiler is at brew temperature, then triggers a steam button or flip-switch that turns up the heating element to steam temperature. Thirty to sixty seconds later, the steam wand has enough pressure to texture milk. Total cycle: about a minute for one milk drink.</p>'
          + '<p>For one-cup-at-a-time households this is invisible. For two drinks back-to-back you wait between cups, and for three or more drinks the workflow becomes annoying — coming back down to brew temperature for shot two takes 60-90 more seconds.</p>',
      },
      {
        heading: 'Single-boiler dual-use (SBDU) terminology',
        body:
          '<p>Some manufacturers call this "single-boiler dual-use" or SBDU to distinguish it from older designs that had no steam capability at all. Functionally it is the same architecture as what most people call "single boiler" today.</p>',
      },
      {
        heading: 'Why people still choose single boiler',
        body:
          '<p>Two reasons: price and footprint. Single-boiler machines (Gaggia Classic Pro, Rancilio Silvia V6, ECM Classika PID, Lelit Anna) sit between $400 and $1,200 — the same range where dual boilers start at $1,800. Footprint is also smaller because there is only one boiler to fit.</p>'
          + '<p>Cup quality from a single boiler with PID is identical to a dual boiler at the same brew temperature. The only thing you give up is parallel workflow. If you make one drink at a time, you give up nothing.</p>',
      },
      {
        heading: 'When single boiler stops working',
        body:
          '<p>When you regularly make three or more back-to-back milk drinks (typical for a family of four, or a small Airbnb host), or when you are doing latte-art-quality milk and need to texture immediately after the shot finishes. The 60-second steam wait kills momentum and lets shot temperature drift before serving.</p>'
          + '<p>The Cafelat Robot and Flair lever machines are technically single boiler-less (they boil water externally), and they serve as another path to single-cup espresso without the cycling delay.</p>',
      },
    ],
    examples: [
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro is the iconic single boiler — over 30 years of the same architecture, still recommended for first-time home baristas. Pair it with an aftermarket PID for prosumer-class consistency.',
      },
      {
        asin: 'B0BQYMTBNL',
        note:
          'The Rancilio Silvia V6 is the other classic single boiler in the segment — 58mm commercial portafilter, brass boiler, single thermostat (no PID stock).',
      },
      {
        asin: 'B0B5BC5VXM',
        note:
          'The Gaggia Classic Evo Pro adds PID and a 3-way solenoid to the Classic platform from the factory, removing the two most common aftermarket mods.',
      },
      {
        asin: 'B07BJ4HT4P',
        note:
          'The ECM Classika PID is the single-boiler prosumer option — single boiler with an E61-style heated group head and built-in PID.',
      },
    ],
    faqs: [
      {
        question: 'How long do I wait between brewing and steaming on a single boiler?',
        answer:
          'Typically 30-60 seconds going up to steam temperature and 60-90 seconds coming back down. The user flips a switch and waits for a light to indicate ready.',
      },
      {
        question: 'Can I make latte art on a single boiler?',
        answer:
          'Yes — single boilers produce plenty of steam pressure once they ramp up. The only constraint is the sequential workflow, not the milk quality.',
      },
      {
        question: 'Is a single boiler with PID as good as a dual boiler?',
        answer:
          'For cup quality, yes. The shot you pull on a Gaggia Classic with PID is indistinguishable from a Profitec Pro 300 dual boiler at the same brew temperature. The difference is workflow speed, not espresso quality.',
      },
      {
        question: 'What is the cheapest single boiler worth buying?',
        answer:
          'The Gaggia Classic Pro at roughly $500 is the consensus floor — below that, build quality drops and the basket size constrains you to pressurized baskets that defeat real extraction control.',
      },
      {
        question: 'Do single-boiler machines descale differently from dual boilers?',
        answer:
          'No — same descaler, same procedure, just one boiler to flush instead of two. Most users descale every 1-3 months depending on water hardness.',
      },
    ],
    relatedTermSlugs: ['boiler', 'dual-boiler', 'heat-exchanger', 'pid-controller', 'thermoblock'],
    relatedBestSlugs: ['best-espresso-machine-under-500', 'best-espresso-machine-for-beginners'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 5. GROUP HEAD — sizes (54/58mm/E61) y portafilter ecosystem.
  // -------------------------------------------------------------------
  {
    slug: 'group-head',
    title: 'What is a group head and which size matters? — Coffee Equipment Reviews',
    description:
      'Group head sizes (51mm, 54mm, 58mm, E61) determine your aftermarket and shot capacity. Plain explanation of each, the 58mm standard, and what to look for when buying.',
    h1: 'What is a group head on an espresso machine?',
    tldr:
      'The group head is the metal assembly where the portafilter locks in and brew water dispenses onto the puck. Common sizes are 51mm (De\'Longhi La Specialista), 54mm (Breville home line), and 58mm (the commercial standard used by most Italian prosumer machines and the entire café industry).',
    inDepth: [
      {
        heading: 'Why size matters more than you think',
        body:
          '<p>The group head\'s diameter dictates basket size, portafilter size, tamper size, distribution tool size, puck screen size, and bottomless portafilter size. Once you buy a 54mm machine, every aftermarket accessory you can buy is 54mm-specific — and the 54mm catalog is much smaller than the 58mm catalog because cafés use 58mm and the aftermarket follows demand.</p>'
          + '<p>This is not a deal-breaker for casual home users — Breville sells competent 54mm accessories for their own machines — but it limits your upgrade path. If you ever want to step up to a precision basket from VST or IMS, a Decent tamper, or a niche distribution tool from a small machinist, 58mm is the only size that will have it.</p>',
      },
      {
        heading: 'The 58mm commercial standard',
        body:
          '<p>58mm is the size used in commercial espresso machines worldwide — La Marzocco, Nuova Simonelli, Synesso, Slayer, every café-grade brand. It is also used by Italian prosumer brands (Rocket, ECM, Profitec, Lelit, Quick Mill) and a few Breville machines (Breville Dual Boiler, Breville Oracle Touch). The aftermarket — VST precision baskets, IMS competition baskets, every tamper, every distributor, every bottomless portafilter — is built for 58mm first.</p>',
      },
      {
        heading: 'The Breville 54mm world',
        body:
          '<p>Breville chose 54mm for their home line (Bambino, Barista Express, Barista Pro, Barista Touch) for footprint reasons — a 58mm portafilter on a compact machine looks oversized. The 54mm size is still real espresso (proper 9-bar extraction with the right basket), but the aftermarket is Breville-specific: Breville sells the official non-pressurized baskets, third parties make a handful of 54mm distribution tools and tampers, and that is roughly the catalog.</p>',
      },
      {
        heading: 'The 51mm and "proprietary" sizes',
        body:
          '<p>De\'Longhi uses 51mm on entry-level machines (Dedica, La Specialista). Some compact machines use proprietary basket shapes that lock the user into manufacturer-supplied baskets entirely. Both are fine for the "I just want a flat white in the morning" use case but limit dialing-in to whatever the original maker provides.</p>',
      },
      {
        heading: 'E61 group head — a special case',
        body:
          '<p>The E61 is a specific 58mm group head designed by Faema in 1961, now an open commercial standard. It is passively heated via thermosiphon (water circulates from the boiler through the group continuously), has a mushroom valve that creates mechanical pre-infusion, and is extraordinarily thermally stable once at temperature. Most Italian prosumer machines use E61.</p>',
      },
    ],
    examples: [
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro uses a 58mm commercial portafilter, opening every aftermarket basket, tamper, and distribution tool to its owner at sub-$500 entry pricing.',
      },
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus uses a 54mm portafilter — works fine with Breville\'s ecosystem of non-pressurized baskets but limits aftermarket choices to Breville-specific parts.',
      },
      {
        asin: 'B08FZB7N9V',
        note:
          'The Lelit Mara X uses an E61 group head — the canonical Italian prosumer architecture for thermosiphon temperature stability and mechanical pre-infusion.',
      },
      {
        asin: 'B07W5C7QFD',
        note:
          'The De\'Longhi La Specialista uses a 51mm portafilter — competent for the price but locked into De\'Longhi-supplied baskets for serious extraction work.',
      },
    ],
    faqs: [
      {
        question: 'Is 58mm objectively better than 54mm?',
        answer:
          'No — basket size is independent of cup quality at the same brew parameters. 58mm is "better" only in that it has a vastly bigger aftermarket. For a casual home user who never plans to upgrade accessories, 54mm is fine.',
      },
      {
        question: 'Can I use a 58mm basket in a 54mm group head?',
        answer:
          'No — the basket has to seat in the portafilter, and portafilter ears are sized to the group. You cannot mix sizes.',
      },
      {
        question: 'What is a "saturated group" and is it the same as E61?',
        answer:
          'Saturated groups are integrated with the brew boiler (water sits inside the group at brew temperature full-time) and are the highest-stability architecture. E61 is a thermosiphon design — separate group with brew water circulating through it continuously. Different but both highly stable.',
      },
      {
        question: 'Why does my Breville Barista Express portafilter look smaller than a café\'s?',
        answer:
          'Because Breville uses 54mm portafilters while cafés use 58mm. The visual difference is real but the basic mechanics (9-bar extraction, 18g dose, level tamp) are identical.',
      },
      {
        question: 'Does the group head size affect milk steaming?',
        answer:
          'No — group head size only affects the espresso side. The steam wand and boiler determine milk-steaming capability.',
      },
    ],
    relatedTermSlugs: ['e61-group', 'portafilter', 'bottomless-portafilter', 'pre-infusion'],
    relatedBestSlugs: [
      'best-espresso-machine-under-700-with-58mm-portafilter',
      'best-tamper-for-gaggia-classic',
    ],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 6. PRE-INFUSION — feature común, decisión secundaria.
  // -------------------------------------------------------------------
  {
    slug: 'pre-infusion',
    title: 'What is pre-infusion in espresso? — Coffee Equipment Reviews',
    description:
      'Pre-infusion saturates the coffee puck at low pressure before full extraction. Plain explanation of the three implementation styles, when it helps, and whether it is a must-have.',
    h1: 'What is pre-infusion in espresso?',
    tldr:
      'Pre-infusion is a short low-pressure phase at the start of an espresso shot — water saturates the puck before full 9-bar pressure begins. The effect is reduced channeling, more even extraction, and modest cup-quality improvement, especially with light roasts.',
    inDepth: [
      {
        heading: 'Why a low-pressure first phase helps',
        body:
          '<p>When water hits a dry, tightly-tamped puck at full 9-bar pressure, it tends to find the path of least resistance — typically the edges of the basket or any crack in the puck — and force water through that one channel. The result is uneven extraction: a watery, sour shot where one part of the puck contributed everything and the rest sat dry.</p>'
          + '<p>Pre-infusion gives the puck 4-10 seconds at low pressure (1-3 bar) to swell uniformly. Once the puck has absorbed water evenly, full pressure pushes water through a uniformly-resistive bed rather than through one channel. The shot is cleaner, more balanced, and easier to dial.</p>',
      },
      {
        heading: 'Three implementation styles',
        body:
          '<ul>'
          + '<li><strong>Mechanical (E61 lever-valve)</strong> — Italian prosumer machines with E61 groups do pre-infusion automatically via the lever\'s mushroom valve. Lift the lever and water flows at line pressure (1-2 bar) until you push the lever fully — pump kicks in and pressure ramps to 9 bar. Duration is controlled by the user pulling the lever.</li>'
          + '<li><strong>Software (Breville, Lelit)</strong> — entry machines like the Breville Bambino Plus run the pump at low duty cycle for a fixed 4-8 seconds before ramping. Some give the user a duration slider, most do not.</li>'
          + '<li><strong>Manual (Cafelat Robot, Flair)</strong> — manual lever machines have the user execute pre-infusion by holding the lever at low force, then pressing through for full extraction. Maximum control but requires technique.</li>'
          + '</ul>',
      },
      {
        heading: 'When pre-infusion helps most',
        body:
          '<p>The cup-quality gain from pre-infusion scales with how prone the puck is to channeling. That means: very fine grinds, very low doses, very high doses (puck pressed against the shower screen), or any inconsistent puck prep are situations where pre-infusion compensates the most. Light roasts also benefit more than dark roasts because their tighter extraction window is more sensitive to channeling.</p>'
          + '<p>For dark roasts pulled at moderate doses with good puck prep on a 58mm basket, pre-infusion is a small contributor. You can pull excellent shots without it (and many traditional Italian cafés do, on lever machines with no electric pre-infusion).</p>',
      },
      {
        heading: 'Is pre-infusion a must-have?',
        body:
          '<p>No, but most current machines include it because the implementation cost is near zero. If you are buying new, almost everything in the $400+ range has some form of pre-infusion. If you are choosing between two used machines and one has it and one does not, it should not be the deciding factor — grinder quality, group head size, and PID matter more.</p>',
      },
    ],
    examples: [
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus implements software pre-infusion at a fixed duration — one reason its shots are surprisingly clean from a $500 thermoblock machine.',
      },
      {
        asin: 'B08FZB7N9V',
        note:
          'The Lelit Mara X uses E61 mechanical pre-infusion via the iconic three-position lever, the original implementation style that has worked unchanged for 60 years.',
      },
      {
        asin: 'B07RZD5VQB',
        note:
          'The Cafelat Robot is the simplest manual implementation — the user controls pre-infusion duration by holding the levers at low force before pushing through for full extraction.',
      },
      {
        asin: 'B0BX7TCQVD',
        note:
          'The Casabrews 3700 Essential has no pre-infusion — useful as a counter-example of how the spec sheet plays out at the budget end of the market.',
      },
    ],
    faqs: [
      {
        question: 'How long should pre-infusion be?',
        answer:
          'Most fixed implementations run 4-8 seconds. Adjustable implementations let you tune 0-20 seconds. Long pre-infusion (10+ seconds) is more about declumping experimentation than mainstream technique.',
      },
      {
        question: 'Does pre-infusion fix channeling?',
        answer:
          'It reduces channeling, but does not fix bad puck prep. The biggest channeling fixes are level tamping, WDT, and matching grind to basket size — pre-infusion is a backup.',
      },
      {
        question: 'Can I add pre-infusion to a machine that does not have it?',
        answer:
          'Hardware mods exist for some popular machines (low-pressure pre-infusion valves for Gaggia Classic) but they are involved. For most users the cleaner path is just buying a machine with it built in.',
      },
      {
        question: 'Is pre-infusion the same as "blooming" pour-over coffee?',
        answer:
          'Conceptually yes — both let the grounds absorb water before full brewing begins. Mechanically different: pour-over bloom is gravity-fed open-top; pre-infusion is enclosed low-pressure under a tamped puck.',
      },
      {
        question: 'Should I always use pre-infusion?',
        answer:
          'On machines that have it: yes, leave it on. On manual levers: it is part of the technique you choose how to use. There is no scenario where pre-infusion hurts the shot.',
      },
    ],
    relatedTermSlugs: ['e61-group', 'channeling', 'extraction', 'nine-bar-pressure', 'puck-prep'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 7. WDT (Weiss Distribution Technique).
  // -------------------------------------------------------------------
  {
    slug: 'wdt',
    title: 'What is WDT (Weiss Distribution Technique)? — Coffee Equipment Reviews',
    description:
      'WDT uses fine needles to stir coffee grounds in the basket before tamping, breaking up clumps and reducing channeling. Plain explanation of how it works and whether it is worth doing.',
    h1: 'What is WDT (Weiss Distribution Technique)?',
    tldr:
      'WDT is a puck-prep technique that uses a tool with fine needles (0.3-0.4mm diameter) to stir coffee grounds inside the portafilter basket, breaking up clumps before tamping. The result is more even distribution and significantly reduced channeling.',
    inDepth: [
      {
        heading: 'Where the technique comes from',
        body:
          '<p>The technique was published by John Weiss on the Coffee Geek forum in 2005 — hence "Weiss Distribution Technique" — as a way to address clumping in home grinders. The original tool was literally a paperclip bent into a stirring shape. Twenty years later, dedicated WDT tools with 5-10 needles cost $15-50 and are part of standard puck prep for most serious home baristas.</p>',
      },
      {
        heading: 'Why it works',
        body:
          '<p>Most home grinders produce coffee with some level of clumping — small balls of grounds held together by static charge or fines. A clump in the basket means that region of the puck has higher density and lower porosity than the surrounding bed. When water hits the puck under pressure, the clump resists flow while the surrounding looser areas channel.</p>'
          + '<p>Stirring with fine needles breaks up clumps mechanically and redistributes grounds more uniformly across the basket. The effect is most pronounced on high-static, high-clump grinders (older Baratzas, many entry electrics) and least pronounced on low-static prosumer grinders (DF64 with RDT, Niche Zero).</p>',
      },
      {
        heading: 'How to do WDT',
        body:
          '<p>The mechanics: dose into the basket, insert the WDT tool to the bottom of the basket, and make small circular or "rake" motions through the grounds for 5-15 seconds. The grounds should look fluffy and uniform afterward. Then tap the portafilter lightly on the counter once to settle, and tamp level.</p>'
          + '<p>Common mistakes: WDT too aggressively and you spill grounds; WDT too lightly and you do not fully break up clumps. The technique takes a week of practice to dial in. Many baristas use a funnel or dosing collar to keep grounds in the basket during the stir.</p>',
      },
      {
        heading: 'WDT alongside other puck-prep techniques',
        body:
          '<p>WDT is typically the first step of puck prep, before distribution tools and tamping:</p>'
          + '<ol>'
          + '<li><strong>Dose</strong> into the basket (weigh on a scale).</li>'
          + '<li><strong>WDT</strong> to break up clumps.</li>'
          + '<li><strong>Distribution tool</strong> (optional) to level the surface.</li>'
          + '<li><strong>Tamp</strong> level and firm.</li>'
          + '<li><strong>Puck screen</strong> (optional) on top.</li>'
          + '</ol>'
          + '<p>WDT and distribution tools serve different functions — WDT breaks up clumps throughout the puck depth, distribution tools only level the surface. Many baristas use both.</p>',
      },
    ],
    examples: [
      {
        asin: 'B08L5C9QZD',
        note:
          'The Normcore WDT tool uses 7 needles at 0.3mm — the most common spec, fits 58mm baskets, magnetic stand, sub-$20. Good entry tool.',
      },
      {
        asin: 'B09QV3RTBN',
        note:
          'The BPlus WDT tool uses 0.25mm needles with a screw-in handle — slightly finer needles than the Normcore for less compaction, common upgrade for users who feel the Normcore tool is too coarse.',
      },
    ],
    faqs: [
      {
        question: 'Do I need WDT if I have a good grinder?',
        answer:
          'Less than with a bad grinder, but yes — even low-clump grinders benefit from WDT for puck uniformity. The Niche Zero, DF64, and Eureka Mignon all produce shots that are measurably cleaner with WDT than without.',
      },
      {
        question: 'How long should I WDT?',
        answer:
          'Most baristas spend 5-15 seconds stirring. Longer does not help; shorter risks leaving clumps. The visual cue is when the grounds look uniformly fluffy throughout the depth of the basket.',
      },
      {
        question: 'What needle thickness should I use?',
        answer:
          '0.3mm-0.4mm is the standard range. Thinner needles (0.25mm) are slightly less compacting but bend more easily; thicker needles (0.5mm+) can over-compact the puck during stirring.',
      },
      {
        question: 'Can I just use a paperclip or toothpick?',
        answer:
          'You can — the original 2005 technique used a paperclip — but dedicated WDT tools have multiple needles for faster stirring and a handle that does not cramp your hand. Sub-$20 tools work well.',
      },
      {
        question: 'Does WDT make a visible difference?',
        answer:
          'With a bottomless portafilter, yes — channeling visible during the shot drops dramatically after WDT becomes standard. With a spouted portafilter you taste the difference (cleaner, fewer sour notes) but cannot see it.',
      },
    ],
    relatedTermSlugs: ['channeling', 'tamping', 'puck-prep', 'distribution-tool', 'static'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    relatedTroubleshootSlugs: ['channeling-fix-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 8. TAMPING — technique fundamental.
  // -------------------------------------------------------------------
  {
    slug: 'tamping',
    title: 'What is tamping in espresso? — Coffee Equipment Reviews',
    description:
      'Tamping compresses ground coffee in the portafilter before brewing. Plain explanation of what matters (level), what does not (exact pressure), and how to learn.',
    h1: 'What is tamping in espresso?',
    tldr:
      'Tamping is compressing ground coffee in the portafilter basket with a tamper, creating an even, level puck before locking it into the group head. The single biggest predictor of channeling is whether the tamp is level — exact pressure matters much less than most beginners assume.',
    inDepth: [
      {
        heading: 'The "30 pounds of force" myth',
        body:
          '<p>For decades, baristas were taught to tamp with exactly 30 pounds of force. This advice persists despite evidence that pressure beyond about 10-15 pounds does not meaningfully change the shot — once the puck is uniformly compressed enough to remove air gaps, additional force just transfers to the basket and the user\'s wrist.</p>'
          + '<p>Modern coffee science (Scott Rao, Barista Hustle, James Hoffmann\'s practical experiments) converges on a different framing: <strong>level matters, pressure does not</strong>. A consistent, firm tamp that is level (no tilt) produces better shots than an inconsistent 30-lb tamp.</p>',
      },
      {
        heading: 'How to tamp level',
        body:
          '<p>The mechanical goal is a puck whose surface is parallel to the basket\'s top edge and perpendicular to the portafilter\'s vertical axis. Tilt of even 1-2° creates a thicker puck region on one side and a thinner region on the other; water will channel through the thinner side.</p>'
          + '<p>Three approaches help land level:</p>'
          + '<ul>'
          + '<li><strong>Flat-base tamper, by feel</strong> — beginners struggle, experienced baristas often go back to this for tactile feedback. Takes 1-3 months to internalize.</li>'
          + '<li><strong>Calibrated/spring tamper</strong> — clicks at a fixed pressure (typically 30 lb) and self-levels against the basket. Removes both variables, easier for beginners.</li>'
          + '<li><strong>Push-pull workflow</strong> — light first tamp to settle, second firmer tamp using two hands on opposite sides of the tamper. Forces level by mechanics.</li>'
          + '</ul>',
      },
      {
        heading: 'Tamper size matters',
        body:
          '<p>A 58mm group head needs a 58mm tamper — but baskets have tolerance, so 58.35mm or 58.5mm tampers fit the inside diameter more snugly and produce better edge contact. The wrong-size tamper (e.g. a 58mm tamper in a 51mm De\'Longhi basket) is useless.</p>'
          + '<p>Match the tamper to the group head: 58mm tamper for Italian commercial / E61 / Gaggia / Rancilio / Profitec; 54mm tamper for Breville home line; 51mm tamper for De\'Longhi Dedica.</p>',
      },
      {
        heading: 'When tamping does not save the shot',
        body:
          '<p>Tamping is one of six puck-prep variables. A perfect tamp on a poorly-distributed puck (no WDT, clumped grounds) still channels. A perfect tamp at the wrong grind size still over- or under-extracts. The order of operations matters: grind right → distribute (WDT) → tamp level → brew.</p>',
      },
    ],
    examples: [
      {
        asin: 'B07XGYLW2H',
        note:
          'The Normcore 58.5mm tamper is the standard mid-tier flat-base tamper for 58mm baskets — slightly oversized to take basket tolerance and fit snugly inside the basket lip.',
      },
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro ships with a low-quality plastic tamper that almost every owner replaces — its 58mm size means upgrade tampers are abundant and affordable.',
      },
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus ships with a 54mm magnetic tamper that sits on the machine — fine for casual use, often replaced with a 54mm calibrated tamper as the user upgrades technique.',
      },
    ],
    faqs: [
      {
        question: 'How hard should I tamp?',
        answer:
          'Firm — somewhere between 10 and 30 pounds of force. The exact number matters less than tamping the same force every time and keeping it level. If you can hear gaps closing under the tamp, you are not pressing hard enough.',
      },
      {
        question: 'Should I tap the portafilter on the counter after tamping?',
        answer:
          'Light taps before tamping can help settle dose; taps after tamping can crack the puck and create channels. Most baristas tap once before tamping and never after.',
      },
      {
        question: 'Is a calibrated tamper worth it?',
        answer:
          'For beginners and households where multiple people pull shots, yes — it removes two variables. Experienced baristas often prefer flat-base tampers once their muscle memory is set.',
      },
      {
        question: 'What is "polishing" the puck after tamping?',
        answer:
          'A small rotation of the tamper at the end of the tamp, intended to seal the puck surface. Modern consensus is that polishing does little to no harm but also little measurable benefit.',
      },
      {
        question: 'Can I tamp too hard?',
        answer:
          'Functionally no — above about 20 pounds, additional force does not change the puck. The risk is hurting your wrist over many shots, not over-extracting the shot.',
      },
    ],
    relatedTermSlugs: ['calibrated-tamper', 'channeling', 'puck-prep', 'wdt'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    relatedTroubleshootSlugs: ['channeling-fix-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 9. CHANNELING — failure mode central + troubleshoot.
  // -------------------------------------------------------------------
  {
    slug: 'channeling',
    title: 'What is channeling in espresso? — Coffee Equipment Reviews',
    description:
      'Channeling is when water finds a low-resistance path through the puck instead of extracting evenly. Plain explanation of causes, visual diagnosis, and how to fix it.',
    h1: 'What is channeling in espresso?',
    tldr:
      'Channeling is a failed extraction where pressurized water finds a low-resistance path through the puck instead of saturating evenly. It produces watery, sour shots with bright crema in only part of the basket, and is the most common quality problem in home espresso.',
    inDepth: [
      {
        heading: 'How channeling looks and tastes',
        body:
          '<p>Visually (on a bottomless portafilter): one bright jet of espresso spurts to one side while the rest of the basket drips weakly. On a spouted portafilter you cannot see channels, but the shot pours unevenly — too fast on one side, drips on the other.</p>'
          + '<p>In the cup: sour and thin, often with a metallic edge. The watery, unbalanced taste is because most of the shot is under-extracted (water flew through the channel) while a small region of the puck contributed all the solids (briefly over-extracted before the channel opened).</p>',
      },
      {
        heading: 'The five main causes',
        body:
          '<ol>'
          + '<li><strong>Uneven distribution before tamping</strong> — dose dumped to one side of the basket creates a low-density region the water exploits. Fix: WDT and dose-into-funnel.</li>'
          + '<li><strong>Tilted tamp</strong> — tamping at 1-2° off level creates one side with thinner puck than the other. Fix: calibrated tamper or self-leveling base.</li>'
          + '<li><strong>Too-fine grind for the basket</strong> — over-densified puck cracks under 9-bar pressure rather than extracting smoothly. Fix: coarsen grind slightly.</li>'
          + '<li><strong>Clumped grounds from a high-static grinder</strong> — clumps create density variation. Fix: WDT + RDT spritz on beans.</li>'
          + '<li><strong>Worn or out-of-spec basket</strong> — old baskets with worn holes channel through the worn region. Fix: replace basket every 12-24 months on a daily-use machine.</li>'
          + '</ol>',
      },
      {
        heading: 'Diagnosing channeling at home',
        body:
          '<p>The single most effective diagnostic tool is a bottomless (also called "naked") portafilter. You can see exactly where in the basket the channel forms — left side, right side, center, edge — and that tells you the cause.</p>'
          + '<ul>'
          + '<li>Channel near the basket edge → distribution problem on that side.</li>'
          + '<li>Channel in the center → over-tight grind or insufficient pre-infusion.</li>'
          + '<li>Channel on one side consistently → tilted tamp.</li>'
          + '</ul>'
          + '<p>A bottomless portafilter costs $30-60 and is the cheapest meaningful upgrade to a stock setup.</p>',
      },
      {
        heading: 'Prevention checklist',
        body:
          '<p>Before each shot:</p>'
          + '<ul>'
          + '<li>Dose into a clean dry basket, ideally with a dosing funnel.</li>'
          + '<li>WDT through the full depth (5-15 seconds with a 0.3mm needle tool).</li>'
          + '<li>Tap once to settle, then tamp level with consistent firm pressure.</li>'
          + '<li>Insert into the group within 30 seconds (don\'t let the puck dry out).</li>'
          + '<li>If pre-infusion is available, use it.</li>'
          + '</ul>'
          + '<p>Pucks prepared this way channel rarely. The combination matters more than any single step.</p>',
      },
    ],
    examples: [
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro\'s stock basket is double-walled (pressurized) by default, which masks channeling but defeats real extraction control. Replace with a single-walled VST or IMS basket and channeling becomes visible — and fixable.',
      },
      {
        asin: 'B08L5C9QZD',
        note:
          'The Normcore WDT tool addresses cause #4 (clumped grounds) and is part of the standard channeling-prevention kit.',
      },
    ],
    faqs: [
      {
        question: 'Why does my shot pour fast on one side?',
        answer:
          'Almost always a distribution or tamping problem on that side — the puck has lower density there and water finds the path. WDT and a level tamp fix the majority of cases.',
      },
      {
        question: 'Can I see channeling without a bottomless portafilter?',
        answer:
          'Indirectly — fast pour time, sour thin taste, and uneven flow from the two spouts all suggest channeling. But for diagnosis the bottomless portafilter is far more useful than any indirect signal.',
      },
      {
        question: 'Does pre-infusion eliminate channeling?',
        answer:
          'It reduces it significantly but does not eliminate it — channeling caused by uneven distribution or tilted tamping persists. Pre-infusion compensates for puck conditions but cannot fix prep that is wrong upstream.',
      },
      {
        question: 'How tight is too tight on grind?',
        answer:
          'When your shot duration exceeds 35 seconds with a 1:2 ratio AND you see channeling, the grind is too fine. Coarsen by one micro-step and re-evaluate.',
      },
      {
        question: 'Are puck screens worth it for channeling?',
        answer:
          'They help distribute water across the puck surface, which reduces channeling slightly. The bigger benefit is keeping the group screen clean. Most baristas consider them a nice-to-have rather than a must.',
      },
    ],
    relatedTermSlugs: ['extraction', 'tamping', 'wdt', 'puck-prep', 'bottomless-portafilter'],
    relatedTroubleshootSlugs: ['channeling-fix-espresso'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 10. EXTRACTION — fundamental.
  // -------------------------------------------------------------------
  {
    slug: 'extraction',
    title: 'What is extraction in espresso? — Coffee Equipment Reviews',
    description:
      'Extraction is the process of dissolving soluble compounds from coffee into brew water. Plain explanation of the 18-22% target, under- vs over-extraction, and how to dial it in.',
    h1: 'What is extraction in espresso?',
    tldr:
      'Extraction is the process and percentage of soluble coffee solids dissolved into the brew water. Espresso typically targets 18-22% extraction by mass — under-extracted shots taste sour and thin, over-extracted shots taste bitter and astringent.',
    inDepth: [
      {
        heading: 'What "extraction yield" actually means',
        body:
          '<p>Coffee beans are roughly 30% soluble — that is the theoretical maximum that can dissolve in brew water. In practice, most of those compounds are bitter or astringent, so you do not want to extract all of them. Specialty coffee science has converged on 18-22% extraction yield as the sweet spot where positive flavors (sweetness, balanced acidity, body) outweigh negative ones (bitterness, dryness).</p>'
          + '<p>The percentage is calculated as (TDS × yield) / dose, where TDS is Total Dissolved Solids measured by refractometer. For example: 18g dose, 36g yield, 9% TDS → (9 × 36) / 18 = 18% extraction.</p>',
      },
      {
        heading: 'How to dial extraction without a refractometer',
        body:
          '<p>Most home setups dial by taste and timing rather than refractometer. The mental model:</p>'
          + '<ul>'
          + '<li><strong>Sour, weak, salty</strong> → under-extracted. Grind finer or extend ratio (longer shot).</li>'
          + '<li><strong>Bitter, hollow, astringent</strong> → over-extracted. Grind coarser or shorten ratio.</li>'
          + '<li><strong>Sweet, balanced, neither sour nor bitter</strong> → in the zone.</li>'
          + '</ul>'
          + '<p>Shot time is a proxy: a balanced 1:2 ratio espresso typically takes 25-32 seconds from the moment pressure builds. Outside that range, the extraction is suspect even if the taste is acceptable.</p>',
      },
      {
        heading: 'Variables that move extraction',
        body:
          '<ul>'
          + '<li><strong>Grind size</strong> — finer = more extraction (more surface area, slower flow).</li>'
          + '<li><strong>Brew time</strong> — longer = more extraction.</li>'
          + '<li><strong>Temperature</strong> — hotter = more extraction (within espresso\'s narrow 90-96°C window).</li>'
          + '<li><strong>Brew ratio</strong> — longer ratio (more water per gram of coffee) = more extraction.</li>'
          + '<li><strong>Pressure</strong> — 9 bar is standard; lower pressure profiles ("low-flow") often increase perceived sweetness by reducing channeling.</li>'
          + '</ul>'
          + '<p>The variables interact — coarser grind shortens brew time which lowers extraction. Most home users hold dose and ratio constant and adjust grind only.</p>',
      },
      {
        heading: 'Why extraction is the unifying concept',
        body:
          '<p>Channeling causes under-extraction (water flew through). Stale coffee extracts unevenly. Hard water with high alkalinity buffers acids and shifts perceived extraction. Light roasts need higher temperature and longer ratios for the same extraction yield as dark roasts. Every other variable on this page points back to extraction.</p>'
          + '<p>That is why most barista training centers extraction as the first concept — once you understand "we are trying to dissolve 18-22% of the coffee, evenly," the other terms (channeling, tamping, ratio, PID) snap into place as supporting variables.</p>',
      },
    ],
    examples: [
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro with a quality grinder and PID is the canonical extraction-control machine in the entry tier — every variable is in the user\'s hands once you replace the pressurized basket.',
      },
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus locks down brew temperature and pre-infusion in software, leaving grind and ratio as the main user-controlled extraction variables.',
      },
      {
        asin: 'B07RZD5VQB',
        note:
          'The Cafelat Robot exposes pressure as a user-controlled variable — the lever gives direct feedback on extraction, useful for understanding the variable that most electric machines hide.',
      },
    ],
    faqs: [
      {
        question: 'What is the right extraction percentage for espresso?',
        answer:
          '18-22% is the consensus range for traditional espresso. Some specialty roasters and competition recipes push to 23-25% with extended pre-infusion and flow control, but for home use 18-22% covers nearly everything.',
      },
      {
        question: 'Do I need a refractometer to dial in?',
        answer:
          'No — most home baristas dial by taste and shot time alone. A refractometer ($150-400) is useful if you are systematically comparing roasters, machines, or recipes, but it is a precision tool, not a beginner requirement.',
      },
      {
        question: 'Why does my shot taste sour even at the right time?',
        answer:
          'Under-extraction. Try a finer grind (extracts more) or a longer ratio (more water passes through). Sour also means light roasts often need higher temperature (94-96°C) than dark roasts (90-93°C).',
      },
      {
        question: 'What is "yield" and how does it relate to extraction?',
        answer:
          'Yield is the mass of espresso liquid in the cup. Extraction percentage is the dissolved solids relative to the dry coffee dose. Yield is what you measure; extraction is what you target through brewing variables.',
      },
      {
        question: 'Does extraction matter for milk drinks?',
        answer:
          'Yes — bad espresso under milk is just less-bad bad espresso. Milk masks some sourness and bitterness but balanced extraction still produces a noticeably better cappuccino than over- or under-extracted.',
      },
    ],
    relatedTermSlugs: ['brew-ratio', 'yield', 'under-extraction', 'over-extraction', 'channeling'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 11. BREW RATIO — fundamental dialing-in variable.
  // -------------------------------------------------------------------
  {
    slug: 'brew-ratio',
    title: 'What is brew ratio in espresso? — Coffee Equipment Reviews',
    description:
      'Brew ratio is the mass relationship between coffee dose and espresso yield (1:1.5 ristretto, 1:2 normale, 1:3 lungo). Plain explanation of how ratio interacts with grind and what to use for which roast.',
    h1: 'What is brew ratio in espresso?',
    tldr:
      'Brew ratio is the mass relationship between dry coffee dose and liquid espresso yield. Common ratios: 1:2 (18g dose → 36g shot, "normale"), 1:1.5 ("ristretto"), 1:3 ("lungo"). The ratio you choose dramatically changes the cup before you even adjust grind.',
    inDepth: [
      {
        heading: 'How brew ratio differs from grind size',
        body:
          '<p>Many beginners conflate ratio and grind. They are independent levers:</p>'
          + '<ul>'
          + '<li><strong>Grind</strong> changes how fast water flows through the puck. Finer = slower, coarser = faster.</li>'
          + '<li><strong>Ratio</strong> changes when you stop the shot. Short ratio = stop early at 27g for 18g dose. Long ratio = stop late at 45-54g for the same 18g dose.</li>'
          + '</ul>'
          + '<p>You can hit a 1:2 ratio at 20 seconds (too fast, under-extracted) or at 35 seconds (slower, more extracted) — grind controls which. Ratio determines volume; grind+time determine extraction within that volume.</p>',
      },
      {
        heading: 'Common ratios and what they taste like',
        body:
          '<ul>'
          + '<li><strong>1:1 to 1:1.5 (ristretto)</strong> — short, intense, syrupy. Dark roasts and milk drinks. Less liquid means more concentrated solids and a more punchy mouthfeel.</li>'
          + '<li><strong>1:2 (normale)</strong> — the standard. Balanced for most blends and medium roasts. The "default" recipe most baristas start with.</li>'
          + '<li><strong>1:2.5 to 1:3 (lungo or long ratio)</strong> — more dilute, brighter, more developed acidity. Light roasts and single origins where you need to pull more flavor through.</li>'
          + '</ul>'
          + '<p>"Ristretto" and "lungo" are Italian café terms that have specific volumes (15ml, 60ml) in some traditions, but mass ratios are more reproducible.</p>',
      },
      {
        heading: 'How to choose a ratio',
        body:
          '<p>Start at 1:2 with any new bean. If the shot is sour or thin, try 1:2.5 (extract more) before adjusting grind. If the shot is bitter or hollow, try 1:1.5 (extract less). For light roasts, plan to live at 1:2.5-1:3. For dark roasts and traditional Italian blends, 1:1.5-1:2 covers most cases.</p>'
          + '<p>For milk drinks, slightly shorter ratios (1:1.5-1:2) give you more concentration to stand up to milk dilution. For straight espresso enjoyed without milk, the balanced 1:2-1:2.5 range is more flexible.</p>',
      },
      {
        heading: 'Measuring ratio in practice',
        body:
          '<p>You need a scale that fits under the cup with the portafilter engaged. Most home setups use a flat-platform scale with 0.1g resolution (Acaia Lunar, Timemore Black Mirror, or any $40 baking scale that fits). Tare with the empty cup, pull the shot, stop when the scale reads your target yield.</p>'
          + '<p>Volume marks on the cup are unreliable — espresso volume varies wildly with crema density and TDS. Mass measurement is the only way to dial reproducibly.</p>',
      },
    ],
    examples: [
      {
        asin: 'B0BC4FQDD1',
        note:
          'The Acaia Pearl S is the precision scale most home baristas use for ratio measurement — 0.1g resolution, flow-rate display, fits under standard cups.',
      },
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro has no built-in ratio control — you watch the scale and stop the shot manually, which is also the most flexible setup for dialing different ratios on different beans.',
      },
      {
        asin: 'B0BTBHC9JV',
        note:
          'The Breville Barista Touch Impress has programmable ratio targets built in — set 1:2 once and the machine stops the pump when the puck has delivered the target yield.',
      },
    ],
    faqs: [
      {
        question: 'Is 1:2 always the right starting ratio?',
        answer:
          'For most medium-roast espresso blends, yes. Light roasts often dial in at 1:2.5-1:3; very dark Italian-style roasts sometimes at 1:1.5. The roaster\'s recipe card (if provided) is your best first guess.',
      },
      {
        question: 'Does the ratio change for milk drinks vs straight espresso?',
        answer:
          'Slightly — ristretto-style (1:1.5) shots are more common for milk drinks because the concentrated flavor stands up to milk dilution. But many specialty cafés use the same 1:2 for both and let the recipe dictate.',
      },
      {
        question: 'How precise does ratio need to be?',
        answer:
          'Within ±1g is fine for taste — you cannot perceive 35g vs 36g of yield in the cup. Most baristas land within ±2g shot-to-shot.',
      },
      {
        question: 'What is "updosing" and how does it relate to ratio?',
        answer:
          'Updosing means putting more dry coffee in the basket (e.g. 20g instead of 18g). At the same ratio (1:2), this gives a bigger shot — useful for larger drinks or stronger flavor. Mostly a basket-size and personal-preference call.',
      },
      {
        question: 'Should I weigh dose or just use the same scoop?',
        answer:
          'Weigh dose. Scoops vary by ±1g due to grind density and tamp settling. A scale removes the variable that nothing else controls.',
      },
    ],
    relatedTermSlugs: ['yield', 'extraction', 'under-extraction', 'over-extraction'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    relatedBestSlugs: ['best-scale-for-espresso-shots'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 12. POUR OVER — non-espresso brewing method, broad audience.
  // -------------------------------------------------------------------
  {
    slug: 'pour-over',
    title: 'What is pour-over coffee? — Coffee Equipment Reviews',
    description:
      'Pour-over is a manual percolation brewing method using a filter cone (V60, Kalita Wave, Chemex). Plain explanation of the technique, the main cone designs, and how it differs from drip.',
    h1: 'What is pour-over coffee?',
    tldr:
      'Pour-over is a manual percolation brewing method where hot water is poured over a bed of coffee grounds in a filter cone (V60, Kalita Wave, Chemex). Total brew time is typically 3-4 minutes for 250-500ml of brewed coffee, and the result is a brighter, cleaner cup than immersion methods like French press.',
    inDepth: [
      {
        heading: 'The pour-over workflow',
        body:
          '<ol>'
          + '<li><strong>Heat water</strong> to 92-96°C. Filter coffee tolerates a wider temperature range than espresso.</li>'
          + '<li><strong>Rinse the filter</strong> with hot water to remove paper taste and preheat the cone.</li>'
          + '<li><strong>Grind 15-25g of coffee</strong> at medium-fine (think table salt). Add to the filter.</li>'
          + '<li><strong>Bloom</strong> — pour 2x the dose weight of water (e.g. 40ml for 20g), stir or swirl, let sit 30-45 seconds. Grounds release CO2.</li>'
          + '<li><strong>Main pour(s)</strong> — pour the remaining water in 1-3 phases over 1-3 minutes, keeping the bed agitated and water level above the grounds.</li>'
          + '<li><strong>Drawdown</strong> — water finishes percolating; total brew time should land 3-4 minutes for most recipes.</li>'
          + '</ol>',
      },
      {
        heading: 'The three cone designs',
        body:
          '<ul>'
          + '<li><strong>Hario V60</strong> — conical with a single large hole and internal spiral ribs. The most popular cone among specialty roasters. Allows fast flow and high-pour-skill control. Produces clean, bright cups with origin character.</li>'
          + '<li><strong>Kalita Wave</strong> — flat-bottom with three small holes. Slower flow than V60, more forgiving — pours land in the bed regardless of where you pour, and the flat bottom evens out extraction. Best for beginners and consistency-focused brewers.</li>'
          + '<li><strong>Chemex</strong> — flared glass body with proprietary thick paper filters (20-30% heavier than standard). Slower drawdown, more oils retained by the filter, produces noticeably cleaner cups. Larger capacity (1-8 cups) makes it good for groups.</li>'
          + '</ul>',
      },
      {
        heading: 'Pour-over vs drip coffee maker',
        body:
          '<p>An auto-drip machine is also technically percolation — water passes through a grounds bed in a filter. The difference is control. Pour-over lets you regulate water temperature, pour speed, pour pattern, bloom duration, and total contact time individually. A drip machine sets all of those at the factory.</p>'
          + '<p>The result: a well-poured V60 from a light Ethiopian usually beats the same coffee through a $200 drip machine. The trade-off is time and attention — pour-over is 5 minutes of active engagement vs 30 seconds of pressing a button.</p>',
      },
      {
        heading: 'Equipment that matters',
        body:
          '<ul>'
          + '<li><strong>Gooseneck kettle</strong> — the long thin spout gives flow control that a standard kettle cannot. $50-200 depending on whether it has temperature control.</li>'
          + '<li><strong>Burr grinder</strong> — pour-over tolerates a wider grind range than espresso, but uniform particle size is still the single biggest variable for cup quality.</li>'
          + '<li><strong>Scale with timer</strong> — for ratio and brew-time measurement.</li>'
          + '<li><strong>Cone + filters</strong> — V60 or Kalita Wave start under $20. Chemex is $40-50 with proprietary filters.</li>'
          + '</ul>',
      },
    ],
    examples: [
      {
        asin: 'B000P4D5HG',
        note:
          'The Hario V60 02 is the entry standard — ceramic cone, paired with Hario filters or aftermarket Cafec/Sibarist filters for more control over drawdown.',
      },
      {
        asin: 'B00OQ80T9Y',
        note:
          'The Kalita Wave 185 is the forgiving alternative to V60 — flat-bottom with three small holes, easier for beginners, less pour-technique-dependent.',
      },
      {
        asin: 'B0000YWF5E',
        note:
          'The Chemex Classic 6-Cup is the classic Chemex form — borosilicate glass, wood collar, proprietary thick filters that produce a notably cleaner cup than V60 or Kalita.',
      },
      {
        asin: 'B0BVYGZG6T',
        note:
          'The Fellow Stagg EKG is the standard temperature-controllable gooseneck kettle — pairs with any pour-over cone and gives precise flow control and 1°C temperature accuracy.',
      },
    ],
    faqs: [
      {
        question: 'What grind size for pour-over?',
        answer:
          'Medium-fine, similar to table salt. The exact setting depends on your grinder and cone — V60 wants slightly finer than Kalita Wave. Dial by brew time: 3-4 minutes total is the target.',
      },
      {
        question: 'What ratio should I use for pour-over?',
        answer:
          '1:15 to 1:17 (coffee:water by mass) is the standard range. 20g coffee to 320g water is a common starting recipe. Adjust to taste — stronger or weaker is fine within this range.',
      },
      {
        question: 'Is a gooseneck kettle really necessary?',
        answer:
          'For consistent pour-over, yes — the thin spout lets you control flow rate. A standard kettle dumps water too fast and disturbs the bed unevenly. Many manual brewers consider it the second-most-important purchase after the grinder.',
      },
      {
        question: 'How is pour-over different from AeroPress?',
        answer:
          'Pour-over is pure percolation — water flows through the bed by gravity. AeroPress is hybrid immersion-and-pressure — grounds steep first, then you press water through with a plunger. AeroPress produces a heavier-bodied cup; pour-over a brighter, cleaner one.',
      },
      {
        question: 'Can I use pre-ground coffee for pour-over?',
        answer:
          'Yes, but fresh-ground produces a noticeably better cup. Pour-over is more forgiving of grinder quality than espresso, but stale ground coffee (more than 1-2 weeks old) tastes flat regardless of method.',
      },
    ],
    relatedTermSlugs: ['chemex', 'immersion-brewing', 'aeropress', 'percolation-vs-immersion', 'extraction'],
    relatedBestSlugs: ['best-kettle-for-pour-over', 'best-grinder-for-pour-over-under-300'],
    updatedAt: '2026-05-18',
  },
];

/**
 * Helper: encuentra una página detallada por slug.
 * Útil para el template y para el related-content helper.
 */
export function findGlossaryDetailed(slug: string): GlossaryDetailedPage | undefined {
  return GLOSSARY_DETAILED.find((p) => p.slug === slug);
}

/**
 * Helper: lista de slugs con página dedicada — usado por la página index
 * /glossary/ para mostrar "Read more →" y por el autolink script para
 * priorizar /glossary/[slug]/ sobre /glossary/#slug.
 */
export function detailedSlugSet(): Set<string> {
  return new Set(GLOSSARY_DETAILED.map((p) => p.slug));
}
