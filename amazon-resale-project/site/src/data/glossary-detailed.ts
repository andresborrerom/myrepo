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

  // ===================================================================
  // TIER 2 — segunda tanda de head terms (mayo 2026).
  //
  // Criterio de selección:
  //   - Búsqueda clara "what is X" con masa real.
  //   - Profundidad para 600-1200 palabras sin rellenar.
  //   - Anclaje en al menos un best/how-to/troubleshoot existente.
  //   - Anti-gray-hat: debates honestos, sin marketing copy.
  // ===================================================================

  // -------------------------------------------------------------------
  // 13. CREMA — el myth más extendido del nicho. Tratamiento honesto:
  //     NO es indicador de calidad isolado. Crema abundante puede venir
  //     de robusta blends, dark roasts stale, o presión alta sobre puck
  //     malo. La función del entry es desmitificar, no reforzar.
  // -------------------------------------------------------------------
  {
    slug: 'crema',
    title: 'What is crema in espresso? — Coffee Equipment Reviews',
    description:
      'Crema is the foam on top of an espresso shot. It is not a reliable quality indicator on its own. Plain explanation of what it is, what it tells you, and what it does not.',
    h1: 'What is crema in espresso?',
    tldr:
      'Crema is the reddish-brown foam on top of a freshly-pulled espresso shot, formed by CO2 escaping from the coffee and emulsifying with extracted oils. It indicates a fresh roast and that pressure built correctly — but it is not a reliable indicator of shot quality on its own.',
    inDepth: [
      {
        heading: 'What crema actually is',
        body:
          '<p>When coffee beans are roasted, they trap CO2 inside their cellular structure. Grinding releases some of it; brewing under pressure releases the rest. As the gas escapes through the puck during a shot, it carries dissolved oils, melanoidins (the brown roast compounds), and surfactant proteins with it. Once the liquid is in the cup, the gas-oil-protein mixture stabilizes as a thin foam — that is crema.</p>'
          + '<p>The color (golden to reddish-brown) comes from the suspended oils and melanoidins; the texture (thick or thin) comes from how much CO2 the beans had and how well the pressure built up. Fresh beans have lots of CO2 and produce more crema; beans that have been ground or sitting in an open bag for a week have less.</p>',
      },
      {
        heading: 'Why crema is a poor quality signal',
        body:
          '<p>This is where most home baristas go wrong. Crema is a sign that <em>something</em> happened correctly, but it does not tell you whether the shot tastes good. Several common situations produce abundant crema with a bad cup:</p>'
          + '<ul>'
          + '<li><strong>Robusta blends</strong> — robusta beans naturally produce more crema than arabica. Italian supermarket espresso blends (Lavazza Rossa, many cafe-style blends) include robusta partly for the visual crema. They also tend toward harsh, rubbery flavors that specialty drinkers reject.</li>'
          + '<li><strong>Very dark roasts</strong> — heavy roasting produces lots of CO2 and breaks down cell walls, so even bad-tasting dark roasts can pour with thick orange crema.</li>'
          + '<li><strong>Pressurized portafilter baskets</strong> — the dual-wall baskets that ship with most entry machines force fake crema by passing the shot through a small orifice. The result looks like crema and is mostly air bubbles.</li>'
          + '<li><strong>Channeling with good beans</strong> — a channel-y shot from fresh, well-roasted beans can still produce a layer of crema, hiding the underlying defect.</li>'
          + '</ul>'
          + '<p>Conversely, modern light-roasted specialty coffee often produces <em>less</em> crema — the beans have shorter degas times, the roast develops fewer melanoidins, and the shot is intentionally pulled longer (1:2.5-1:3) to extract enough. A pale, thin-cremad shot from a Ethiopian single origin pulled by a competent barista can be the best espresso in the room.</p>',
      },
      {
        heading: 'What crema actually tells you',
        body:
          '<p>A few things, if you read it carefully:</p>'
          + '<ul>'
          + '<li><strong>No crema at all</strong> — likely stale beans (more than 4-6 weeks post-roast), or the machine failed to reach pressure (broken OPV, pump issue, etc.).</li>'
          + '<li><strong>Big white bubbles dissolving fast</strong> — pressurized basket, not real crema.</li>'
          + '<li><strong>Pale, watery shot with no crema and bright stripes underneath</strong> — likely a manual lever where the user pulled too gently, or a clogged group.</li>'
          + '<li><strong>Tiger striping (dark and light streaks in the crema)</strong> — used to be considered "perfect espresso" in older guides. Today most specialty baristas note it correlates with dark roast + robusta blends; not a quality marker by itself.</li>'
          + '</ul>'
          + '<p>The reliable quality indicators are taste, mouthfeel, and shot time. Crema is a useful telltale but never the lead metric.</p>',
      },
      {
        heading: 'How long crema should last',
        body:
          '<p>A "well-built" crema sits on the surface for 1-3 minutes before dissolving back into the liquid. Crema that disappears in 30 seconds is fragile (low oil content, often stale or under-extracted); crema that persists past 5 minutes is suspect (extra-thick robusta or fake from a pressurized basket).</p>'
          + '<p>If you are drinking the espresso straight, the crema texture is part of the experience — bitter and slightly acrid by itself, but it integrates into the body as you sip. If you are pouring milk for a latte or cappuccino, stir the crema into the espresso first; pouring milk on top of intact crema produces a layered, unbalanced drink.</p>',
      },
    ],
    examples: [
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus produces visually generous crema partly because it ships with a pressurized "dual-wall" basket. Swap to a single-wall basket and the crema thins out — but the shot starts to taste like real coffee instead of foamed concentrate.',
      },
      {
        asin: 'B073FNT7T8',
        note:
          'The Flair Classic Signature is a manual lever — crema volume depends entirely on user pressure technique and bean freshness. A useful counter-example because crema variability is exposed without software smoothing it out.',
      },
      {
        asin: 'B07RZD5VQB',
        note:
          'The Cafelat Robot, also a manual lever, often produces thinner crema than pump machines at the same recipe — not because the shot is worse, but because the pressure profile is gentler. Good machine for unlearning the "more crema is better" instinct.',
      },
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro is sometimes critiqued for "thin crema" out of the box. Most of the time the cause is the included pressurized basket — swap to a single-wall and pair with fresh beans and the crema reads normal, but the shot quality is what changes.',
      },
    ],
    faqs: [
      {
        question: 'Is more crema better?',
        answer:
          'No. Crema volume correlates with bean freshness, roast level, and pressurization, but not with shot quality. Light-roasted specialty coffee often produces less crema than a stale dark-roasted blend, while tasting dramatically better.',
      },
      {
        question: 'Why does my espresso have no crema?',
        answer:
          'Most common cause: stale beans (more than 4-6 weeks post-roast, or pre-ground for more than a week). Second most common: the machine failed to reach 9 bar (broken OPV, pump issue, or wrong basket type). Third: the beans were roasted very light and just produce less crema by nature.',
      },
      {
        question: 'Why is my crema bright orange and full of big bubbles?',
        answer:
          'You are likely using a pressurized portafilter basket (the one with a single hole in the bottom plate, ships standard with most entry machines). It forces crema by aerating the shot. Real crema from a single-wall basket has finer bubbles and a deeper reddish-brown color.',
      },
      {
        question: 'Does robusta really produce more crema?',
        answer:
          'Yes. Robusta beans contain about twice the chlorogenic acid and significantly more solids that contribute to crema stability. Italian commercial blends often include 10-30% robusta partly for the visual effect. Specialty roasters generally avoid robusta because of the flavor cost.',
      },
      {
        question: 'Should I stir the crema into the espresso before drinking?',
        answer:
          'For tasting, yes — most professional cupping and dialing-in is done after stirring. For visual presentation (latte art, photography), leave it on top. Drinking straight, it is preference: stirring distributes the flavor; not stirring gives a layered tasting experience as the crema bitter notes hit first.',
      },
      {
        question: 'Can I judge a cafe by their crema?',
        answer:
          'Only loosely. A pale or non-existent crema usually means stale beans, which is a real red flag. But abundant crema only tells you the beans are fresh enough to produce gas — not whether the roast is good, the grind is right, or the barista pulled a balanced shot.',
      },
    ],
    relatedTermSlugs: ['extraction', 'nine-bar-pressure', 'pre-infusion', 'bottomless-portafilter'],
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 14. E61 GROUP HEAD — arquitectura prosumer.
  //
  // Honest: explicar lineage histórico (Faema 1961) sin treat as best-ever.
  // Trade-offs: longer warmup, heavier, higher cost.
  // -------------------------------------------------------------------
  {
    slug: 'e61-group',
    title: 'What is an E61 group head? — Coffee Equipment Reviews',
    description:
      'E61 is a passively-heated 58mm brew group designed by Faema in 1961, now an open standard on most prosumer HX and dual-boiler machines. Plain explanation of how it works, its trade-offs, and which machines use it.',
    h1: 'What is an E61 group head?',
    tldr:
      'The E61 group head is a passively-heated 58mm brew group designed by Faema in 1961. Water circulates by thermosiphon through the group body, keeping it at brew temperature once warmed up. It is the de-facto open standard on most Italian prosumer heat-exchanger and dual-boiler machines today.',
    inDepth: [
      {
        heading: 'A 1961 design still in production',
        body:
          '<p>When Faema launched their E61 machine in 1961, the group head it carried was a leap forward: it integrated a thermosiphon loop that circulated hot water through the brass group body whenever the machine was on, keeping the group itself at brew temperature without an electric heater. Combined with a pre-infusion chamber and a three-position lever for mechanical activation, the design solved several problems at once.</p>'
          + '<p>Faema never patented the group head architecture as a closed standard, and over time most Italian prosumer manufacturers adopted the same basic design — same dimensions, same lever mechanism, same internal flow path. Today an "E61 machine" means a machine using this group, made by ECM, Rocket, Lelit, Profitec, Bezzera, Quick Mill, Izzo, and many others.</p>',
      },
      {
        heading: 'How the thermosiphon works',
        body:
          '<p>Inside an E61 group there is a small loop of plumbing connected to the boiler. Hot water rises from the boiler, travels through the group body, and falls back to the boiler as it cools. The natural convection runs continuously while the machine is on. After 20-40 minutes of warmup, the heavy brass body of the group is fully heat-soaked — sitting at brew temperature with very high thermal mass, so a shot does not cool the group meaningfully.</p>'
          + '<p>The mechanical lever has three positions: down (off / brew complete), middle (pre-infusion, water at line pressure 1-2 bar), and up (full pump pressure to 9 bar). Lifting the lever opens the mushroom valve inside the group, allowing line-pressure water onto the puck before you commit to full pressure.</p>',
      },
      {
        heading: 'What E61 buys you',
        body:
          '<ul>'
          + '<li><strong>Excellent thermal stability</strong> once warmed up — large brass mass means shot-to-shot drift is minimal.</li>'
          + '<li><strong>Mechanical pre-infusion</strong> built-in, no software or aftermarket parts.</li>'
          + '<li><strong>Cross-brand serviceability</strong> — most E61 parts (gaskets, screens, mushroom valves, dispersion blocks) are commodity items shared across manufacturers. A 1990s E61 group accepts modern aftermarket parts; modern groups accept 1990s parts. This is unusual in any consumer category and a real long-term value driver.</li>'
          + '<li><strong>Aesthetic consistency</strong> — the chrome dome and three-position lever are visual shorthand for "serious espresso machine," which matters for some buyers.</li>'
          + '</ul>',
      },
      {
        heading: 'The real trade-offs',
        body:
          '<p>E61 is not "best group head ever made" — it is a specific design with specific costs:</p>'
          + '<ul>'
          + '<li><strong>Long warmup</strong> — 20-40 minutes for full thermal soak. Some owners run smart plugs on a timer; others accept the morning ritual. Either way, instant-coffee speed is not on the menu.</li>'
          + '<li><strong>Weight and footprint</strong> — the brass mass that gives stability also means a typical E61 machine weighs 15-25 kg and sits 35-45 cm deep on the counter.</li>'
          + '<li><strong>Cost floor</strong> — the cheapest reliable E61 machines start around $1,200 (Rocket Appartamento, Lelit Anna). Below that, "E61-style" machines often cut corners on the thermosiphon implementation.</li>'
          + '<li><strong>Saturated groups beat it on paper</strong> — La Marzocco saturated groups (where the group is integral with the brew boiler) have even higher thermal stability than E61. But saturated-group machines start around $3,500+.</li>'
          + '</ul>',
      },
      {
        heading: 'When E61 is the right answer',
        body:
          '<p>E61 makes sense when (a) you are buying in the $1,200-3,000 prosumer range, (b) you value cross-brand parts availability for 10+ year ownership, (c) the morning warmup window does not bother you, and (d) you want mechanical pre-infusion without software dependencies. For users below $1,000 or those wanting instant warmup, E61 is not the answer — a saturated thermoblock with PID (Breville Bambino) or a single-boiler with PID (ECM Classika PID, Lelit Anna) gets you to better shots faster.</p>',
      },
    ],
    examples: [
      {
        asin: 'B08FZB7N9V',
        note:
          'The Lelit Mara X PL62X pairs a classic E61 group with electronic temperature management on the HX coil — a smart modernization that keeps the mechanical pre-infusion feel while reducing the cooling-flush variable.',
      },
      {
        asin: 'B01N6DZJVQ',
        note:
          'The Rocket Appartamento is the canonical entry-level E61 HX machine — Italian-made, all the cross-brand parts compatibility, designed specifically for smaller home kitchens.',
      },
      {
        asin: 'B07D8YHHG9',
        note:
          'The Profitec Pro 300 is a compact dual-boiler with full E61 — German-made, prosumer build, full E61 thermal mass at a relatively small footprint.',
      },
      {
        asin: 'B09F2HFGHN',
        note:
          'The Rancilio Silvia Pro X uses a 58mm group similar in lineage to E61 but with their own modifications — a useful counter-example for understanding what E61 specifically brings versus other 58mm prosumer designs.',
      },
    ],
    faqs: [
      {
        question: 'Why does E61 take so long to warm up?',
        answer:
          'The group body is a 2-3 kg block of brass that has to reach brew temperature throughout via passive thermosiphon from the boiler. With cold brass and cold water, 20-40 minutes is typical. Once warm, the thermal mass is the entire point — shots stay stable through cup after cup.',
      },
      {
        question: 'Can I leave my E61 machine on all the time?',
        answer:
          'Many owners do. Power draw at steady state is roughly 50-100W depending on machine — comparable to leaving a couple of incandescent bulbs on. A smart plug with a morning schedule is the most common middle ground: machine on 30 minutes before you wake up, off after breakfast.',
      },
      {
        question: 'Is E61 really an "open standard"?',
        answer:
          'Functionally yes, legally no — there is no formal standards body. Faema never enforced patents on the design and the Italian prosumer industry converged on the same architecture. The result is wide parts compatibility but not a guaranteed contract. Always double-check part dimensions for your specific machine.',
      },
      {
        question: 'Is E61 better than a saturated group?',
        answer:
          'No, but cheaper. Saturated groups (La Marzocco, some ECM models) have higher thermal stability because the group is the brew boiler. E61 is the sweet spot for $1,200-3,000 prosumer machines; saturated is for $3,500+ commercial-grade home machines.',
      },
      {
        question: 'Can I add flow control to an E61 machine?',
        answer:
          'Yes. The most popular mod is replacing the brew lever with a "flow control" lever that has a needle valve, letting the user manually throttle pressure during the shot for pressure profiling. Aftermarket kits (Naked Portafilter, BPlus, Pesado) sell for $150-300 and install in 30 minutes.',
      },
      {
        question: 'Why is the chrome dome on top of the group?',
        answer:
          'It is the cap of the thermosiphon loop. Water rises from the boiler into the dome, then falls down through the group body and back to the boiler. The dome shape is functional (it provides volume for the loop turnaround) but has become an aesthetic signature of the category.',
      },
    ],
    relatedTermSlugs: ['group-head', 'heat-exchanger', 'dual-boiler', 'pre-infusion', 'portafilter'],
    relatedBestSlugs: ['best-prosumer-espresso-machine-under-2000', 'best-dual-boiler-espresso-machine'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 15. OPV (Over-Pressure Valve).
  //
  // Anti-gray-hat MUY explícito: warning sobre warranty void si user
  // modifica antes de garantía expirar. NO push de OPV mod como
  // universal "must do".
  // -------------------------------------------------------------------
  {
    slug: 'opv',
    title: 'What is an OPV (over-pressure valve) in an espresso machine? — Coffee Equipment Reviews',
    description:
      'OPV caps brew pressure by venting excess water back to the tank. Plain explanation of what it does, why some users mod it, and the warranty and safety trade-offs.',
    h1: 'What is an OPV (over-pressure valve)?',
    tldr:
      'An OPV (over-pressure valve) is a spring-loaded valve that caps the brew pressure inside an espresso machine. When the pump pushes harder than the valve\'s set point, the valve opens and bleeds excess water back to the tank, keeping puck pressure at the target (usually 9-10 bar).',
    inDepth: [
      {
        heading: 'Why an OPV exists',
        body:
          '<p>Vibratory pumps in entry and mid-tier espresso machines are advertised at 15 bar or 20 bar — much higher than the 9 bar that espresso actually wants on the puck. The reason is that pump pressure is the unloaded maximum; under flow restriction (which is exactly what a tamped puck creates), pressure ramps quickly and would exceed safe levels without something to cap it.</p>'
          + '<p>The OPV is that cap. It is essentially a spring pressing against a ball or piston that blocks an outlet to the tank. Below the target pressure, the spring keeps the outlet closed and all water goes to the group head. Above the target, the spring compresses, the outlet opens, and excess water flows back to the tank instead of the puck. The user sees a steady 9 bar at the group regardless of what the pump is trying to do.</p>',
      },
      {
        heading: 'Factory settings vs the "OPV mod"',
        body:
          '<p>Most prosumer machines ship with OPV set to roughly 9-10 bar at the factory. Some entry machines (most famously the Gaggia Classic Pro pre-2023) shipped with OPVs set as high as 12-15 bar — measurably too high. This produced visible "stripes" or channeling and noticeably bitter shots until users discovered they could adjust the spring tension to drop the setpoint.</p>'
          + '<p>The "OPV mod" became one of the most-discussed modifications in the Gaggia Classic community: open the case, find the OPV, loosen the spring screw by a quarter turn or so, and recheck pressure with a blind basket and a portafilter gauge. Done correctly, it produces a measurable cleaner-tasting shot. Done incorrectly, it produces an under-pressured shot or, in rare cases, a leaking valve.</p>',
      },
      {
        heading: 'The warranty problem (read this first)',
        body:
          '<p>Opening the case of an espresso machine voids the manufacturer warranty on most brands. Gaggia, Rancilio, Breville, and De\'Longhi all treat enclosure breach as warranty-voiding unless done by an authorized service center. If your machine is still under warranty (1-2 years for most consumer brands, longer for some prosumer), modifying the OPV before the warranty expires means you are trading $50-200 of expected shot improvement against potentially thousands of dollars of repair coverage.</p>'
          + '<p>Our editorial position: do not mod OPV during warranty unless the factory pressure is genuinely defective (12+ bar verified by a portafilter gauge) and the manufacturer refuses to address it. After warranty expires, the calculus changes — the mod is well-documented for popular machines and reversible if done conservatively.</p>',
      },
      {
        heading: 'Pressure profiling and "low-pressure" extraction',
        body:
          '<p>Beyond simple OPV adjustment, some users go further: replacing the OPV with an adjustable needle valve for pressure profiling, or installing a paddle valve to manually throttle pressure during the shot. The pressure-profiling community generally targets 6-7 bar rather than 9, claiming cleaner extraction with less channeling.</p>'
          + '<p>This is an active debate. Some blind tastings show preference for lower pressure; some show no difference. The most defensible position is that the optimal pressure depends on the bean, the basket, and the grind — not that any specific number is universally better. Pressure profiling is worth experimenting with, but not because someone told you 9 bar is wrong.</p>',
      },
      {
        heading: 'When you can ignore OPV entirely',
        body:
          '<p>Most users never need to think about OPV. If your shots taste balanced, your puck knocks out cleanly, and your machine is under warranty, leave the valve alone. The OPV is a problem-solving tool for specific complaints (overpressure symptoms, repeatable bitterness despite good puck prep) and a tinkering surface for users who enjoy modifying their machine. It is not a "must do" upgrade.</p>',
      },
    ],
    examples: [
      {
        asin: 'B083TQR8BV',
        note:
          'The Gaggia Classic Pro is the most-modded OPV machine in the home category. The mod community is active and well-documented, but the mod also voids warranty — most owners wait until year three before opening the case.',
      },
      {
        asin: 'B0B5BC5VXM',
        note:
          'The Gaggia Classic Evo Pro ships with a lower-set OPV from the factory (closer to 9-10 bar) than the older Gaggia Classic Pro. Useful as a counter-example: when manufacturer addresses the issue at factory, the aftermarket mod becomes unnecessary.',
      },
      {
        asin: 'B0BQYMTBNL',
        note:
          'The Rancilio Silvia V6 ships with factory OPV at roughly 10 bar — not a candidate for the mod for most users. Different platform philosophy: ship correct from the factory, no aftermarket adjustment expected.',
      },
      {
        asin: 'B01N6DZJVQ',
        note:
          'The Rocket Appartamento (and most Italian prosumer machines) ship with OPV correctly set and use rotary pumps in higher-tier siblings. OPV adjustment is a non-conversation in the prosumer segment.',
      },
    ],
    faqs: [
      {
        question: 'Should I do the OPV mod on my machine?',
        answer:
          'Only if (a) your machine is out of warranty, (b) you have evidence the factory OPV is set too high (measure with a portafilter pressure gauge first), and (c) you are comfortable opening the case and adjusting a spring screw with verification. Otherwise, no — the upside is real but small, and the warranty cost is real and large.',
      },
      {
        question: 'How do I check what pressure my OPV is set to?',
        answer:
          'Buy a portafilter pressure gauge ($30-50) and screw it in like a blind basket. Run the machine on a "shot" cycle — the gauge reads the static pressure when no water is flowing. If it reads 9-10 bar, you are fine. If it reads 12+ bar, the OPV may be set high.',
      },
      {
        question: 'Will modding OPV void my warranty?',
        answer:
          'On most brands (Gaggia, Breville, De\'Longhi, Rancilio), yes — opening the case voids the warranty. Some prosumer brands explicitly allow user OPV adjustment within a documented range; check your manual. When in doubt, contact the manufacturer before opening.',
      },
      {
        question: 'Can the OPV fail and cause problems?',
        answer:
          'Yes. A stuck-closed OPV will overpressure the puck (sour, fast shots, possible group damage). A stuck-open OPV will under-pressure (watery shots, no crema). Failure is rare but happens after years of use; replacement OPV valves are commodity parts available from most prosumer parts suppliers.',
      },
      {
        question: 'Is 9 bar really the right pressure?',
        answer:
          'It is the conventional target, dating back to commercial espresso machine design from the 1950s. Some modern baristas argue 6-7 bar produces cleaner extraction, and pressure profiling lets you ramp through different pressures during the shot. There is no single "correct" pressure — 9 bar is a safe, well-tested default rather than an optimum.',
      },
      {
        question: 'How is OPV different from a 3-way solenoid valve?',
        answer:
          'OPV regulates brew pressure during the shot. A 3-way solenoid valve vents the puck back to the drip tray when the shot ends, leaving a dry puck. Different valves, different jobs — many machines have both.',
      },
    ],
    relatedTermSlugs: ['nine-bar-pressure', 'pre-infusion', 'solenoid-valve', 'extraction'],
    relatedBestSlugs: ['best-espresso-machine-under-500'],
    relatedTroubleshootSlugs: ['gaggia-classic-opv-mod', 'channeling-fix-espresso'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 16. THERMOJET.
  //
  // Factual — marketing name de Breville para un thermoblock variant.
  // Pros/cons sin defender ni atacar el brand.
  // -------------------------------------------------------------------
  {
    slug: 'thermojet',
    title: 'What is the Breville ThermoJet heating system? — Coffee Equipment Reviews',
    description:
      'ThermoJet is Breville\'s branded thermoblock-style heater, marketed for its 3-second warmup. Plain explanation of how it differs from a boiler and where the trade-offs land.',
    h1: 'What is the Breville ThermoJet heating system?',
    tldr:
      'ThermoJet is Breville\'s branded thermoblock-style heater, used in the Bambino, Bambino Plus, Barista Pro, and other Breville machines. It heats water on demand instead of holding a tank of hot water, reaching brew temperature in roughly 3 seconds from cold. It is a thermoblock variant, not a boiler equivalent.',
    inDepth: [
      {
        heading: 'What ThermoJet actually is',
        body:
          '<p>ThermoJet is a brand name. The underlying technology is a thermoblock — a metal block (usually aluminum) with a thin water passage drilled through it and a heating element bonded to the outside. When you trigger a shot, water flows through the passage and the heater warms it as it passes. Unlike a traditional thermoblock that warms a slug of water, ThermoJet is engineered for very fast response time and tight inlet/outlet temperature control via Breville\'s firmware.</p>'
          + '<p>The "3-second warmup" marketing claim is real but specific: from machine power-on, ThermoJet can heat its small internal volume to brew temperature in about that time. It does not mean the machine is fully ready in 3 seconds — the group head, portafilter, and basket still need to heat-soak, which Breville handles with a 15-30 second post-power-on routine on most ThermoJet machines.</p>',
      },
      {
        heading: 'How ThermoJet differs from a traditional boiler',
        body:
          '<p>A boiler holds a tank of water at brew temperature continuously, which gives it large thermal mass. A thermoblock (including ThermoJet) heats water as it passes, which gives it small thermal mass. The trade-offs are:</p>'
          + '<ul>'
          + '<li><strong>Warmup speed</strong> — ThermoJet wins decisively. A boilered machine takes 5-25 minutes to reach stability; ThermoJet is shot-ready in under 30 seconds.</li>'
          + '<li><strong>Standby power</strong> — ThermoJet wins. There is no tank of hot water to maintain.</li>'
          + '<li><strong>Shot-to-shot temperature stability</strong> — boilers win. Pulling shot two while still hot from shot one drifts more on ThermoJet than on a boilered machine.</li>'
          + '<li><strong>Long-pull stability</strong> — boilers win. A 45-second shot of light roast pulled at temperature drifts cooler on ThermoJet because the heater can struggle to keep up with continuous flow.</li>'
          + '<li><strong>Steam capability</strong> — boilered machines (especially dual boilers) win for steaming. ThermoJet steams milk acceptably but with less steam volume than a dedicated steam boiler.</li>'
          + '</ul>',
      },
      {
        heading: 'Breville\'s compensation strategy',
        body:
          '<p>Breville pairs ThermoJet with several software features that compensate for the lower thermal mass: programmed pre-infusion (saturates the puck slowly to give the heater time to catch up), shot temperature presets, and post-shot purge cycles that re-stabilize the heater between shots. The combination delivers shot-to-shot quality that is closer to a boilered machine than the raw architecture would suggest.</p>'
          + '<p>This is why a Breville Bambino Plus (ThermoJet) pulls shots at home that compete with boilered single-boiler machines at the same price. The hardware has limits, but the software-and-hardware system is well-engineered. It is not magic — it is competent engineering with honest trade-offs.</p>',
      },
      {
        heading: 'When ThermoJet is the right call',
        body:
          '<p>ThermoJet makes sense when (a) you want espresso ready quickly without waiting for warmup, (b) you pull one or two shots in a session rather than running a coffee shop at home, (c) you value low standby power and small footprint, and (d) you are buying under $700. Above $1,000, the boilered alternatives (Lelit Anna, ECM Classika PID, prosumer single-boilers) start to dominate for users who prioritize shot-to-shot consistency over warmup time.</p>'
          + '<p>ThermoJet is not the right call if you (a) need to pull 5+ back-to-back shots, (b) are dialing very light roasts where 0.5°C precision matters, or (c) want commercial-grade steam pressure for latte art at scale.</p>',
      },
    ],
    examples: [
      {
        asin: 'B07VFZHRYC',
        note:
          'The Breville Bambino Plus is the smallest ThermoJet machine in the Breville lineup. The combination of fast warmup, software pre-infusion, and auto-frother makes it one of the best-selling sub-$500 espresso machines.',
      },
      {
        asin: 'B07QGCS2KW',
        note:
          'The Breville Barista Pro is a step up — same ThermoJet heater, but adds an integrated grinder, manual steam wand, and a larger user interface. Useful as the canonical "Breville ThermoJet plus grinder" product.',
      },
      {
        asin: 'B0BTBHC9JV',
        note:
          'The Breville Barista Touch Impress also uses ThermoJet but layers on assisted tamping and a touch screen. Same thermal architecture, more guidance for beginners.',
      },
      {
        asin: 'B00CH9182U',
        note:
          'The Breville Barista Express predates ThermoJet — it uses a traditional thermocoil. A useful comparison: same brand, similar size, older heating tech. Owners can compare warmup time and shot consistency directly.',
      },
    ],
    faqs: [
      {
        question: 'Is ThermoJet a boiler?',
        answer:
          'No. ThermoJet is a thermoblock — it heats water on demand instead of holding a tank of hot water at temperature. The "Jet" branding refers to the fast warmup, not to a tank-based architecture.',
      },
      {
        question: 'Can a ThermoJet machine pull as good a shot as a boilered machine?',
        answer:
          'For one or two shots in a session, with medium roasts and reasonable puck prep, yes — at the price point Breville sells ThermoJet machines (under $1,000), shot quality is genuinely competitive. For demanding light-roast dialing or 5+ back-to-back shots, a boilered machine has measurable advantages.',
      },
      {
        question: 'Why does my ThermoJet machine drift in temperature between shots?',
        answer:
          'Lower thermal mass than a boilered machine. After a hot shot, the heater carries some extra heat that shows up in the next shot. Breville mitigates this with software, but the architecture limits how completely the issue can be eliminated. A 30-60 second pause between back-to-back shots helps.',
      },
      {
        question: 'How much faster is ThermoJet warmup vs a boilered machine?',
        answer:
          'Roughly an order of magnitude. Boilered single boilers take 5-15 minutes to stabilize; E61 prosumer machines take 20-40 minutes; ThermoJet machines are shot-ready in 15-30 seconds. The practical difference is "leave it on a timer" vs "press button when you want espresso."',
      },
      {
        question: 'Does ThermoJet have PID?',
        answer:
          'Effectively yes — the firmware that controls ThermoJet flow-through temperature is PID-style closed-loop control. Marketing rarely uses the "PID" label for ThermoJet because the architecture is different from a thermistor-on-a-boiler implementation. The result is similar tight temperature control during the shot itself.',
      },
      {
        question: 'Can I replace a broken ThermoJet element?',
        answer:
          'Authorized Breville service centers replace ThermoJet assemblies as a unit. Aftermarket parts exist but are scarce, and the assembly is integrated more tightly than a removable boiler. Most owners with a failed ThermoJet on an out-of-warranty machine evaluate whether to repair or replace the whole machine.',
      },
    ],
    relatedTermSlugs: ['thermoblock', 'pid-controller', 'boiler', 'pre-infusion'],
    relatedBestSlugs: ['best-espresso-machine-under-500', 'best-espresso-machine-for-small-kitchen'],
    relatedHowToSlugs: ['how-to-dial-in-espresso-bambino-plus'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 17. SPECIALTY GRADE COFFEE.
  //
  // Usar definition del SCA (≥80 points). No claim arbitrario.
  // -------------------------------------------------------------------
  {
    slug: 'specialty-grade',
    title: 'What is specialty grade coffee? — Coffee Equipment Reviews',
    description:
      'Specialty grade coffee scores 80+ on the Specialty Coffee Association\'s 100-point cupping scale. Plain explanation of how the grading works, what it does and does not promise, and where to find it.',
    h1: 'What is specialty grade coffee?',
    tldr:
      'Specialty grade coffee is green coffee that has been cupped by a certified Q grader and scored 80 points or higher on the Specialty Coffee Association\'s 100-point scale. The grade indicates absence of major defects and presence of positive flavor attributes — it is the industry threshold that separates "specialty" from "commodity" coffee.',
    inDepth: [
      {
        heading: 'The 80-point threshold',
        body:
          '<p>The Specialty Coffee Association (SCA) developed a 100-point cupping protocol in the early 2000s that became the global standard for evaluating green coffee. Trained Q graders (certified by the Coffee Quality Institute, CQI) score samples on ten attributes — fragrance/aroma, flavor, aftertaste, acidity, body, balance, uniformity, clean cup, sweetness, and overall — with up to 10 points each.</p>'
          + '<p>Coffees scoring 80 or higher are classified as "specialty." Coffees scoring below 80 are "commercial" or "commodity" grade. The 80-point line is the most widely-used quality threshold in the green coffee trade, used by buyers, exporters, certifications, and competition rules. Within specialty, scores cluster: 80-84 is "very good," 85-89 is "excellent," and 90+ is "outstanding" (rare in commercial volumes).</p>',
      },
      {
        heading: 'What specialty grade does promise',
        body:
          '<ul>'
          + '<li><strong>No more than 5 defects</strong> per 350g sample, counted by a defect-classification system that distinguishes "primary" defects (full black beans, sour beans, foreign matter) from "secondary" defects (insect-damaged, broken, etc.).</li>'
          + '<li><strong>No primary defects at all</strong> in a specialty-grade sample.</li>'
          + '<li><strong>Positive flavor attributes</strong> in detectable presence — sweetness, acidity, distinct flavor notes — rather than just absence of bad ones.</li>'
          + '<li><strong>Consistent moisture content</strong> (10-12% for properly processed greens) and proper preparation (drying, sorting, bagging).</li>'
          + '</ul>'
          + '<p>The grade is assigned to green coffee — before roasting. A specialty-grade green bean is the input; what the roaster does with it determines whether you taste those positive attributes in the cup.</p>',
      },
      {
        heading: 'What specialty grade does not promise',
        body:
          '<p>This is where most marketing gets fuzzy. The 80+ score does not promise:</p>'
          + '<ul>'
          + '<li><strong>Anything about the roast.</strong> A bag of specialty-grade green roasted dark and shipped 12 weeks ago will taste like burnt commodity coffee. Roast date and roast level matter as much as the green grade.</li>'
          + '<li><strong>Anything about freshness.</strong> Pre-ground specialty-grade coffee in a supermarket bag is technically still specialty grade by green score, but the taste is unrecognizable.</li>'
          + '<li><strong>Specific flavor characteristics.</strong> A 82-point Brazilian and a 86-point Ethiopian both qualify; the experiences are completely different.</li>'
          + '<li><strong>Ethical sourcing.</strong> Specialty grade is a quality classification, not an ethics certification. Fair Trade, Direct Trade, organic, and other labels are separate. Most third-wave roasters use specialty-grade beans AND pay above-commodity prices, but the grade itself does not promise either.</li>'
          + '</ul>',
      },
      {
        heading: 'Where you actually see specialty grade',
        body:
          '<p>Roasters who source from specialty-grade greens almost always say so on their bag. Look for cupping scores (often printed: "87.5 points," "Q grader: J. Smith"), origin/farm specificity (single farms, named cooperatives), recent roast dates (within 4-8 weeks), and detailed processing info (washed, natural, honey). Generic supermarket coffee — even when labeled "premium" or "gourmet" — almost never makes specialty grade claims because most of it does not qualify.</p>'
          + '<p>Direct-trade roasters (Counter Culture, Onyx, Black & White, Sey, La Cabra, dozens of regional roasters) source almost exclusively specialty-grade. Subscription services like Trade Coffee, Atlas Coffee Club, and Mistobox curate specialty-grade roasters. Cafes that flag themselves as "specialty" or "third-wave" generally serve specialty-grade beans.</p>',
      },
      {
        heading: 'Does it taste better than commodity coffee?',
        body:
          '<p>Generally yes — but the gap is bigger than most casual drinkers expect. A well-roasted, fresh 84-point coffee tastes dramatically different from a commodity blend: cleaner, sweeter, with distinct origin character (florals from Ethiopia, chocolates from Brazil, fruits from Kenya) rather than uniform "coffee" flavor. The first time a casual drinker tastes a fresh specialty pour-over after years of supermarket coffee is usually a recalibration moment.</p>'
          + '<p>That said, "better" depends on what you are after. If you want cream-and-sugar coffee that tastes the same every day, commodity coffee blends are engineered for that and do it well. Specialty coffee is for drinkers who want to taste origin, harvest, and processing variation — which is a feature for some and a chore for others.</p>',
      },
    ],
    examples: [
      {
        asin: 'B0BC4FQDD1',
        note:
          'The 1Zpresso JX-Pro hand grinder is one of the most-recommended pour-over grinders for users brewing specialty-grade single origins. Pair-relevant rather than a bean itself, but typical of the "I bought specialty beans, now I need a grinder" upgrade path.',
      },
      {
        asin: 'B0B7B6Z5DH',
        note:
          'The Fellow Ode Gen 2 is a single-dose home electric grinder built specifically for filter brewing of specialty-grade beans — flat burrs, low retention, designed for switching between origins.',
      },
      {
        asin: 'B00005LM0L',
        note:
          'The Hario V60-02 is the canonical pour-over dripper for serving specialty-grade coffee in a way that showcases origin notes. Pairs naturally with the kind of single-origin specialty beans that score 85+.',
      },
    ],
    faqs: [
      {
        question: 'Is "specialty coffee" the same as "specialty grade coffee"?',
        answer:
          'Mostly yes, in common usage. "Specialty grade" is the technical SCA classification (80+ points on green coffee); "specialty coffee" is the broader industry/cultural movement built around using specialty-grade beans, transparent sourcing, and skilled roasting. A specialty cafe serves specialty-grade coffee almost by definition.',
      },
      {
        question: 'Who certifies a coffee as specialty grade?',
        answer:
          'A certified Q grader — a coffee professional who has passed the CQI Q certification (22 sensory and identification tests over 6 days). Q graders work for buyers, exporters, roasters, and competition organizers. Their cupping scores are the basis for the specialty designation.',
      },
      {
        question: 'Is decaf coffee ever specialty grade?',
        answer:
          'Yes. Specialty-grade decaf exists (most often Swiss Water Process or sugar cane / ethyl acetate decaffeinated) and many third-wave roasters carry one or two decaf options. The decaffeination process itself does not disqualify a coffee from specialty grading.',
      },
      {
        question: 'Does specialty grade mean expensive?',
        answer:
          'Usually more expensive than commodity ($16-25 per 12oz bag is typical vs $8-12 for commodity), but not crazy expensive. The pricing reflects (a) higher cost of green beans, (b) smaller-batch roasting, and (c) fresher inventory. The exception is rare microlots (Gesha, competition-grade Ethiopian) that command $30-100+ per bag.',
      },
      {
        question: 'Can pre-ground coffee be specialty grade?',
        answer:
          'Technically yes — the grade is on the green bean, not the format. Practically, almost all specialty roasters sell whole bean only or recommend grinding fresh, because pre-ground specialty coffee loses most of its origin character within 1-2 weeks. The 80+ score is unchanged but the practical cup quality is diminished.',
      },
      {
        question: 'Are subscription services specialty grade?',
        answer:
          'The reputable ones (Trade Coffee, Atlas Coffee Club, Mistobox, Bean Box) curate specialty-grade roasters and tell you the score. Some lower-cost subscriptions ship commodity-grade beans in fancy packaging — check the roast date and cupping notes on the bag rather than relying on marketing copy.',
      },
    ],
    relatedTermSlugs: ['q-grader', 'single-origin', 'blend', 'light-roast', 'medium-roast'],
    relatedBestSlugs: ['best-espresso-machine-for-light-roasts', 'best-grinder-for-pour-over-under-300'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 18. SINGLE DOSING GRINDERS.
  //
  // Explicar trade-offs honestamente. NO universal endorsement.
  // -------------------------------------------------------------------
  {
    slug: 'single-dosing',
    title: 'What is single dosing in a coffee grinder? — Coffee Equipment Reviews',
    description:
      'Single dosing is a grinder workflow where you weigh exactly one shot of beans and grind that dose, instead of filling a hopper. Plain explanation of the workflow, who benefits, and the real costs.',
    h1: 'What is single dosing in a coffee grinder?',
    tldr:
      'Single dosing is a grinder workflow where you weigh exactly one shot\'s worth of beans (typically 18g for espresso, 15-25g for filter) and grind only that dose, instead of filling a hopper with hundreds of grams of beans. The result: every session starts with fresh, properly-weighed coffee, and you can switch beans between shots.',
    inDepth: [
      {
        heading: 'How single dosing actually works',
        body:
          '<p>The workflow:</p>'
          + '<ol>'
          + '<li>Weigh out one shot\'s worth of beans on a scale (18.0 grams for a standard double espresso).</li>'
          + '<li>Drop the beans into the grinder hopper or chute (some grinders have a small "single dose" cup that replaces the hopper; others just take loose beans through the bean cap).</li>'
          + '<li>Grind. The beans pass through the burrs and exit into the dosing cup or portafilter.</li>'
          + '<li>Tap the grinder a few times to dislodge any retained grounds. On low-retention grinders, this can be skipped.</li>'
          + '<li>Brew with that dose. The next session starts the same way.</li>'
          + '</ol>'
          + '<p>Compare with hopper-fed: dump 250g of beans into the hopper, grind a "dose by time" or "dose by weight" amount, walk away. The hopper holds beans for the next 12+ shots, but those beans sit exposed to air and lose freshness.</p>',
      },
      {
        heading: 'Why people single-dose',
        body:
          '<ul>'
          + '<li><strong>Bean switching</strong> — you can use a different coffee every shot without purging 30g of the old bean through the grinder first. Useful for cuppers, multi-bean households, and tasting flights.</li>'
          + '<li><strong>Freshness</strong> — beans in a hopper start staling within 24-48 hours of contact with air. A single-dose workflow keeps the unground beans in a sealed bag or vacuum canister until the moment of grinding.</li>'
          + '<li><strong>Dose accuracy</strong> — weighing each shot means your dose is exact every time, which improves shot consistency for users sensitive to ±0.5g variations.</li>'
          + '<li><strong>Cleaner countertop</strong> — no permanent bean hopper means a more minimal grinder footprint, which matters in small kitchens.</li>'
          + '</ul>',
      },
      {
        heading: 'What single dosing actually costs you',
        body:
          '<p>Single dosing is not free. The real trade-offs:</p>'
          + '<ul>'
          + '<li><strong>Time per shot.</strong> Weighing in, weighing out, tapping for retention — single dosing adds 30-60 seconds vs a hopper-fed grinder. For one shot a day this is invisible; for a household making 4 shots back-to-back, it adds up.</li>'
          + '<li><strong>Grinder selection matters more.</strong> Most hopper-fed grinders have 3-10g of retention by design — the beans in the hopper push the previous session\'s grounds through. Single dosing exposes that retention because you do not have hopper weight to mask it. Grinders explicitly designed for single dose (DF64, Niche Zero, Lagom P64) have under-1g retention.</li>'
          + '<li><strong>Scale dependency.</strong> You need a precise scale (0.1g resolution) and the habit of using it every shot. Weighing fatigue is real.</li>'
          + '<li><strong>Bean static and clumping.</strong> Single-dose grinders often need RDT (Ross Droplet Technique — a spritz of water on the beans before grinding) to reduce static. Hopper-fed grinders are less affected because the bean mass dampens static buildup.</li>'
          + '<li><strong>Workflow rigidity.</strong> "Grab and pull" — drop a few beans in, no scale, go — is harder. Single dosing rewards discipline more than spontaneity.</li>'
          + '</ul>',
      },
      {
        heading: 'When single dosing makes sense',
        body:
          '<p>Single dosing makes sense when (a) you regularly use more than one bean and want to switch without purging, (b) you are dialing light roasts or specialty single origins where small dose variation matters, (c) you value freshness over speed, or (d) you genuinely enjoy the weighing-and-grinding ritual. It is a deliberate workflow choice, not a universal best practice.</p>'
          + '<p>It does not make sense when you (a) drink one bean continuously for months at a time (a hopper just stores it), (b) need fast service for multiple drinks back-to-back, or (c) treat espresso as a quick utility rather than a hobby. A Eureka Mignon Specialita with hopper does great shots and takes 8 seconds; a Niche Zero with single dose takes 40 seconds and the cup is the same if you use the same beans.</p>',
      },
      {
        heading: 'Grinders designed for single dose',
        body:
          '<p>The category exploded between 2018 and 2024. The most-discussed options:</p>'
          + '<ul>'
          + '<li><strong>Niche Zero</strong> — 63mm conical burrs, near-zero retention, sold direct from UK. The reference single-dose home electric.</li>'
          + '<li><strong>DF64 / DF64 Gen 2</strong> — 64mm flat burrs, single-dose by design, much cheaper than Niche ($400-700 vs $700-900). Multiple OEM variants.</li>'
          + '<li><strong>Fellow Ode Gen 2</strong> — 64mm flat burrs, single-dose, filter-focused (not designed for espresso). Sleek aesthetic for kitchen counters.</li>'
          + '<li><strong>Lagom P64 / P100</strong> — premium tier, 64mm and 98mm flats, $1,200-2,500 for users who want top-end.</li>'
          + '</ul>'
          + '<p>You can also single-dose a hopper grinder by simply not filling the hopper — drop 18g in, grind, repeat. This works on some grinders better than others. Generally a grinder needs low retention and a workable bean drop path to make it usable; many traditional doser grinders fight you.</p>',
      },
    ],
    examples: [
      {
        asin: 'B0BQS69C9G',
        note:
          'The DF64 Single Dose Grinder is the budget single-dose champion — 64mm flat burrs, sub-1g retention, single-dose hopper, around $400. The "you do not need to spend $900 on a Niche" entry point.',
      },
      {
        asin: 'B08CXVZL8R',
        note:
          'The Niche Zero is the reference single-dose home electric — 63mm conical burrs, beautiful build, near-zero retention. The category-defining product for the workflow.',
      },
      {
        asin: 'B0B7B6Z5DH',
        note:
          'The Fellow Ode Gen 2 is a single-dose grinder built specifically for filter coffee (V60, AeroPress, Chemex). Not the best for espresso, but a great example of single-dose workflow for non-espresso brewers.',
      },
      {
        asin: 'B07YDPC1MK',
        note:
          'The Eureka Mignon Specialita is the counter-example: a hopper-fed grinder that you can single-dose by leaving the hopper empty, but it was not designed for the workflow. Retention is higher than single-dose-native grinders.',
      },
    ],
    faqs: [
      {
        question: 'Do I have to single-dose to get great espresso?',
        answer:
          'No. Plenty of award-winning baristas use hopper-fed grinders. Single dosing is a freshness-and-flexibility workflow choice. Cup quality from a well-tuned hopper grinder (Eureka Atom, Mahlkonig E65S) matches single-dose grinders at the same price tier.',
      },
      {
        question: 'What is retention and why does it matter for single dosing?',
        answer:
          'Retention is the grams of ground coffee a grinder keeps inside its chamber between sessions. For a hopper-fed grinder, retention does not matter much because the next session\'s beans push old grounds out. For single dosing, retention is the difference between getting fresh grounds in the cup and getting yesterday\'s grounds.',
      },
      {
        question: 'How do I single-dose a hopper-fed grinder?',
        answer:
          'Remove the hopper or run it empty. Drop 18g of beans through the bean cap. Grind. Tap the grinder body and underside of the burrs to dislodge retention. Repeat. It works, but not as cleanly as a purpose-built single-dose grinder.',
      },
      {
        question: 'Is single dosing wasteful?',
        answer:
          'No more than hopper-fed grinding. The beans are the same; the question is when they meet the burrs. Most single-dose workflows have similar or lower total bean waste because you do not purge between bean changes.',
      },
      {
        question: 'Why do single-dose grinders need RDT (water spritz)?',
        answer:
          'Without bean mass in the hopper to dampen static buildup, single-dose grinders produce statically-charged grounds that stick to chutes, dosing cups, and counters. A single drop of water on the beans before grinding (using a fine-mist spray bottle) drops static dramatically and reduces clumping.',
      },
      {
        question: 'Can I single-dose for both espresso and pour-over with one grinder?',
        answer:
          'Yes, if the grinder has a wide-enough grind range and acceptable retention at both ends. The Niche Zero, DF64, and Lagom P64 all do espresso and pour-over well. Espresso-only or filter-only grinders (Fellow Ode for filter, some Eureka models for espresso) lock you in.',
      },
    ],
    relatedTermSlugs: ['retention', 'static', 'doser', 'rpm', 'flat-burr', 'conical-burr'],
    relatedBestSlugs: ['best-grinder-under-500-with-low-retention', 'best-grinder-for-espresso'],
    relatedTroubleshootSlugs: ['niche-zero-retention-issues'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 19. FLAT BURR.
  //
  // Reconocer en FAQ que blind tasters no distinguen consistentemente.
  // -------------------------------------------------------------------
  {
    slug: 'flat-burr',
    title: 'What is a flat burr coffee grinder? — Coffee Equipment Reviews',
    description:
      'Flat burr grinders use two parallel disc-shaped burrs to crush beans. Plain explanation of how they differ from conicals, what flavor profile they tend toward, and how big the difference really is.',
    h1: 'What is a flat burr coffee grinder?',
    tldr:
      'A flat burr grinder uses two parallel disc-shaped burrs that face each other; beans are crushed as they travel outward from the center to the edge of the burrs. Flat burrs are common in commercial grinders and prosumer home electrics, often associated with cleaner, more separated cup profiles.',
    inDepth: [
      {
        heading: 'The flat burr geometry',
        body:
          '<p>A flat burr set consists of two ring-shaped metal discs with cutting teeth on one face. One burr is stationary; the other rotates. The two faces sit parallel to each other with a tiny gap (set by the grind adjustment) — typically 0.2-1.0 mm.</p>'
          + '<p>Beans enter at the center of the burrs (through a hole in the upper burr), get pulled outward by centrifugal force as the bottom burr spins, and are crushed progressively as they travel toward the edge. By the time they exit, they have been reduced through several increasingly-fine cutting teeth. The grounds drop out the side of the burr chamber into the chute.</p>',
      },
      {
        heading: 'How flat burr cup profile is described',
        body:
          '<p>The conventional wisdom in specialty coffee: flat burrs produce a more "separated" cup — meaning distinct, layered flavor notes you can pick out individually — and a "cleaner" mouthfeel with less mid-palate body. This is often phrased as flat burrs producing a "bimodal" particle distribution (two main particle size peaks instead of one) which extracts differently than conicals.</p>'
          + '<p>The flavor description sounds confident, but the underlying data is mixed (see the next section). What we can say with confidence: flat burrs are the dominant choice in competition (most World Barista Championship competitors use flat-burr grinders), in third-wave cafes, and in light-roast-focused home setups. That preference is meaningful, even if the mechanism is debated.</p>',
      },
      {
        heading: 'The honest take on flat vs conical',
        body:
          '<p>Several blind tastings — including ones conducted by James Hoffmann, Lance Hedrick, and the Specialty Coffee Association — have shown that even experienced tasters struggle to consistently identify which cup came from a flat burr vs a conical burr at the same grind setting and recipe. The differences exist, but they are smaller than the marketing copy suggests.</p>'
          + '<p>What does correlate strongly with cup quality:</p>'
          + '<ul>'
          + '<li>Burr alignment (more on flats — misaligned flats are common and tank cup quality).</li>'
          + '<li>Burr size (98mm beats 64mm beats 48mm, more so than flat vs conical).</li>'
          + '<li>Burr sharpness (sharp beats dull, on either geometry).</li>'
          + '<li>Bean freshness and roast level (overwhelms burr-geometry differences).</li>'
          + '</ul>'
          + '<p>So: do not buy a grinder based on "flat is better" or "conical is better." Buy based on retention, build quality, burr size, alignment quality, and the rest of the spec sheet. The flat-vs-conical axis is the smallest of the meaningful axes.</p>',
      },
      {
        heading: 'Flat burrs in home grinders',
        body:
          '<p>The popular flat-burr home grinders fall into a few clusters:</p>'
          + '<ul>'
          + '<li><strong>Entry / mid ($300-600):</strong> DF64 (64mm flats, single-dose), Eureka Mignon Specialita (55mm flats, hopper-fed), Fellow Ode Gen 2 (64mm flats, filter-only).</li>'
          + '<li><strong>Prosumer ($800-1,500):</strong> Eureka Atom 75 (75mm flats), Mahlkonig X54 (54mm flats), Eureka Atom Pro (espresso-focused).</li>'
          + '<li><strong>High-end ($1,500-3,000):</strong> Lagom P64, Option-O Lagom Mini, Mahlkonig E65S/EK43-style.</li>'
          + '</ul>'
          + '<p>The size jump from 54mm to 64mm to 75mm to 98mm matters more than most flat-vs-conical comparisons. Larger burrs grind faster, run cooler, and tend to have wider workable ranges.</p>',
      },
      {
        heading: 'Where flat burrs lose',
        body:
          '<p>Flat burrs are not universally better. Where conicals win:</p>'
          + '<ul>'
          + '<li>Footprint — conicals are typically more compact at the same burr capacity.</li>'
          + '<li>Motor RPM — conicals can spin slower (300-700 RPM) and still deliver acceptable grind speed; flats often need 1,200+ RPM, which generates more heat.</li>'
          + '<li>Dark roast / chocolate-forward profiles — many tasters prefer conicals for darker roasts where body and sweetness lead.</li>'
          + '<li>Beginner-friendliness — conicals are less alignment-sensitive, meaning a budget conical is more likely to perform near its specs than a budget flat.</li>'
          + '</ul>',
      },
    ],
    examples: [
      {
        asin: 'B0BQS69C9G',
        note:
          'The DF64 has 64mm flat burrs — the budget flat-burr reference grinder. Popular as the "first serious flat" for home users coming from a hopper-fed conical.',
      },
      {
        asin: 'B07YDPC1MK',
        note:
          'The Eureka Mignon Specialita uses 55mm flat burrs in a compact hopper-fed package — one of the best-selling prosumer flats in the home espresso category.',
      },
      {
        asin: 'B0987X9P6L',
        note:
          'The Mahlkonig X54 Home Grinder is the home version of Mahlkonig\'s commercial line — 54mm flat burrs with stepless adjustment, German build, dual espresso-and-filter capability.',
      },
      {
        asin: 'B0B7B6Z5DH',
        note:
          'The Fellow Ode Gen 2 uses 64mm flat burrs but is explicitly filter-only (no espresso fineness in the burr range). Useful example of flat-burr geometry applied to a non-espresso workflow.',
      },
    ],
    faqs: [
      {
        question: 'Are flat burrs better than conical burrs?',
        answer:
          'On paper, the conventional wisdom says yes for cleaner, more-separated cup profiles and for light roasts. In practice, blind tasters often cannot reliably distinguish them at the same recipe — the difference exists but is smaller than other variables like burr alignment, burr size, and bean freshness.',
      },
      {
        question: 'Why do most competitions use flat-burr grinders?',
        answer:
          'A combination of (a) larger burr sizes are typically flat in the commercial category (75-98mm), (b) the clarity profile flats lean toward suits competition cupping, and (c) industry inertia — once flat became the competition norm, equipment sponsors followed. It is real evidence of preference, not necessarily proof of superiority.',
      },
      {
        question: 'How big a difference is flat vs conical in the cup?',
        answer:
          'Smaller than most marketing suggests. Blind tastings have repeatedly shown experienced tasters struggle to identify flat vs conical at matched recipes. The difference is real but secondary to burr size, alignment, freshness, and recipe choices.',
      },
      {
        question: 'Do flat burrs run hotter than conical burrs?',
        answer:
          'Generally yes, at the same throughput. Flat burrs need higher RPM (1,200-1,600 typically for commercial) to move beans against centrifugal force, which generates more heat. Low-RPM flats exist (DF64 runs at 350 RPM) and mitigate the issue.',
      },
      {
        question: 'Are flat burrs harder to align than conical burrs?',
        answer:
          'Yes. Flat burrs have two faces that must sit perfectly parallel; conical burrs are self-centering by geometry. Misaligned flats produce uneven grind distribution and inconsistent shots, and many budget flat grinders ship with misalignment from the factory. Premium flats (Lagom, Mahlkonig) are precisely-aligned but cost more.',
      },
      {
        question: 'Can I have one grinder for both espresso and filter with flat burrs?',
        answer:
          'Yes, if the burr geometry and gear range support both. The Mahlkonig X54, DF64, and Eureka Mignon Specialita all do both. Some flat-burr filter grinders (Fellow Ode Gen 2) cannot go fine enough for espresso by design — check the spec.',
      },
    ],
    relatedTermSlugs: ['conical-burr', 'burr', 'rpm', 'retention', 'single-dosing'],
    relatedBestSlugs: ['best-grinder-for-espresso', 'best-grinder-under-500-with-stepless-adjustment'],
    updatedAt: '2026-05-18',
  },

  // -------------------------------------------------------------------
  // 20. CONICAL BURR.
  //
  // Reconocer en FAQ que blind tasters no distinguen consistentemente.
  // -------------------------------------------------------------------
  {
    slug: 'conical-burr',
    title: 'What is a conical burr coffee grinder? — Coffee Equipment Reviews',
    description:
      'Conical burr grinders use a cone-shaped inner burr nested in a ring-shaped outer burr. Plain explanation of how they work, where they show up, and how they compare to flat burrs.',
    h1: 'What is a conical burr coffee grinder?',
    tldr:
      'A conical burr grinder uses a cone-shaped inner burr that nests inside a ring-shaped outer burr. Beans travel down and outward between the two burrs, getting crushed progressively as the gap narrows. Conicals are common in hand grinders and many popular home electrics, often associated with heavier-bodied, chocolatey cup profiles.',
    inDepth: [
      {
        heading: 'The conical burr geometry',
        body:
          '<p>A conical burr set has two parts: an inner cone (the rotating burr in most home electrics; the rotating burr in hand grinders too, driven by the crank) and an outer ring with matching teeth on the inside surface. The cone sits inside the ring with a small gap between them.</p>'
          + '<p>Beans drop into the top of the burr chamber and gravity pulls them down between the cone and ring. The teeth on each burr break the beans progressively as they travel downward and outward — the gap narrows toward the bottom of the burr, so beans get cracked first at the top and finished at the bottom. Grounds exit at the bottom of the burr ring into the chute.</p>',
      },
      {
        heading: 'How conical burr cup profile is described',
        body:
          '<p>The conventional descriptor: conicals produce heavier-bodied cups with rounder, more-integrated flavor — chocolatey, syrupy, with less acidity prominence than flat burrs would give the same bean. The particle distribution is often described as more "unimodal" (one main particle size peak with a tail of fines) which extracts differently than flats.</p>'
          + '<p>The reputation has commercial backing: the Niche Zero (63mm conical) and the Mazzer Kony (71mm conical) are loved by users targeting Italian-style espresso and dark-roast workflows. The flavor lean is real, but as with flats, the gap to conicals is smaller than marketing claims.</p>',
      },
      {
        heading: 'Where conical burrs dominate',
        body:
          '<ul>'
          + '<li><strong>Hand grinders.</strong> Almost every hand grinder on the market uses conical burrs because the geometry self-aligns and tolerates the slight wobble of hand-cranking. 1Zpresso, Comandante, Timemore, Kingrinder — all conical.</li>'
          + '<li><strong>Entry electrics.</strong> Baratza Encore (40mm conical), OXO Brew Conical Burr, Fellow Opus — popular sub-$200 grinders are conical because the burrs are cheaper to manufacture and align more reliably.</li>'
          + '<li><strong>Compact prosumer grinders.</strong> Niche Zero, Baratza Sette 270, several Eureka and Mazzer conical models. The footprint advantage of conicals matters in home kitchens.</li>'
          + '<li><strong>Lever espresso machines.</strong> Cafelat Robot and Flair owners often pair with conical hand grinders or compact conical electrics — the workflow rhythm matches.</li>'
          + '</ul>',
      },
      {
        heading: 'The honest take on conical vs flat',
        body:
          '<p>Same caveat as the flat burr entry: blind tastings repeatedly show experienced tasters struggle to consistently identify which cup came from a conical vs flat burr at matched recipes. The flavor differences exist but are smaller than the marketing language implies.</p>'
          + '<p>Where conicals genuinely win:</p>'
          + '<ul>'
          + '<li><strong>Footprint.</strong> A 63mm conical is more compact than a 64mm flat at similar throughput.</li>'
          + '<li><strong>Low RPM operation.</strong> Conicals can spin at 300-700 RPM and still grind acceptably; flats often need 1,200+ RPM.</li>'
          + '<li><strong>Lower heat transfer.</strong> Slower RPM + smaller surface area means less heat into the beans during grinding.</li>'
          + '<li><strong>Alignment forgiveness.</strong> The cone-in-ring geometry self-centers; flats need precision parallel alignment that not all manufacturers nail.</li>'
          + '<li><strong>Cost at the entry level.</strong> The Baratza Encore (conical) is around $170; the cheapest reliable flat (DF64) is $400.</li>'
          + '</ul>',
      },
      {
        heading: 'Where conicals lose',
        body:
          '<p>Flats counter on several axes:</p>'
          + '<ul>'
          + '<li>Most competition baristas use flats — the clarity-leaning profile is preferred for cupping.</li>'
          + '<li>Light-roast extraction (very high mid-acidity profiles, e.g. Ethiopian Yirgacheffe) often reads more interestingly from flats.</li>'
          + '<li>Burr size at the top end — 98mm flats exist; 98mm conicals are extremely rare.</li>'
          + '<li>Many users describe flat-burr profiles as "more interesting" once they have spent time tasting both — but reverse anecdotes exist too.</li>'
          + '</ul>'
          + '<p>The honest answer: most home users will be perfectly happy with either, and the choice should be driven by retention, build quality, footprint, and price rather than by an assumed flavor difference.</p>',
      },
    ],
    examples: [
      {
        asin: 'B08CXVZL8R',
        note:
          'The Niche Zero is the reference 63mm conical home electric — near-zero retention, single-dose, beloved for its workflow and chocolatey espresso profile. The grinder that pulled conicals back into prosumer respect.',
      },
      {
        asin: 'B007F183LK',
        note:
          'The Baratza Encore uses 40mm conical steel burrs and is the canonical entry electric grinder — under $200, hopper-fed, mostly for filter brewing but workable for moka pot. Conical geometry keeps the manufacturing cost low.',
      },
      {
        asin: 'B0BDFTC76P',
        note:
          'The Baratza Encore ESP is the espresso-capable evolution of the Encore — same conical geometry, finer grind range. A good baseline for "conical burr grinder under $250 that works for espresso."',
      },
      {
        asin: 'B0BC4FQDD1',
        note:
          'The 1Zpresso JX-Pro is a hand grinder with 48mm conical burrs — premium hand-grinder reference, widely used for pour-over with specialty single origins. Demonstrates how conical geometry suits hand-cranking.',
      },
    ],
    faqs: [
      {
        question: 'Are conical burrs worse than flat burrs?',
        answer:
          'No — they are a different geometry with different strengths. Conicals dominate hand grinders and compact electrics for legitimate engineering reasons (footprint, alignment forgiveness, low-RPM operation). Their cup profile leans heavier and rounder than flats. Whether that is "worse" depends on what you want to drink.',
      },
      {
        question: 'Why are most hand grinders conical?',
        answer:
          'Because conical geometry self-aligns. A hand grinder gets twisted, jostled, and disassembled regularly — flat burrs would lose parallel alignment quickly under that abuse. Conical burrs tolerate it because the cone-in-ring geometry centers itself by physics.',
      },
      {
        question: 'Do conical burrs really make sweeter espresso?',
        answer:
          'They tend to be described that way, but blind tastings repeatedly show experienced tasters cannot identify flat vs conical at matched recipes consistently. The flavor lean is real but small. Burr size, freshness, and grind quality dominate the differences in the cup.',
      },
      {
        question: 'Can a conical grinder do good pour-over?',
        answer:
          'Yes. The 1Zpresso JX-Pro, Comandante C40, and Baratza Encore are all conical and all considered solid pour-over grinders. The Niche Zero is conical and does both espresso and filter well. The geometry does not lock you into espresso.',
      },
      {
        question: 'Why is the Niche Zero so popular if conicals are "less clear"?',
        answer:
          'Because the geometry-clarity argument is overstated. The Niche\'s combination of 63mm conical burrs, near-zero retention, single-dose workflow, and quiet motor makes it an exceptional grinder by every metric except burr-geometry purism. Many owners who tried flats first prefer the Niche cup profile.',
      },
      {
        question: 'Is the Baratza Encore (conical) enough grinder for espresso?',
        answer:
          'The Encore ESP (espresso variant) is acceptable for entry-level espresso but limited by burr size (40mm) and grind range. Most users move to a larger conical (Niche, Sette) or a flat (DF64, Eureka) within a year if they take espresso seriously.',
      },
    ],
    relatedTermSlugs: ['flat-burr', 'burr', 'retention', 'single-dosing', 'rpm'],
    relatedBestSlugs: ['best-grinder-under-200', 'best-grinder-for-pour-over-under-300'],
    relatedTroubleshootSlugs: ['niche-zero-retention-issues', 'baratza-encore-slow-or-replace'],
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
