// Glossary de términos técnicos del nicho coffee equipment.
//
// Diseño:
//   - Cada entry tiene un `slug` corto y URL-safe que sirve como id de
//     anchor en /glossary/#<slug>. Estos slugs son contratos públicos —
//     se referencian desde data/category-pages.ts y data/best-pages.ts
//     mediante links manuales. Renombrar un slug rompe esos links.
//   - `category` agrupa por sección visible en la página. El orden de
//     CATEGORY_ORDER fija la secuencia.
//   - `aliases` permite que un usuario que busca "PID" o "HX" encuentre
//     el término aunque el display name sea distinto.
//   - `definition` es la respuesta corta (1-3 oraciones, plain English)
//     que se renderiza en el body de la entry.
//   - `context` (opcional) es 1 párrafo explicando cuándo el término
//     importa o trade-offs/debates de la comunidad. Anti-gray-hat: si
//     algo es debated, lo reflejamos sin tomar posición.
//   - `relatedTerms` son slugs a otros entries para internal linking
//     dentro del glossary mismo.
//
// Anti-gray-hat: definiciones factuales, neutrales, NO marketing copy.
// Si un término es marca registrada o marketing-speak (Thermojet™), lo
// explicamos como tal sin defender ni atacar.

export type GlossaryCategory =
  | 'espresso-machine'
  | 'grinder'
  | 'technique'
  | 'beans'
  | 'brewing'
  | 'gear';

export interface GlossaryTerm {
  /** URL anchor — usado como id en /glossary/#<slug>. */
  slug: string;
  /** Display name del término (capitalización editorial). */
  term: string;
  /** Bucket para la navegación por categorías. */
  category: GlossaryCategory;
  /** Otros nombres / siglas / variantes. Mostrados bajo el H3. */
  aliases?: string[];
  /** Definición corta: 1-3 oraciones en inglés simple. */
  definition: string;
  /** Párrafo opcional con contexto, trade-offs o debate. */
  context?: string;
  /** Slugs de entries relacionados dentro del mismo glossary. */
  relatedTerms?: string[];
}

export const CATEGORY_ORDER: GlossaryCategory[] = [
  'espresso-machine',
  'grinder',
  'technique',
  'beans',
  'brewing',
  'gear',
];

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  'espresso-machine': 'Espresso machines',
  grinder: 'Grinders',
  technique: 'Technique',
  beans: 'Coffee beans',
  brewing: 'Brewing methods',
  gear: 'Accessories & gear',
};

export const CATEGORY_DESCRIPTIONS: Record<GlossaryCategory, string> = {
  'espresso-machine':
    'Boiler architectures, group head sizes, temperature control, and pressure systems.',
  grinder:
    'Burr geometry, adjustment systems, retention, and dosing workflows.',
  technique:
    'Preparation, extraction, and the variables baristas dial to chase a balanced shot.',
  beans:
    'Roast levels, sourcing, and the quality grading vocabulary you will see on bags.',
  brewing:
    'Non-espresso methods — pour-over, immersion, and the equipment that drives each.',
  gear:
    'Tampers, portafilters, distribution tools, and the small accessories around a setup.',
};

export const GLOSSARY: GlossaryTerm[] = [
  // ===================================================================
  // ESPRESSO MACHINE INTERNALS
  // ===================================================================
  {
    slug: 'pid-controller',
    term: 'PID controller',
    category: 'espresso-machine',
    aliases: ['PID', 'proportional-integral-derivative'],
    definition:
      'A PID (proportional-integral-derivative) controller is a temperature-regulation circuit that holds boiler or thermoblock water within roughly ±1°C of a target setpoint. It replaces the simpler on/off thermostat found on cheaper machines.',
    context:
      'PID is the single highest-impact specification under $1,000 for espresso consistency. Without it, brew temperature drifts between shots and you compensate with grind adjustment, which only partially recovers the loss. Aftermarket PID kits exist for several machines (Gaggia Classic, Rancilio Silvia) for $80-150.',
    relatedTerms: ['boiler', 'thermoblock', 'extraction'],
  },
  {
    slug: 'boiler',
    term: 'Boiler',
    category: 'espresso-machine',
    definition:
      'A pressurized water vessel held at brew temperature. Espresso machines use single boilers (one tank for brew and steam in sequence), heat exchangers (one boiler that does both simultaneously via a coil), or dual boilers (two separate tanks).',
    relatedTerms: ['single-boiler', 'heat-exchanger', 'dual-boiler', 'thermoblock'],
  },
  {
    slug: 'single-boiler',
    term: 'Single boiler',
    category: 'espresso-machine',
    aliases: ['SBDU', 'single-boiler dual-use'],
    definition:
      'A machine with one boiler that switches between brew temperature (~93°C) and steam temperature (~130°C). You brew first, then flip a switch and wait 30-60 seconds for the boiler to ramp up before steaming milk.',
    context:
      'Single-boiler machines (Gaggia Classic Pro, Rancilio Silvia) cost less and take less space than dual boilers. The trade-off is workflow: you cannot brew and steam at the same time, so back-to-back milk drinks are slower.',
    relatedTerms: ['dual-boiler', 'heat-exchanger', 'boiler'],
  },
  {
    slug: 'dual-boiler',
    term: 'Dual boiler',
    category: 'espresso-machine',
    aliases: ['DB'],
    definition:
      'A machine with two separate boilers — one held at brew temperature, one at steam temperature — so you can pull a shot and steam milk simultaneously.',
    context:
      'Dual-boiler machines (Breville Dual Boiler, Profitec Pro 300) suit households making two or more milk drinks back-to-back. For single-cup households a single-boiler with PID does the same cup quality for $600-1,500 less.',
    relatedTerms: ['single-boiler', 'heat-exchanger', 'pid-controller'],
  },
  {
    slug: 'heat-exchanger',
    term: 'Heat exchanger',
    category: 'espresso-machine',
    aliases: ['HX', 'heat-exchanger'],
    definition:
      'A boiler architecture where a single steam boiler holds water at steam temperature, and brew water flows through a thin coil inside that boiler — picking up brew temperature on the way to the group head.',
    context:
      'Heat-exchanger machines (Rocket Appartamento, Lelit Mara X, ECM Classika) sit between single-boiler and dual-boiler in cost and complexity. They let you brew and steam simultaneously like a dual boiler, but the first shot of the day requires a cooling flush because brew water has been sitting in the coil too long.',
    relatedTerms: ['boiler', 'dual-boiler', 'e61-group'],
  },
  {
    slug: 'thermoblock',
    term: 'Thermoblock',
    category: 'espresso-machine',
    aliases: ['thermocoil'],
    definition:
      'A heating element that warms water on demand as it passes through a metal block, instead of keeping a tank of water hot. Common in entry-level machines for the fast warm-up (under 30 seconds typically).',
    context:
      'Thermoblocks reach temperature quickly and consume less standby power than boilers. The trade-off is less thermal mass: shot-to-shot temperature stability is lower than a boiler with PID, and back-to-back shots can drift hotter or cooler depending on the design.',
    relatedTerms: ['thermojet', 'boiler', 'pid-controller'],
  },
  {
    slug: 'thermojet',
    term: 'Thermojet',
    category: 'espresso-machine',
    aliases: ['ThermoJet'],
    definition:
      'Breville\'s branded thermoblock-style heater, marketed for its 3-second warm-up. Used in the Bambino, Bambino Plus, Barista Pro, and several other Breville models.',
    context:
      'Marketing aside, Thermojet is a thermoblock variant — fast-heating, low thermal mass. Pairs with Breville\'s software-driven pre-infusion to compensate for the smaller thermal buffer. It is not a boiler equivalent in temperature stability but it is the fastest warm-up in the home category.',
    relatedTerms: ['thermoblock', 'pre-infusion', 'boiler'],
  },
  {
    slug: 'group-head',
    term: 'Group head',
    category: 'espresso-machine',
    aliases: ['brew group', 'group'],
    definition:
      'The metal assembly where the portafilter locks in and brew water dispenses onto the puck. Sizes are 51mm (De\'Longhi La Specialista), 54mm (Breville), and 58mm (the commercial standard used by most Italian prosumer machines).',
    context:
      'Portafilter size determines your aftermarket. 58mm has every imaginable basket, tamper, distributor, and bottomless option built for it first. 54mm and 51mm work fine out of the box but lock you into smaller aftermarket catalogs at slightly higher per-unit prices.',
    relatedTerms: ['e61-group', 'portafilter', 'bottomless-portafilter'],
  },
  {
    slug: 'e61-group',
    term: 'E61 group head',
    category: 'espresso-machine',
    aliases: ['E61'],
    definition:
      'A passively-heated 58mm brew group designed by Faema in 1961, now an open commercial standard used on most prosumer heat-exchanger and dual-boiler machines. Recognizable by its chrome dome and three-position lever.',
    context:
      'E61 groups warm up slowly (20-40 minutes) but are extremely thermally stable once at temperature, and the mushroom valve provides natural mechanical pre-infusion. Service parts are interchangeable across manufacturers — a major upside for long-term ownership.',
    relatedTerms: ['group-head', 'heat-exchanger', 'pre-infusion'],
  },
  {
    slug: 'pre-infusion',
    term: 'Pre-infusion',
    category: 'espresso-machine',
    aliases: ['preinfusion'],
    definition:
      'A short low-pressure phase at the start of a shot — water saturates the puck before full 9-bar pressure begins. Reduces channeling and improves extraction evenness.',
    context:
      'Implementations vary: E61 groups do it mechanically via the lever valve; Breville and Lelit machines do it via software with adjustable duration; Cafelat Robot does it manually as you pull the levers. Most users see modest cup-quality gains, especially with light roasts.',
    relatedTerms: ['e61-group', 'channeling', 'extraction', 'nine-bar-pressure'],
  },
  {
    slug: 'nine-bar-pressure',
    term: '9 bar pressure',
    category: 'espresso-machine',
    aliases: ['9 bar', 'nine bar'],
    definition:
      'The standard brewing pressure for espresso — roughly 130 PSI, or 9 times atmospheric pressure. Most pump machines target this with an internal OPV (over-pressure valve).',
    context:
      'Machines often advertise 15 or 20 bar pumps; the OPV bleeds excess pressure back to the tank so the puck sees only 9 bar. There is active debate around whether 6-7 bar produces cleaner shots ("low-pressure profiling") — modern flow-control kits let users experiment.',
    relatedTerms: ['opv', 'extraction', 'pre-infusion'],
  },
  {
    slug: 'opv',
    term: 'OPV (over-pressure valve)',
    category: 'espresso-machine',
    aliases: ['OPV', 'over-pressure valve'],
    definition:
      'A spring-loaded valve that caps brew pressure by venting excess water back to the tank. Most prosumer machines ship with the OPV set to 9-10 bar; aftermarket modders adjust it lower for cleaner extraction profiles.',
    relatedTerms: ['nine-bar-pressure', 'pre-infusion'],
  },
  {
    slug: 'solenoid-valve',
    term: 'Three-way solenoid valve',
    category: 'espresso-machine',
    aliases: ['solenoid', '3-way solenoid'],
    definition:
      'An electronically-actuated valve that vents pressure from the group head to a drip tray the moment a shot ends. Produces a dry puck that knocks out cleanly.',
    context:
      'Machines without a 3-way solenoid (Gaggia Classic before the 2019 redesign, many entry pumps) leave a wet "soup puck" that has to be wiped out. The solenoid is one of the most common reasons enthusiasts upgrade from entry to mid-tier machines.',
    relatedTerms: ['group-head', 'puck'],
  },
  {
    slug: 'steam-wand',
    term: 'Steam wand',
    category: 'espresso-machine',
    definition:
      'A pipe that delivers pressurized steam from the boiler into a milk pitcher to texture and heat milk. Real commercial-style wands have a tip with 2-4 holes; Panarello wands have a plastic sleeve that aerates milk automatically with less skill required.',
    context:
      'Auto-frothers (Breville Bambino Plus, Oracle) sit between the two: they steam to a programmed temperature and aeration level without user input, producing competent microfoam but limiting the ceiling for latte art.',
    relatedTerms: ['milk-pitcher', 'dual-boiler'],
  },

  // ===================================================================
  // GRINDER ANATOMY
  // ===================================================================
  {
    slug: 'burr',
    term: 'Burr',
    category: 'grinder',
    aliases: ['burrs', 'grinding burr'],
    definition:
      'The cutting element of a coffee grinder. Two burrs (one fixed, one rotating) crush beans between them. Burr grinders produce a more uniform particle distribution than blade grinders, which is essential for espresso and meaningful for filter.',
    relatedTerms: ['flat-burr', 'conical-burr', 'retention'],
  },
  {
    slug: 'flat-burr',
    term: 'Flat burr',
    category: 'grinder',
    aliases: ['flat burrs'],
    definition:
      'A burr set where two parallel disc-shaped burrs face each other; beans are crushed as they travel outward to the edge. Common in commercial grinders and prosumer home electrics (Eureka Mignon, Mahlkonig, DF64).',
    context:
      'Flat burrs are often described as producing cleaner, more separated cups with a bimodal particle distribution. The trade-off vs conicals is real but small — most blind tasters cannot reliably distinguish well-dialed flat from conical shots at the same price tier.',
    relatedTerms: ['conical-burr', 'burr', 'rpm'],
  },
  {
    slug: 'conical-burr',
    term: 'Conical burr',
    category: 'grinder',
    aliases: ['conical burrs'],
    definition:
      'A burr set where a cone-shaped inner burr nests inside a ring-shaped outer burr; beans travel down and outward between them. Common in hand grinders and many home electrics (Niche Zero, Baratza Encore, Sette).',
    context:
      'Conicals are often described as producing heavier-bodied, more chocolatey cups. Footprint is usually smaller than equivalent flat burrs and motor RPM can be lower, which reduces heat transfer to the beans.',
    relatedTerms: ['flat-burr', 'burr', 'retention'],
  },
  {
    slug: 'stepless-adjustment',
    term: 'Stepless adjustment',
    category: 'grinder',
    definition:
      'A grind-size mechanism that lets you rotate the burrs continuously instead of clicking through fixed positions. Enables tiny adjustments — fractions of a millimeter — useful for espresso dialing.',
    context:
      'Stepless makes a real difference on Gaggia Classic, Rancilio Silvia, and prosumer machines where shot timing is sensitive. On Breville machines with assisted pre-infusion, stepped (Baratza Encore ESP) is usable because the machine compensates for small grind drift.',
    relatedTerms: ['stepped-adjustment', 'extraction', 'pre-infusion'],
  },
  {
    slug: 'stepped-adjustment',
    term: 'Stepped adjustment',
    category: 'grinder',
    definition:
      'A grind-size mechanism with discrete clicks — typically 40-60 positions across the full range. Cheaper to manufacture and easier to reset, but each step changes shot time noticeably for espresso.',
    relatedTerms: ['stepless-adjustment'],
  },
  {
    slug: 'retention',
    term: 'Retention',
    category: 'grinder',
    aliases: ['grind retention'],
    definition:
      'The grams of ground coffee a grinder keeps inside its chamber and burr area between sessions. Under 1 gram is excellent; 1-3 grams is normal for hopper-fed designs; over 5 grams is a problem only if you weigh in your dose.',
    context:
      'Retention only matters when you change beans or want each session to start with fresh coffee — typically single-dose workflows. For one-bean households running a single hopper, retention is mostly irrelevant because the same coffee just stays in the chamber.',
    relatedTerms: ['single-dosing', 'static'],
  },
  {
    slug: 'static',
    term: 'Static',
    category: 'grinder',
    aliases: ['static cling'],
    definition:
      'The electrostatic charge that builds on grounds during grinding and makes them stick to the chute, dosing cup, or counter. Worst with very dry beans and high-RPM grinders.',
    context:
      'A spritz of water on whole beans before grinding (Ross Droplet Technique, or RDT) is the standard mitigation — one drop per dose dramatically reduces static and clumping. Some grinders ship with anti-static coatings or grounded chutes.',
    relatedTerms: ['retention', 'wdt', 'rpm'],
  },
  {
    slug: 'wdt',
    term: 'WDT (Weiss Distribution Technique)',
    category: 'grinder',
    aliases: ['WDT', 'Weiss Distribution Technique'],
    definition:
      'A puck-prep technique that uses a tool with fine needles (0.3-0.4mm) to stir grounds inside the portafilter basket, breaking up clumps before tamping. Reduces channeling.',
    context:
      'Named for John Weiss, who described the method on a forum in 2005. WDT is most useful with high-static grinders that produce clumped grounds; on low-clump grinders the effect is smaller. Most baristas consider it standard practice for serious espresso.',
    relatedTerms: ['static', 'puck-prep', 'channeling', 'distribution-tool'],
  },
  {
    slug: 'single-dosing',
    term: 'Single dosing',
    category: 'grinder',
    aliases: ['single-dose grinding'],
    definition:
      'A workflow where you weigh out one shot\'s worth of beans (typically 18g) and grind that exact dose, instead of filling a hopper. Lets you switch beans every shot and minimizes stale grounds.',
    context:
      'Requires a low-retention grinder (DF64, Niche Zero) for the workflow to deliver fresh coffee in the cup. Hopper-fed grinders with high retention defeat the purpose. The trade-off is speed: hopper grinders are faster for one-bean households.',
    relatedTerms: ['retention', 'doser', 'rpm'],
  },
  {
    slug: 'doser',
    term: 'Doser vs doserless',
    category: 'grinder',
    aliases: ['dosing chamber', 'doserless'],
    definition:
      'A doser is a chambered grinder that accumulates ground coffee in a paddled holder; you pull a lever to release a portion into the portafilter. Doserless grinders dispense directly out the chute into the portafilter or a cup.',
    context:
      'Dosers were standard on commercial grinders for decades; almost all modern home grinders are doserless because home users typically weigh each dose. Doser models that linger in catalogs (some Mazzers) are usually bought by cafés.',
    relatedTerms: ['single-dosing', 'retention'],
  },
  {
    slug: 'rpm',
    term: 'RPM (low-RPM grinders)',
    category: 'grinder',
    aliases: ['RPM', 'low-RPM'],
    definition:
      'The rotational speed of the burrs. Commercial grinders typically run 1,200-1,600 RPM; "low-RPM" home grinders (DF64, Niche Zero, several Eureka models) run 300-700 RPM.',
    context:
      'Low RPM reduces heat transfer to the beans and produces less static and clumping. The trade-off is slower grind times — a 30-second grind instead of 8 seconds. For home single-dose use the slower grind is invisible.',
    relatedTerms: ['static', 'single-dosing', 'burr'],
  },

  // ===================================================================
  // ESPRESSO TECHNIQUE
  // ===================================================================
  {
    slug: 'tamping',
    term: 'Tamping',
    category: 'technique',
    definition:
      'Compressing ground coffee in the portafilter basket with a tamper, creating an even, level puck before locking it into the group head. Standard pressure is firm and consistent; exact force matters less than level.',
    context:
      'A common myth is that 30 lbs of force is required. In practice, "consistent and level" matters more than exact pressure — and self-leveling or calibrated tampers remove the variable entirely. Tamp level (no tilt) is the single biggest predictor of channeling.',
    relatedTerms: ['calibrated-tamper', 'channeling', 'puck-prep'],
  },
  {
    slug: 'channeling',
    term: 'Channeling',
    category: 'technique',
    definition:
      'A failed extraction where pressurized water finds a low-resistance path through the puck instead of saturating evenly. Produces watery, sour shots with bright crema in only part of the basket.',
    context:
      'Causes include uneven distribution before tamping, a tilted tamp, too-fine grind for the basket size, and clumped grounds. WDT and puck screens reduce channeling significantly; level tamping is the single most effective prevention.',
    relatedTerms: ['wdt', 'tamping', 'puck-prep', 'extraction'],
  },
  {
    slug: 'extraction',
    term: 'Extraction',
    category: 'technique',
    aliases: ['extraction yield'],
    definition:
      'The process and percentage of soluble coffee solids dissolved into the brew water. Espresso typically targets 18-22% extraction by mass; under-extracted shots taste sour and thin, over-extracted shots taste bitter and astringent.',
    context:
      'Refractometers measure extraction precisely (Total Dissolved Solids × yield / dose). Most home setups dial by taste and shot time: a 1:2 ratio in 25-32 seconds usually lands in the balanced range.',
    relatedTerms: ['brew-ratio', 'yield', 'under-extraction', 'over-extraction'],
  },
  {
    slug: 'under-extraction',
    term: 'Under-extraction',
    category: 'technique',
    definition:
      'A shot that has dissolved too few solubles — typically because the grind was too coarse or the brew time too short. Tastes sour, weak, salty.',
    relatedTerms: ['extraction', 'over-extraction', 'channeling'],
  },
  {
    slug: 'over-extraction',
    term: 'Over-extraction',
    category: 'technique',
    definition:
      'A shot that has dissolved too many solubles — typically because the grind was too fine or the brew time too long. Tastes bitter, hollow, astringent.',
    relatedTerms: ['extraction', 'under-extraction'],
  },
  {
    slug: 'yield',
    term: 'Yield',
    category: 'technique',
    definition:
      'The mass of liquid espresso in the cup, in grams. An 18g dose pulled to a 36g yield is a 1:2 brew ratio. Measured on a scale under the cup, not by volume markings.',
    relatedTerms: ['brew-ratio', 'extraction'],
  },
  {
    slug: 'brew-ratio',
    term: 'Brew ratio',
    category: 'technique',
    aliases: ['ratio'],
    definition:
      'The mass relationship between dry coffee dose and liquid espresso yield. Common ratios: 1:2 (18g dose → 36g shot, "normale"), 1:1.5 ("ristretto"), 1:3 ("lungo"). Time matters separately.',
    context:
      'Ratio is independent of grind setting — you change ratio by stopping the shot earlier or later. Light roasts often benefit from longer ratios (1:2.5 to 1:3) to extract enough; dark roasts often pull better at shorter ratios (1:1.5 to 1:2).',
    relatedTerms: ['yield', 'extraction'],
  },
  {
    slug: 'crema',
    term: 'Crema',
    category: 'technique',
    definition:
      'The reddish-brown foam on top of a freshly-pulled espresso shot, formed by CO2 escaping from the coffee and emulsifying with extracted oils. Indicates a fresh roast and proper pressure, not necessarily a great shot.',
    context:
      'Crema is widely misunderstood as a quality indicator. Robusta blends produce more crema than arabica; very dark roasts produce thick orange crema even on bad shots. Many specialty roasters now grade shots on taste and texture, with crema as a side observation.',
    relatedTerms: ['extraction', 'nine-bar-pressure'],
  },
  {
    slug: 'puck',
    term: 'Puck',
    category: 'technique',
    definition:
      'The compressed disc of ground coffee in the portafilter basket after tamping. After brewing it should knock out as a single damp puck — wet, fragmented, or "soup" pucks indicate problems with dose, grind, or basket fit.',
    relatedTerms: ['puck-prep', 'puck-screen', 'tamping'],
  },
  {
    slug: 'puck-prep',
    term: 'Puck prep',
    category: 'technique',
    definition:
      'The set of steps between grinding and locking the portafilter into the group head — distribution, WDT, tamping, optionally a puck screen. Good puck prep is the most consistent predictor of repeatable shots.',
    relatedTerms: ['wdt', 'tamping', 'puck-screen', 'distribution-tool'],
  },
  {
    slug: 'puck-screen',
    term: 'Puck screen',
    category: 'technique',
    aliases: ['screen'],
    definition:
      'A thin metal mesh disc (usually 1.7mm or 1.8mm) placed on top of the tamped puck before locking the portafilter. Distributes water more evenly across the puck and keeps the group screen cleaner.',
    context:
      'Effect on cup quality is small but consistent — most baristas notice fewer channels and a marginally cleaner shot. Cleanup advantage is the bigger practical win.',
    relatedTerms: ['puck-prep', 'channeling'],
  },

  // ===================================================================
  // COFFEE BEAN TERMINOLOGY
  // ===================================================================
  {
    slug: 'light-roast',
    term: 'Light roast',
    category: 'beans',
    definition:
      'Beans roasted to first crack and pulled shortly after — typically lighter brown, drier surface, more origin-character flavors (florals, fruits, acidity). Often called "specialty" or "Nordic" roast levels.',
    context:
      'Light roasts are harder to extract on espresso — they require finer grinds, higher temperatures (94-96°C), and longer ratios (1:2.5-1:3). Pour-over and AeroPress methods are more forgiving.',
    relatedTerms: ['medium-roast', 'dark-roast', 'specialty-grade'],
  },
  {
    slug: 'medium-roast',
    term: 'Medium roast',
    category: 'beans',
    definition:
      'Beans roasted past first crack but before second crack — balanced acidity, sweetness, body. The most common roast level for both espresso and filter coffee on the US specialty market.',
    relatedTerms: ['light-roast', 'dark-roast'],
  },
  {
    slug: 'dark-roast',
    term: 'Dark roast',
    category: 'beans',
    definition:
      'Beans roasted into or past second crack — darker color, oily surface, dominant roast flavors (chocolate, smoke, caramel) over origin character. Traditional for Italian-style espresso.',
    context:
      'Dark roasts are easier to extract — they tolerate cooler brew temperatures (90-93°C) and shorter ratios (1:1.5-1:2). They go stale faster than light roasts because of the exposed oils.',
    relatedTerms: ['light-roast', 'medium-roast'],
  },
  {
    slug: 'single-origin',
    term: 'Single origin',
    category: 'beans',
    aliases: ['SO'],
    definition:
      'Beans from a single farm, cooperative, or region — sometimes a single varietal, lot, or processing method. Highlights origin-specific flavor characteristics.',
    context:
      'Single-origin espresso is harder to dial than blends because flavor profiles are less forgiving. Light single origins (Ethiopian, Kenyan) are most often used for filter; medium-roasted single origins work for espresso.',
    relatedTerms: ['blend', 'specialty-grade'],
  },
  {
    slug: 'blend',
    term: 'Blend',
    category: 'beans',
    aliases: ['espresso blend'],
    definition:
      'Coffee composed of beans from multiple origins, varieties, or processing methods. Designed for a consistent flavor profile across harvests and for forgiveness in extraction.',
    relatedTerms: ['single-origin'],
  },
  {
    slug: 'specialty-grade',
    term: 'Specialty grade',
    category: 'beans',
    aliases: ['specialty coffee', '80+'],
    definition:
      'Green coffee scored 80 points or higher on the Specialty Coffee Association\'s 100-point cupping scale by a certified Q grader. Indicates a defined absence of major defects and a measurable presence of positive attributes.',
    context:
      'The 80-point threshold is the industry definition that separates "specialty" from "commodity" coffee. Most third-wave roasters source exclusively specialty-grade. The grading is done on green beans, not the roasted product.',
    relatedTerms: ['q-grader', 'single-origin'],
  },
  {
    slug: 'q-grader',
    term: 'Q grader',
    category: 'beans',
    aliases: ['Q grader', 'CQI Q grader'],
    definition:
      'A coffee professional certified by the Coffee Quality Institute (CQI) to grade green coffee on the 100-point Specialty Coffee Association scale. Certification involves 22 sensory and identification tests over a 6-day exam.',
    relatedTerms: ['specialty-grade'],
  },

  // ===================================================================
  // BREWING METHODS
  // ===================================================================
  {
    slug: 'pour-over',
    term: 'Pour over',
    category: 'brewing',
    aliases: ['pour-over', 'V60', 'drip'],
    definition:
      'A manual percolation brewing method: hot water poured over a bed of coffee grounds in a filter cone (V60, Kalita Wave, Chemex). Total brew time typically 3-4 minutes.',
    context:
      'V60 cones (Hario) produce bright, clean cups with control over pour speed and pattern; Kalita Wave (flat bottom, three holes) is more forgiving and consistent across pours; Chemex uses thicker filters for a heavier-filtered, cleaner-tasting cup.',
    relatedTerms: ['immersion-brewing', 'percolation-vs-immersion', 'chemex'],
  },
  {
    slug: 'chemex',
    term: 'Chemex',
    category: 'brewing',
    definition:
      'A pour-over brewer with a flared glass body and proprietary thick paper filters (20-30% heavier than standard filters). The thicker filter retains more oils and fines, producing a noticeably cleaner cup.',
    relatedTerms: ['pour-over', 'percolation-vs-immersion'],
  },
  {
    slug: 'immersion-brewing',
    term: 'Immersion brewing',
    category: 'brewing',
    definition:
      'A brewing method where grounds steep in water for a fixed time before being separated (French press, AeroPress, cupping). Produces fuller-bodied cups than percolation because more solids stay suspended in the liquid.',
    relatedTerms: ['percolation-vs-immersion', 'aeropress'],
  },
  {
    slug: 'aeropress',
    term: 'AeroPress',
    category: 'brewing',
    aliases: ['Aeropress'],
    definition:
      'A hybrid immersion-and-pressure brewer: grounds steep in a plastic chamber for 1-2 minutes, then you press the plunger to push water through a paper filter. Produces a clean, body-rich cup in under 90 seconds total.',
    context:
      'The AeroPress sits between French press and pour-over: more body than V60, cleaner than French press. Most travel-friendly serious brewer on the market; widely used by competitive brewers (World AeroPress Championship runs since 2008).',
    relatedTerms: ['immersion-brewing', 'pour-over'],
  },
  {
    slug: 'moka-pot',
    term: 'Moka pot',
    category: 'brewing',
    aliases: ['Bialetti', 'stovetop espresso'],
    definition:
      'A stovetop brewer that uses steam pressure (1.5-2 bar) to push water through a basket of finely-ground coffee into an upper chamber. Invented by Alfonso Bialetti in 1933; ubiquitous in Italian homes.',
    context:
      'Not espresso (espresso requires 8-9 bar) but a strong concentrate with a similar use case. Common confusion: "moka" coffee is the stovetop drink, not the Mocha blend or the chocolate-espresso drink.',
    relatedTerms: ['percolation-vs-immersion'],
  },
  {
    slug: 'percolation-vs-immersion',
    term: 'Percolation vs immersion',
    category: 'brewing',
    definition:
      'The two underlying axes of non-espresso brewing. Percolation (pour-over, drip) flows water through a grounds bed, producing cleaner cups. Immersion (French press, AeroPress) submerges grounds in water for a fixed time, producing fuller-bodied cups with more dissolved solids.',
    relatedTerms: ['pour-over', 'immersion-brewing', 'aeropress'],
  },

  // ===================================================================
  // ACCESSORIES & GEAR
  // ===================================================================
  {
    slug: 'portafilter',
    term: 'Portafilter',
    category: 'gear',
    aliases: ['PF', 'group handle'],
    definition:
      'The detachable handle that holds the basket of ground coffee and locks into the group head. Sizes (51mm, 54mm, 58mm) match the group head; spouted versions split the shot into two cups, bottomless ("naked") expose the basket bottom for diagnostics.',
    relatedTerms: ['group-head', 'bottomless-portafilter'],
  },
  {
    slug: 'bottomless-portafilter',
    term: 'Bottomless portafilter',
    category: 'gear',
    aliases: ['naked portafilter', 'naked PF', 'bottomless'],
    definition:
      'A portafilter with the spouts and bottom plate removed, exposing the underside of the basket. Used as a diagnostic tool: you can see channels, side-spouts, and uneven extraction in real time.',
    context:
      'Bottomless portafilters are the single best feedback loop for improving puck prep. They are not better for the shot itself — they exist to show you what is going wrong. Spouted portafilters are slightly safer (less splatter) for daily use.',
    relatedTerms: ['portafilter', 'channeling', 'puck-prep'],
  },
  {
    slug: 'knock-box',
    term: 'Knock box',
    category: 'gear',
    aliases: ['knockbox'],
    definition:
      'A small bin with a padded bar across the top for knocking spent pucks out of the portafilter. Sits next to the machine; holds 1-2 weeks of pucks before emptying.',
    relatedTerms: ['puck'],
  },
  {
    slug: 'milk-pitcher',
    term: 'Milk pitcher',
    category: 'gear',
    aliases: ['milk jug', 'frothing pitcher'],
    definition:
      'A stainless-steel pitcher (350-600ml typical) for steaming milk with the steam wand. Spout shape and angle affect pouring control for latte art.',
    relatedTerms: ['steam-wand'],
  },
  {
    slug: 'distribution-tool',
    term: 'Distribution tool',
    category: 'gear',
    aliases: ['leveler', 'OCD'],
    definition:
      'A puck of metal with three or four sloped blades that you rotate on top of the dosed basket to level the grounds before tamping. Sometimes branded as "OCD" or "leveler"; the generic term is distribution tool.',
    context:
      'Distribution tools are less effective than WDT for breaking up clumps — they only move surface grounds. Many baristas use both: WDT to declump, then distribution tool to level the surface before tamping.',
    relatedTerms: ['wdt', 'puck-prep', 'tamping'],
  },
  {
    slug: 'calibrated-tamper',
    term: 'Calibrated tamper',
    category: 'gear',
    aliases: ['click tamper', 'spring tamper'],
    definition:
      'A tamper with a spring-loaded base that "clicks" at a preset pressure (typically 30 lbs / 13.6 kg) and self-levels against the basket. Removes the two main human variables in tamping.',
    context:
      'Calibrated tampers are most useful for beginners learning consistent tamping and for households where multiple people pull shots. Experienced baristas often go back to flat-base tampers once their muscle memory is set.',
    relatedTerms: ['tamping', 'puck-prep'],
  },
];

/**
 * Helper: encuentra un término por slug.
 * Útil para validar internal links desde otros data files.
 */
export function findTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}

/**
 * Helper: agrupa términos por category respetando CATEGORY_ORDER.
 * Cada bucket ordena alfabéticamente por `term`.
 */
export function termsByCategory(): Map<GlossaryCategory, GlossaryTerm[]> {
  const map = new Map<GlossaryCategory, GlossaryTerm[]>();
  for (const cat of CATEGORY_ORDER) {
    map.set(
      cat,
      GLOSSARY.filter((t) => t.category === cat).sort((a, b) =>
        a.term.localeCompare(b.term, 'en'),
      ),
    );
  }
  return map;
}
