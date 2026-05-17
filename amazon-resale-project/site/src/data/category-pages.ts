// Category-page definitions. Para cada `type` del frontmatter de products
// (espresso-machine, grinder, brewer, accessory) definimos slug plural,
// display name, lead copy editorial, topics de buying guide y FAQs.
//
// Diseño:
//   - El `type` matchea exactamente el campo `type` del frontmatter — así
//     getStaticPaths puede filtrar la collection sin maps intermedios.
//   - `slug` es la forma plural usada en la URL: /categories/[slug]/.
//   - `displayName` se usa en H1, breadcrumb y meta.
//   - `intro` son 2-3 párrafos factual sobre la categoría. Anti-gray-hat:
//     descripciones técnicas, no marketing copy.
//   - `buyingGuideTopics`: cada uno se renderiza como sub-h3 con 2-3
//     párrafos en la sección "Buying guide" de la página.
//   - `faqs`: 4-5 Q&A head-term de categoría. Respuestas neutrales
//     ("depends on use case") cuando aplica.
//
// Categorías con <3 products no se generan — agrupación no útil.

export interface CategoryBuyingGuideTopic {
  /** Sub-h3 dentro de la sección "Buying guide". */
  heading: string;
  /** Párrafos del topic — cada string es un <p>. */
  body: string[];
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryMeta {
  /** Matches `type` field en el frontmatter del product. */
  type: 'espresso-machine' | 'grinder' | 'brewer' | 'accessory';
  /** Slug plural en la URL. */
  slug: string;
  /** Display name singular y plural — el segundo se usa en H1 y body. */
  displayName: string;
  /** Forma singular usada en "Best [category] for ..." y prosa. */
  singular: string;
  /** Meta description para <head>. ≤160 chars recomendado. */
  description: string;
  /** 2-3 párrafos editorial — array de strings, cada uno un <p>. */
  intro: string[];
  /** Buying guide topics. 3-4 sub-secciones. */
  buyingGuideTopics: CategoryBuyingGuideTopic[];
  /** FAQ entries — 4-5 head-term Q&A. */
  faqs: CategoryFaq[];
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    type: 'espresso-machine',
    slug: 'espresso-machines',
    displayName: 'Espresso Machines',
    singular: 'espresso machine',
    description:
      'Espresso machines in our catalog — from sub-$150 entry pumps and manual levers through prosumer dual-boilers and the La Marzocco Linea Mini.',
    intro: [
      'Espresso machines compress hot water through finely-ground coffee at roughly 9 bars of pressure. The category spans manual lever machines (no electricity, no pump, you provide the force), semi-automatic pump machines with a separate steam wand, and super-automatic bean-to-cup units that grind, dose, brew, and texture milk on a single button.',
      'The right architecture depends on whether you want to control extraction variables yourself or have the machine handle them — and on how much counter space you can dedicate to a single appliance. A manual lever pulls genuine 9-bar shots in 8 inches of width with no power outlet; a prosumer dual-boiler asks for 14+ inches and a 1500W circuit.',
      'Within pump machines, the meaningful divisions are boiler architecture (thermoblock, single boiler, heat exchanger, dual boiler), portafilter size (51mm and 54mm proprietary vs the 58mm commercial standard), and PID temperature control. Most cup-quality differences between sub-$2,000 machines come from those three variables more than from headline features.',
    ],
    buyingGuideTopics: [
      {
        heading: 'What to look for',
        body: [
          'PID temperature control is the highest-impact specification under $1,000 — it keeps brew water within ±1°C of target across consecutive shots, which removes one of the largest sources of cup variation. Below the PID tier, brew temperature drifts shot to shot and you compensate by adjusting grind, which only partially recovers the loss.',
          'Portafilter size determines your aftermarket. The 58mm commercial standard has every imaginable basket, tamper, distributor, and bottomless option built for it first. Breville\'s 54mm and De\'Longhi La Specialista\'s 51mm work fine out of the box but lock you into smaller aftermarket catalogs at slightly higher per-unit prices.',
          'For households making two or more milk drinks back to back, dual-boiler architecture (separate brew and steam circuits) removes the wait between shot and milk. For single-cup households, a single-boiler PID does the same work for $600-1,500 less — you just wait 30 seconds between brewing and steaming.',
        ],
      },
      {
        heading: 'Common pitfalls',
        body: [
          'Buying a machine without budgeting for a grinder. A $1,500 machine paired with a blade grinder produces worse coffee than a $400 machine paired with a $300 burr grinder. The grinder is usually the bottleneck. Plan the grinder spend alongside the machine spend.',
          'Choosing a super-automatic when you actually want to learn espresso. Super-automatics (Magnifica, Eletta) deliver drinkable coffee on a single button and require no skill — which is also the ceiling. If your interest is in the process and you might pull shots seriously in a year or two, a semi-auto with a real portafilter starts the learning curve and ends with better cups.',
          'Overlooking water hardness. In hard-water cities, machines without filtered tank water scale internally within 3-6 months. A $25 inline filter or a $40 jug filter doubles or triples machine lifespan compared to direct tap water.',
        ],
      },
      {
        heading: 'Budget guidance',
        body: [
          'Under $300: manual lever (Flair Classic, Cafelat Robot at $449) or entry electric (Casabrews). Real espresso is possible; the workflow demands more attention. The Bambino without Plus sits just outside this range and is the typical first electric pick.',
          '$300-$700: the sweet spot for first-machine buyers. Breville Bambino Plus, Gaggia Classic Pro, Lelit Anna, Rancilio Silvia. PID on most, real steam wands, 58mm on the Italian options. Cup quality from this tier matches anything below $1,500 once paired with a quality grinder.',
          '$700-$2,000: prosumer entry — heat exchanger E61s (Lelit Mara X, Rocket Appartamento), dual boilers (Breville Dual Boiler, Profitec Pro 300), and the upper Breville lineup (Barista Touch Impress, Oracle Touch). Build longevity steps up to 15-25 years; cup-quality gains diminish.',
          'Above $2,000: the Rancilio Silvia Pro X, ECM Classika PID, and La Marzocco Linea Mini at $5,900. Buy for build, repairability, and the satisfaction of brass and steel — not for measurable cup-quality leaps over a well-dialed sub-$2,000 machine.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a semi-automatic and a super-automatic espresso machine?',
        answer:
          'A semi-automatic uses a portafilter (you grind, dose, tamp, lock in, press start) and a steam wand you operate manually. A super-automatic has an internal grinder, automatic dosing, automatic brewing, and either an auto-frother or a milk carafe — beans go in, espresso or cappuccino comes out on a single button. Semi-autos give more control and better ceiling cup quality; super-autos give zero learning curve and acceptable everyday coffee.',
      },
      {
        question: 'Do I need a PID-controlled espresso machine?',
        answer:
          'For consistent shot-to-shot results, especially with light or single-origin roasts, yes — PID is the most impactful spec under $1,000. For dark-roast espresso pulled occasionally, a thermoblock without PID is usable. The aftermarket PID kits for the Gaggia Classic are well-documented if you want to add it later.',
      },
      {
        question: 'How much should I spend on an espresso machine versus a grinder?',
        answer:
          'A common heuristic is roughly equal spend, or weighted slightly toward the grinder for sub-$1,000 setups. A $500 machine + $500 grinder almost always beats a $900 machine + $100 grinder. Above the $1,500 machine tier, the grinder-to-machine ratio drops because grinder returns diminish around $700-800.',
      },
      {
        question: 'What is the smallest espresso machine that still produces good coffee?',
        answer:
          'The Breville Bambino at 7.5 inches wide is the smallest electric with real PID, preinfusion, and Thermojet heating that consistently pulls drinkable espresso. For genuinely tiny footprints, manual lever machines (Flair Classic, Cafelat Robot) are 5-7 inches wide and require no power outlet.',
      },
      {
        question: 'Can I make latte art on any espresso machine?',
        answer:
          'You need three things: dry steam at 4+ bar pressure, a wand you can position freely, and consistent shot quality so milk practice transfers shot to shot. Most pump machines above $400 with a real (non-Panarello) steam wand qualify. Auto-frothers (Bambino Plus, Oracle) produce competent microfoam but do not let you guide texture during steaming, which limits competition-grade pours.',
      },
    ],
  },
  {
    type: 'grinder',
    slug: 'grinders',
    displayName: 'Coffee Grinders',
    singular: 'coffee grinder',
    description:
      'Coffee grinders in our catalog — hand grinders from $79 through prosumer flat-burr electrics at $900. Espresso and filter use covered separately.',
    intro: [
      'A grinder is often the higher-impact upgrade in a home coffee setup. The two questions that decide everything else: burr type (flat vs conical), and whether you grind on-demand for one shot or weigh out doses ahead of time. Stepped vs stepless adjustment matters for fine-tuning espresso; for filter coffee, stepped is fine.',
      'Burr geometry shapes the particle distribution: flat burrs tend toward bimodal distributions perceived as cleaner and more separated in the cup; conicals produce a slightly wider distribution often described as heavier-bodied. Both pull excellent espresso. Pick by retention, footprint, and budget more than by geometry alone.',
      'Retention — the grams of coffee a grinder keeps inside between sessions — matters for single-dose workflows where you switch beans often. Under 1g is excellent; 1-3g is normal for hopper-fed designs; over 5g is a problem only if you weigh dose-in. For one-bean households running a single hopper, retention is usually irrelevant.',
    ],
    buyingGuideTopics: [
      {
        heading: 'What to look for',
        body: [
          'For espresso specifically, you need fine adjustment in the espresso range (typically the first 5-15 steps from zero), low retention if you change beans, and a chassis that does not walk across the counter under load. The Baratza Encore ESP, Eureka Mignon series, and DF64 all meet these criteria at different price tiers.',
          'For filter coffee (V60, Chemex, AeroPress, drip), grind consistency matters more than fine adjustment. The Baratza Encore, Fellow Ode Gen 2, and Wilfa Svart cover this segment well. Filter coarseness is more forgiving than espresso fineness — a budget grinder that fails on espresso may still grind excellent pour-over.',
          'Stepless adjustment lets you move in fractions of a click for espresso dialing — the difference between an 18g/36g shot in 28 seconds and 32 seconds is often a quarter-step of grind. For Breville Bambino-class machines with built-in flow assistance, stepped is usable. For Gaggia Classic and above, stepless makes dialing meaningfully faster.',
        ],
      },
      {
        heading: 'Common pitfalls',
        body: [
          'Treating a blade grinder as a starting point. Blade grinders produce uneven particle sizes that channel and underextract in any espresso machine and any filter brew. A $79 hand grinder (Timemore C2) produces meaningfully better coffee than a $40 blade. For espresso specifically, blade grinders are a dead end.',
          'Buying a hand grinder for daily espresso. Premium hand grinders (Comandante C40, 1Zpresso JX-Pro) produce excellent espresso, but each shot costs 60+ seconds of grinding effort. For one daily shot, fine; for three or four, the friction adds up and you stop pulling shots. Electric pays off above a shot per day if your time has any value.',
          'Spending grinder budget on the espresso machine instead. A $1,500 machine + $300 grinder pulls worse coffee than a $700 machine + $1,100 grinder in most cases. The grinder is usually the bottleneck up to about $700; above $700 the gains flatten.',
        ],
      },
      {
        heading: 'Budget guidance',
        body: [
          'Under $200: budget electric (Wilfa Svart, OXO Brew, Baratza Encore for filter; Baratza Encore ESP for entry espresso) or hand (Timemore C2 at $79). The Encore ESP at $199 is the typical recommendation as the first espresso-capable electric for Breville Bambino-class machines.',
          '$200-$500: serious territory. Hand grinders peak here (1Zpresso JX-Pro, Comandante C40); electric brings single-dose flat-burr designs (DF64 at $449) and Baratza\'s Sette 270 with vertical conical architecture. For users committed to home espresso, this is where most stop.',
          '$500-$900: prosumer flat-burr (Eureka Mignon Silenzio/Specialita, Niche Zero, Mahlkonig X54). Italian build, longer service life, marginal cup-quality gains over the $400 tier. The Niche Zero is the single-dose conical reference at this tier; Eureka covers the hopper-fed flat-burr side.',
          'Above $900: not represented in this catalog — pricing crosses into commercial territory (EK43, Mythos), where ROI for home use is rarely defensible without specific use cases.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Flat burr or conical burr — which is better for espresso?',
        answer:
          'Subjective. Flat burrs are often described as cleaner and more separated in the cup; conicals as heavier-bodied and more chocolatey. Both pull excellent espresso when dialed well. The Eureka Mignon (flat) and Niche Zero (conical) are widely cross-shopped at the same price and most blind tasters cannot reliably distinguish them — pick by retention behavior, footprint, and budget.',
      },
      {
        question: 'Do I really need a stepless grinder for espresso?',
        answer:
          'For modded Gaggia, Rancilio, and prosumer machines, yes — stepless adjustment makes dialing dramatically faster and more repeatable. For Breville Bambino-class machines with assisted preinfusion, stepped (Baratza Encore ESP) is usable because the machine compensates for small grind drift. Hand grinders with 200+ click resolution are functionally near-stepless.',
      },
      {
        question: 'How important is retention if I always use the same beans?',
        answer:
          'Low. Retention only matters when you switch beans and want each session to start with the new bean — typically single-dose workflows where freshness is the priority. For hopper-fed daily-driver setups using one bean at a time, retention is irrelevant because the same coffee just stays in the chamber.',
      },
      {
        question: 'Can the same grinder do both espresso and pour-over well?',
        answer:
          'Yes, but with trade-offs. The Baratza Encore ESP, DF64, and Mahlkonig X54 all span both ranges. The compromise is dialing time — switching from espresso fine to pour-over coarse requires several adjustment turns and a purge shot. Dedicated households often keep two grinders to skip this; single-grinder households accept the friction.',
      },
      {
        question: 'How long does a quality grinder last?',
        answer:
          'Burrs are the wear part. Steel burrs in home use typically last 500-1,000 lbs of coffee — roughly 5-15 years for one or two shots a day. Ceramic burrs (some hand grinders) last longer but chip more easily. The motor and chassis usually outlast the burrs; most Baratza, Eureka, and Niche grinders are serviceable with replacement parts for a decade or more.',
      },
    ],
  },
  {
    type: 'brewer',
    slug: 'brewers',
    displayName: 'Coffee Brewers',
    singular: 'coffee brewer',
    description:
      'Manual and electric coffee brewers in our catalog — pour-over cones, immersion presses, AeroPress, Moka pot, and the Moccamaster KBGV batch drip.',
    intro: [
      'Coffee brewers in this catalog cover the non-espresso methods: pour-over cones (V60, Kalita Wave, Chemex), immersion devices (French press, AeroPress), stovetop pressure (Moka pot), and electric drip (Moccamaster). Each method extracts differently and produces a distinct cup profile.',
      'The two underlying axes are immersion vs percolation, and filter material. Immersion (French press, AeroPress) submerges grounds in water for a fixed time, producing fuller-bodied cups with more dissolved solids; percolation (pour-over, drip) flows water through a grounds bed, producing cleaner cups with less sediment. Paper filters retain oils and fines; metal filters pass both.',
      'Brewer choice usually comes down to capacity (single cup vs batch), cleanup tolerance (paper is trivial, metal mesh requires care), and pour control. A $25 Hario V60 and a $45 Kalita Wave both produce excellent specialty-cafe coffee for one drink at a time; a $359 Moccamaster does the same job for 4-10 cups without skill.',
    ],
    buyingGuideTopics: [
      {
        heading: 'What to look for',
        body: [
          'Match the brewer to your batch size. A V60-02 brews one or two cups well and four cups badly (too tall a coffee bed). A Chemex 6-cup brews four to six cups well and one cup badly (too thin a bed). The Moccamaster handles 4-10 cups in batch mode and is the only brewer in this catalog designed for daily multi-cup households.',
          'Filter type changes the cup. Chemex bonded filters are thick and remove the most oils, producing exceptionally clean cups; Hario V60 filters are thinner and faster, producing brighter cups; Kalita Wave filters sit between the two. AeroPress paper filters are similar to V60 in clarity; AeroPress with a metal filter passes more body and oils.',
          'Pour-over needs a gooseneck kettle for controlled flow. Without one, V60 and Chemex underextract through channeling; Kalita Wave is more forgiving because the flat bottom and three holes regulate flow regardless of pour technique. The Moccamaster and French press do not need a gooseneck.',
        ],
      },
      {
        heading: 'Common pitfalls',
        body: [
          'Buying a pour-over brewer without budgeting for grind quality. Pour-over rewards consistent grind more than any espresso brewer — a blade-grinder pour-over produces a muddy, uneven cup that obscures the entire point of the method. A $25 V60 plus a $79 hand grinder beats a $50 V60 alone.',
          'Confusing Moka pot espresso with real espresso. The Bialetti Moka produces a strong, concentrated coffee at 1-2 bars of pressure — useful and tasty, but not espresso (9 bars). It is not an espresso substitute for cappuccino microfoam or rich crema; it is its own category.',
          'Choosing a French press for daily coffee without committing to cleanup. The mesh plunger and gasket require thorough rinsing or the coffee tastes muddy within a week. AeroPress paper filters discard cleanly; French press metal mesh does not. Pick based on washing tolerance, not just cup style.',
        ],
      },
      {
        heading: 'Budget guidance',
        body: [
          'Under $50: nearly every manual brewer in this catalog sits here. Hario V60-02 at $25 is the specialty-coffee reference price; Kalita Wave 185 at $45 is the beginner-friendly alternative; AeroPress at $39 is the most forgiving single-cup brewer. A French press from Bodum or a Moka pot from Bialetti round out the budget tier.',
          '$50-$100: Chemex Classic 6-cup at $49 fits here — the same brewer aesthetic and brand at the budget end. Most upgrades from base manual brewers are in accessories (kettle, scale, grinder), not in the brewer itself.',
          'Above $100: only electric drip and specialty designs. The Technivorm Moccamaster KBGV at $359 is the SCA-certified one-button reference for daily 4-10 cup households. Below the Moccamaster, electric drip brewers compromise on water temperature and bloom timing in ways that affect cup quality.',
        ],
      },
    ],
    faqs: [
      {
        question: 'V60 or Kalita Wave for beginners?',
        answer:
          'Kalita Wave. The flat bottom and three controlled flow holes forgive uneven pouring much better than the V60\'s cone, which channels easily without a steady gooseneck pour. The V60 rewards skill and produces brighter cups when dialed; the Kalita Wave delivers reliable cups with less practice.',
      },
      {
        question: 'Is the AeroPress as good as pour-over?',
        answer:
          'For single-cup specialty coffee, yes — the AeroPress is one of the most forgiving brewers in coffee and produces cups competitive with pour-over with a fraction of the technique. It is also travel-friendly. The trade-off is a slightly different cup profile (often described as more concentrated and less aromatic) due to the immersion-then-press mechanic.',
      },
      {
        question: 'Do I need a gooseneck kettle for pour-over?',
        answer:
          'For V60 and Chemex, yes — a heavy stream from a regular kettle channels and underextracts. For Kalita Wave, it helps but is not strictly required because the flat bottom regulates flow. For French press and AeroPress, any kettle works since you pour all the water at once.',
      },
      {
        question: 'What about cold brew?',
        answer:
          'Most cold brew uses the same brewers in immersion mode — a French press or AeroPress (with extended steep time) doubles as a cold brew device. Dedicated cold brew makers exist but are not represented in this catalog because they add little over multi-purpose brewers for home use.',
      },
      {
        question: 'Can I use one brewer for everything?',
        answer:
          'AeroPress comes closest — it handles single-cup specialty coffee, cold brew, and even espresso-style concentrate (not real espresso, but close enough for milk drinks). For households brewing for multiple people daily, the Moccamaster is the more practical single-brewer solution. Most enthusiast households end up with two: one batch brewer, one single-cup pour-over or AeroPress.',
      },
    ],
  },
  {
    type: 'accessory',
    slug: 'accessories',
    displayName: 'Coffee Accessories',
    singular: 'coffee accessory',
    description:
      'Espresso and brewing accessories in our catalog — tampers, knock boxes, WDT tools, milk pitchers, puck screens, scales, kettles, and cleaning supplies.',
    intro: [
      'Coffee accessories cover the workflow gaps that most espresso machines and brewers leave open: a real calibrated tamper instead of the plastic stock one, a knock box for spent pucks, a milk pitcher sized to your drink volume, a WDT tool to break clumps before tamping, cleaning powders for weekly maintenance, and scales precise enough to weigh shots in real time.',
      'In total accessory budget terms, a first-year home espresso setup typically benefits more from $150-200 of accessories than from any single $200 upgrade elsewhere. The tamper alone eliminates shot-to-shot pressure variation; the knock box eliminates one of the biggest workflow frictions; the milk pitcher determines whether latte art is even possible.',
      'Sizing matters more in accessories than in machines. A 12oz milk pitcher fits Breville Bambino auto-frothing geometry and single-cup drinks; a 20oz pitcher handles two-drink batches. A 54mm tamper fits the entire Breville lineup; a 58mm tamper fits Gaggia, Rancilio, and most prosumer machines. Generic Amazon accessories often ship in one nominal size with loose tolerances; brand accessories (Normcore, Rattleware, Joe Frex) hold sizing to a quarter-millimeter.',
    ],
    buyingGuideTopics: [
      {
        heading: 'What to look for',
        body: [
          'A calibrated tamper sized to your basket is the single highest-ROI accessory. Stock tampers from Breville, Gaggia, and De\'Longhi are plastic, undersized, and inconsistent. A $40-65 spring-loaded tamper (Normcore at both 54mm and 58mm) removes tamping pressure variation entirely and is the cheapest upgrade with a visible effect on shot quality.',
          'For milk drinks, the pitcher size dictates the drink size. A 12oz pitcher fills a 6-8oz cappuccino with the right milk-to-coffee ratio; a 20oz pitcher fills two drinks back to back. The spout geometry (sharp competition cut vs rounded) determines latte art capability; the Rattleware 12oz and Joe Frex 20oz both ship with cafe-grade spouts.',
          'For dialed-in espresso workflows, a scale resolving to 0.1g is the second high-ROI accessory after the tamper. The Acaia Pearl S at $220 is the gold standard with auto-tare and shot-timer integration; budget options resolve the same 0.1g for $30 without the app integration.',
          'Cleaning supplies are non-optional, not nice-to-have. Cafiza (alkaline) removes coffee oils via weekly backflushing; a descaler (citric or lactic acid) removes limescale every 3-6 months depending on water hardness. Skipping either accelerates machine failure.',
        ],
      },
      {
        heading: 'Common pitfalls',
        body: [
          'Buying the wrong tamper size. A 58mm tamper does not fit a Breville 54mm basket and vice versa. Check your machine\'s portafilter size before ordering; Breville is 54mm across the current lineup, Gaggia and most Italian prosumer machines are 58mm, and De\'Longhi La Specialista is 51mm.',
          'Skipping a knock box and knocking pucks into the trash. Wet pucks stain trash bag interiors and create mess. A $24-65 knock box pays for itself in a couple of months in avoided cleanup. Match the box height to your machine — under 5 inches for under-Bambino-tray fit, 5+ inches for counter use.',
          'Treating Cafiza as a descaler or vice versa. Cafiza is alkaline and removes coffee oils; descalers are acidic and remove limescale. Mixing them up is the most common maintenance mistake — running Cafiza through a scaled boiler does nothing, and running citric through a coffee-oily group head does nothing for the oil layer.',
        ],
      },
      {
        heading: 'Budget guidance',
        body: [
          'Bare essentials (under $50 total): a basic tamper if your stock one is unusable, a small knock box, and Cafiza for cleaning. This is the absolute floor for a working espresso workflow.',
          'First-year recommended ($100-200 total): calibrated spring-loaded tamper ($40-65), knock box ($25-65), milk pitcher in your drink size ($22-38), WDT tool ($32-89), puck screen ($19), and cleaning supplies ($18). Coverage of the workflow gaps that ship with most starter machines.',
          'Upgrade tier ($200+ total): replace any of the above with premium variants (Bplus WDT, Acaia Pearl S scale at $220, Fellow Stagg EKG kettle at $195 for pour-over). The marginal gains over the first-year tier are small but real — Acaia\'s auto-timer integration and Bplus\'s 0.35mm needles are the kind of detail that matters to users tracking every shot.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What accessories should I buy first with a new espresso machine?',
        answer:
          'In order of impact: (1) a real tamper sized to your basket, (2) a knock box, (3) a milk pitcher if you make milk drinks, (4) a WDT tool, (5) cleaning supplies. The tamper and WDT have the largest cup-quality effect; the knock box has the largest workflow effect.',
      },
      {
        question: 'Are calibrated spring-loaded tampers better than flat tampers for beginners?',
        answer:
          'Yes, almost universally. A spring-loaded tamper applies a calibrated 30-lb pressure every shot regardless of how hard you push; a flat tamper depends on user technique and produces 5-10 pound variation shot to shot. For the first 6-12 months of espresso, a spring-loaded tamper eliminates one of the biggest sources of shot variation.',
      },
      {
        question: 'Do I need a WDT tool, or is a paperclip fine?',
        answer:
          'A bent paperclip works and many home baristas use one for years. A dedicated WDT tool produces more even distribution because the needles are thinner (0.35-0.4mm vs the paperclip\'s ~1mm) and there are multiple needles spaced in a circle. The cup-quality gap is small but real, and the cost is low ($32-89).',
      },
      {
        question: 'How often should I clean my espresso machine?',
        answer:
          'Backflush with Cafiza weekly if your machine has a three-way solenoid (most semi-autos above the Bambino tier). Descale every 3 months in hard-water cities, every 6 months in soft-water areas. Wipe the steam wand after every use to prevent milk crust buildup. Skipping any of these accelerates machine failure within 2-3 years.',
      },
      {
        question: 'Is the Acaia Pearl worth the premium over a $30 scale?',
        answer:
          'For pure weighing, no — a $30 scale resolves 0.1g and times shots. For app integration, recipe tracking, shot-timer auto-start, and consistent build quality across multiple units, yes. Most home baristas can live with a budget scale; the Acaia earns its price for users who track every shot or who already use the Acaia app for recipe management.',
      },
    ],
  },
];

/**
 * Devuelve el CategoryMeta para un product type dado, o null si la
 * categoría no tiene página propia (no debería ocurrir con el catalog
 * actual — todas las 4 types tienen ≥3 productos).
 */
export function categoryMetaForType(type: string): CategoryMeta | null {
  return CATEGORY_META.find((c) => c.type === type) ?? null;
}

/**
 * Mapping from product type → category page slug. Para uso por el
 * helper related-content.ts y por internal linking en otras páginas.
 */
export function categorySlugForType(type: string): string | null {
  return categoryMetaForType(type)?.slug ?? null;
}
