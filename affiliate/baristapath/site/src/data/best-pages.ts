// Best-of page definitions. Kept in a standalone module so `getStaticPaths`
// in src/pages/best/[slug].astro can import them — Astro hoists getStaticPaths
// out of the component's top-level frontmatter, so a module-scoped const is
// not in scope there.

import type { CollectionEntry } from 'astro:content';

type ProductData = CollectionEntry<'products'>['data'];

export interface BestPage {
  slug: string;
  title: string;
  intro: string;
  /**
   * Versión HTML opcional de intro — cuando está presente, el template la
   * renderiza con set:html en lugar de intro. Habilita inline links a
   * /glossary/#<slug> y otras páginas internas. El contenido es
   * authored-by-us (no XSS risk).
   */
  introHtml?: string;
  description: string;
  filter: (p: ProductData) => boolean;
  sort?: (a: ProductData, b: ProductData) => number;
  faqExtras?: Array<{ q: string; a: string }>;
}

// Type-guard helpers for feature access. `features` is a permissive
// Record<string, string|number|boolean>; these wrappers keep filter predicates
// type-safe without sprinkling casts everywhere.
const numFeature = (p: ProductData, key: string): number | undefined => {
  const v = p.features[key];
  return typeof v === 'number' ? v : undefined;
};

const boolFeature = (p: ProductData, key: string): boolean => {
  const v = p.features[key];
  return v === true;
};

const strFeature = (p: ProductData, key: string): string | undefined => {
  const v = p.features[key];
  return typeof v === 'string' ? v : undefined;
};

// Tag/best_for membership helpers (case-insensitive substring match for
// best_for since phrasing varies, exact-match for tags which are controlled).
const hasTag = (p: ProductData, tag: string): boolean => p.tags.includes(tag);
const bestForIncludes = (p: ProductData, needle: string): boolean =>
  p.best_for.some((s) => s.toLowerCase().includes(needle.toLowerCase()));

export const bestPages: BestPage[] = [
  // ============================================================
  // Batch 1 — original, validated via issues #20 / #21
  // ============================================================
  {
    slug: 'best-espresso-machine-under-500',
    title: 'Best Espresso Machines Under $500',
    intro:
      'Under $500 is the price zone where home espresso transitions from "barely drinkable" to "actually good." The picks below balance build quality, temperature control, and upgrade potential.',
    // introHtml: linkea PID y thermoblock al glossary. Cap 2 links — el
    // intro es corto y over-linking se ve raro arriba del fold.
    introHtml:
      'Under $500 is the price zone where home espresso transitions from "barely drinkable" to "actually good." The picks below balance build quality, <a href="/glossary/#pid-controller">temperature control</a>, and upgrade potential — most options at this tier use a <a href="/glossary/#thermoblock">thermoblock</a> heater rather than a full boiler.',
    description:
      'Hand-picked espresso machines under $500 with PID, real steam wands, and serviceable parts. Ranked by build quality and shot consistency.',
    filter: (p) => p.type === 'espresso-machine' && p.price < 500,
    sort: (a, b) => b.price - a.price,
  },
  {
    slug: 'best-grinder-under-200',
    title: 'Best Coffee Grinders Under $200',
    intro:
      'A quality grinder matters more than a quality espresso machine — even a $200 grinder can outperform a $1,500 machine paired with a blade grinder. The picks here cover both espresso and filter use.',
    introHtml:
      'A quality grinder matters more than a quality espresso machine — even a $200 <a href="/glossary/#burr">burr grinder</a> can outperform a $1,500 machine paired with a blade grinder. The picks here cover both espresso and filter use, with notes on <a href="/glossary/#retention">retention</a> and adjustment for each. If you can stretch the budget, our <a href="/best/best-grinder-under-300/">best grinder under $300</a> roundup covers the mid-tier where flat-burr single-dose and premium hand grinders open up.',
    description:
      'Best burr grinders under $200 for espresso and filter coffee. Includes electric and hand grinders, ranked by particle distribution and value.',
    filter: (p) => p.type === 'grinder' && p.price < 200,
    sort: (a, b) => b.price - a.price,
  },
  {
    // KGR opportunity: catalog ahora cubre el rango $200-300 con 5
    // grinders distintos (Fellow Opus, Encore ESP, K-Ultra, DF54,
    // Comandante C40). No existía URL canónica de aterrizaje para esa
    // query — esta página la abre. Filter intencionalmente usa rangos
    // 180-320 para capturar productos que rondan $200 sin missing al
    // Encore ESP por $1 ni al Comandante por overshooting el budget.
    slug: 'best-grinder-under-300',
    title: 'Best Coffee Grinder Under $300',
    intro:
      'The $200-$300 segment is the sweet spot where home grinders stop compromising and start producing genuinely good coffee. Sub-$200 picks deliver acceptable grinds but force trade-offs on retention, dialing resolution, or burr quality; above $500 you enter prosumer territory where returns flatten quickly for most home setups. Between those tiers, this is where most home baristas can stop upgrading for a long time.',
    introHtml:
      'The $200-$300 segment is the sweet spot where home grinders stop compromising and start producing genuinely good coffee. Sub-$200 picks (covered in our <a href="/best/best-grinder-under-200/">budget grinder roundup</a>) deliver acceptable grinds but force trade-offs on <a href="/glossary/#retention">retention</a>, dialing resolution, or <a href="/glossary/#burr">burr</a> quality; above $500 you enter prosumer territory where returns flatten quickly for most home setups. Between those tiers, this is where most home baristas can stop upgrading for a long time.<br /><br />The trade-offs in this segment split along three axes: <a href="/glossary/#flat-burr">flat</a> vs <a href="/glossary/#conical-burr">conical</a> burrs (flat tends to produce cleaner separation, conical more body), electric vs hand (electric saves 60 seconds per dose, hand wins on price-to-burr-quality and quietness), and <a href="/glossary/#single-dosing">single-dose</a> vs hopper-fed (single-dose for bean rotation, hopper for daily-driver speed). The picks below cover each axis with an honest note on who they are wrong for.',
    description:
      'Honest picks for grinders between $200-$300 — covering espresso, pour-over, hand, single-dose, and all-purpose use cases.',
    // Filter intencional 180-320: captura productos que rondan $200 (Opus
    // $195) y permite leve overshoot a $299 (Comandante) — sin colar
    // Sette 270 ($379) ni excluir Encore ESP ($199) por umbrales estrictos.
    filter: (p) => p.type === 'grinder' && p.price >= 180 && p.price <= 320,
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is a $300 grinder really better than a $150 grinder?',
        a: 'For espresso, yes — measurably. The jump from a $150 entry burr to a $250-$300 single-dose flat-burr or premium hand grinder cuts retention from 3-5g to under 0.5g, opens up stepless or near-stepless dialing, and produces a more even particle distribution that visibly reduces channeling. For filter coffee, the gap is smaller — a Baratza Encore at $169 already pulls excellent pour-over. Spend the extra $100-150 if you do espresso; spend it elsewhere if you only brew V60 and AeroPress.',
      },
      {
        q: 'Hand grinder or electric grinder in the $200-$300 range?',
        a: 'Hand grinders (1Zpresso K-Ultra, Comandante C40) win on burr quality per dollar — a $249 hand grinder competes with $500-$700 electrics on grind consistency. Electrics (DF54, Encore ESP, Fellow Opus) win on workflow — no 45-60 seconds of grinding effort per dose, and consistent output regardless of arm fatigue. For one daily cup, hand is fine; for two or more daily, or any household making multiple drinks back to back, electric pays off within months.',
      },
      {
        q: 'Single-dose or hopper-fed in this tier?',
        a: 'Single-dose (MiiCoffee DF54, Fellow Opus) if you switch beans more than once a week — light morning, dark afternoon, decaf evening. Near-zero retention means each dose starts clean and bean transitions take seconds, not a purge shot. Hopper-fed (Baratza Encore ESP) if you stick to one bean for weeks at a time — the workflow is faster (no weighing in beans), the burrs stay warm, and the dose is more consistent.',
      },
      {
        q: 'Why is the Baratza Encore ESP the espresso pick over the Fellow Opus at a similar price?',
        a: 'Honestly, both grind espresso, but the Encore ESP has dedicated espresso steps (Baratza added a finer adjustment range below the standard Encore) while the Opus is a jack-of-all-trades that grinds espresso "well enough" rather than well. For a dedicated espresso grinder under $200, the Encore ESP is the right pick; for someone who brews V60 in the morning and espresso on weekends, the Opus is a more honest single-grinder solution. At this tier, the flat-burr single-dose alternatives (DF54) outperform both conicals for espresso clarity — worth the extra $50 if espresso is the priority.',
      },
      {
        q: 'What workflow caveats should I know about the picks in this range?',
        a: 'The 1Zpresso K-Ultra is a hand grinder — espresso doses take 45-60 seconds of grinding effort, which gets tiring for daily multi-drink households. The MiiCoffee DF54 is excellent out of the box but many owners eventually add aftermarket parts (anti-static bellows is not needed thanks to the plasma ionizer, but a better dosing cup or declumper is common). The Fellow Opus is genuinely all-purpose but should not be confused with a serious espresso grinder — its espresso range is on the coarse side of optimal. The Comandante C40 is reference-grade for filter but tedious for espresso. Pick by your actual brewing pattern, not by the headline spec.',
      },
      {
        q: 'When does it make sense to skip this tier and go straight to a $500+ grinder?',
        a: 'When you already own a $1,000+ espresso machine and the grinder is the obvious bottleneck. When you brew multiple shots a day and want hopper-fed convenience with low retention (Eureka Mignon Specialita at $700, Niche Zero at $799). When you do espresso exclusively and want clean, separated light-roast extractions (DF64 at $449, Mahlkonig X54 at $899). For most home setups pairing a $300-$700 machine with a $200-$300 grinder, this tier is the right ceiling.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-beginners',
    title: 'Best Espresso Machines for Beginners',
    intro:
      'Beginner-friendly espresso machines combine PID temperature control, forgiving workflows, and either assisted milk steaming or simple steam wands. These picks let new home baristas pull drinkable shots quickly.',
    description:
      'Top espresso machines for beginners: PID-equipped, simple to dial, with strong support and clear upgrade paths.',
    filter: (p) => p.type === 'espresso-machine' && p.tags.includes('beginner-friendly'),
    sort: (a, b) => a.price - b.price,
  },
  {
    slug: 'best-grinder-for-espresso',
    title: 'Best Grinders for Espresso',
    intro:
      'Espresso grinding is harder than filter grinding: finer particles, tighter tolerance, more retention. The picks below dial espresso consistently and pair with $500-$3,000 machines without becoming the bottleneck.',
    description:
      'Best burr grinders for espresso — stepless adjustment, low retention, particle distributions suited to 9-bar extraction.',
    filter: (p) => p.type === 'grinder' && (p.best_for.includes('espresso shots') || p.tags.includes('espresso')),
    sort: (a, b) => a.price - b.price,
  },
  {
    slug: 'best-espresso-machine-for-small-kitchen',
    title: 'Best Espresso Machines for Small Kitchens',
    intro:
      'Apartment kitchens and tight counters benefit from compact espresso machines under 10 inches wide. The picks here deliver real espresso without dominating the workspace.',
    description:
      'Compact espresso machines under 10 inches wide for apartments and small kitchens. Includes thermojet and dual-boiler options.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (p.tags.includes('small-kitchen') || p.tags.includes('compact')),
    sort: (a, b) => a.price - b.price,
  },
  {
    slug: 'best-budget-espresso-machine',
    title: 'Best Budget Espresso Machines',
    intro:
      'Under $300, options shrink fast — but they exist. The picks here include both manual lever (Flair Classic) and entry electric (Casabrews) options that produce real espresso for users not ready to spend $500+.',
    description:
      'Best espresso machines under $300: manual lever and entry electric options that produce drinkable espresso on a budget.',
    filter: (p) => p.type === 'espresso-machine' && p.price < 300,
    sort: (a, b) => a.price - b.price,
  },

  // ============================================================
  // Batch 2 — KGR gold long-tails (#20 / #21 patterns)
  // ============================================================

  // -- Pattern A: "under [price] with [feature]" --------------
  {
    slug: 'best-espresso-machine-with-built-in-grinder',
    title: 'Best Espresso Machines With Built-in Grinder',
    intro:
      'A built-in grinder eliminates a second appliance on the counter — convenient for small kitchens, kitchen-saver for first-machine buyers. The picks here span $450 super-automatics through $2,800 Oracle Touch territory. We rank them by grinder quality (the actual bottleneck) more than headline features.',
    description:
      'Best espresso machines with built-in grinders — all-in-one semi-autos and super-automatics across price tiers.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (boolFeature(p, 'built_in_grinder') ||
        boolFeature(p, 'integrated_grinder') ||
        boolFeature(p, 'super_automatic')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is an espresso machine with a built-in grinder worth it?',
        a: 'For small kitchens and one-box households, yes. For users who want to maximize cup quality per dollar, a separate machine and grinder almost always wins because the integrated grinder is the cost-optimized component.',
      },
      {
        q: 'Which all-in-one has the best grinder?',
        a: 'In our catalog, the Oracle Touch ($2,799) has the best integrated grinder by a wide margin — Breville pairs it with auto-tamping. Below that, the Barista Express and Barista Touch Impress share a similar conical burr; the De\'Longhi Magnifica\'s grinder is the entry option.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-under-500-with-milk-frother',
    title: 'Best Espresso Machines Under $500 With Milk Frother',
    intro:
      'Most sub-$500 machines include some milk wand — but they range from Panarello aids to real commercial-style wands to fully automatic foam systems. The picks here separate the categories so you buy the one that actually matches the latte you want.',
    description:
      'Espresso machines under $500 with milk frothing — Panarello, manual commercial wand, and auto-froth options compared.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      p.price < 500 &&
      (boolFeature(p, 'auto_milk_frother') ||
        boolFeature(p, 'commercial_steam_wand') ||
        strFeature(p, 'steam_wand') !== undefined ||
        hasTag(p, 'milk-drinks')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is an auto-frother better than a manual steam wand for beginners?',
        a: 'For pure convenience, yes. For latte art and skill development, no — a commercial-style manual wand teaches microfoam technique. The Bambino Plus auto wand is the rare middle ground that adjusts temp and froth level for you.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-under-1000-with-pid',
    title: 'Best Espresso Machines Under $1,000 With PID',
    intro:
      'PID temperature control under $1,000 is no longer rare — but implementations differ. Some are factory PIDs on single thermocoils; others are real prosumer single-boiler PIDs with 58mm commercial groups. The picks here flag which is which.',
    introHtml:
      '<a href="/glossary/#pid-controller">PID</a> temperature control under $1,000 is no longer rare — but implementations differ. Some are factory PIDs on <a href="/glossary/#thermoblock">single thermocoils</a>; others are real prosumer <a href="/glossary/#single-boiler">single-boiler</a> PIDs with 58mm commercial <a href="/glossary/#group-head">groups</a>. The picks here flag which is which.',
    description:
      'PID-equipped espresso machines under $1,000 — from Breville thermojet to Lelit Anna and Rancilio Silvia. Compared on temperature stability and upgrade path.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      p.price < 1000 &&
      boolFeature(p, 'pid'),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Does PID make a real difference in cup quality?',
        a: 'For light roasts and shot-to-shot consistency, yes — temperature is the most impactful variable after grind. A factory PID also saves you $80-150 on aftermarket kits if you would have installed one anyway.',
      },
      {
        q: 'What is the difference between a thermocoil PID and a boiler PID?',
        a: 'Thermocoil heats water on-demand and reads temperature at the exit; boiler PIDs hold a tank of water at a target. Boilers are more stable across consecutive shots; thermocoils warm up faster and are more compact.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-under-700-with-58mm-portafilter',
    title: 'Best Espresso Machines Under $700 With 58mm Portafilter',
    intro:
      'A 58mm commercial portafilter unlocks the broadest aftermarket: bottomless baskets, precision tampers, puck screens, dosing funnels. The picks here are all sub-$700 machines that ship with the standard 58mm group, not Breville\'s 54mm or De\'Longhi\'s 51mm.',
    introHtml:
      'A 58mm commercial <a href="/glossary/#portafilter">portafilter</a> unlocks the broadest aftermarket: <a href="/glossary/#bottomless-portafilter">bottomless baskets</a>, precision <a href="/glossary/#calibrated-tamper">tampers</a>, <a href="/glossary/#puck-screen">puck screens</a>, dosing funnels. The picks here are all sub-$700 machines that ship with the standard 58mm <a href="/glossary/#group-head">group</a>, not Breville\'s 54mm or De\'Longhi\'s 51mm.',
    description:
      'Sub-$700 espresso machines with commercial 58mm portafilters — Gaggia, Rancilio, Lelit, and lever options compared.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      p.price < 700 &&
      (strFeature(p, 'group_head')?.includes('58') ?? false),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Why does 58mm matter?',
        a: '58mm is the commercial standard. Every premium basket, tamper, distributor, and bottomless portafilter is built for it first. 54mm (Breville) and 51mm (De\'Longhi entry) lock you into a smaller aftermarket — fine for stock use, frustrating if you want to mod.',
      },
    ],
  },
  {
    slug: 'best-grinder-under-500-with-stepless-adjustment',
    title: 'Best Coffee Grinders Under $500 With Stepless Adjustment',
    intro:
      'Stepless adjustment is the unlock for serious espresso dialing — you can move in fractions of a step instead of jumping between fixed positions. Under $500, options span budget single-dose, mid-range flat-burr, and Wilfa\'s filter-focused entry pick.',
    introHtml:
      '<a href="/glossary/#stepless-adjustment">Stepless adjustment</a> is the unlock for serious espresso dialing — you can move in fractions of a step instead of jumping between fixed positions. Under $500, options span budget <a href="/glossary/#single-dosing">single-dose</a>, mid-range <a href="/glossary/#flat-burr">flat-burr</a>, and Wilfa\'s filter-focused entry pick. If $500 is above your budget, our <a href="/best/best-grinder-under-300/">best grinder under $300</a> roundup covers the cheaper end of the same workflow with stepless-capable picks like the MiiCoffee DF54.',
    description:
      'Stepless burr grinders under $500 for precise espresso dialing — Wilfa Svart, Sette 270, and DF64 compared.',
    filter: (p) =>
      p.type === 'grinder' &&
      p.price < 500 &&
      boolFeature(p, 'stepless'),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Do I need stepless adjustment for espresso?',
        a: 'For Breville Bambino-class machines, stepped is usable. For Gaggia Classic and up, stepless makes dialing much faster and more repeatable. The 200-click "near stepless" hand grinders give you most of the benefit at a fraction of the price.',
      },
    ],
  },
  {
    slug: 'best-grinder-under-500-with-low-retention',
    title: 'Best Coffee Grinders Under $500 With Low Retention',
    intro:
      'Retention is the gram or two of coffee a grinder keeps inside between sessions. For single-dose workflows, low retention is the difference between a clean 18g shot and a frustrating 16.5g shot. The picks here all measure under 1g retained.',
    description:
      'Low-retention grinders under $500 — Baratza Sette 270, DF64, and Fellow Ode Gen 2 compared for single-dose workflows.',
    filter: (p) => {
      const retention = numFeature(p, 'retention_g');
      const singleDose = boolFeature(p, 'single_dose');
      return (
        p.type === 'grinder' &&
        p.price < 500 &&
        ((retention !== undefined && retention < 1) || singleDose || hasTag(p, 'low-retention'))
      );
    },
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'How much retention is too much?',
        a: 'Under 1g is excellent; 1-3g is normal for hopper-fed grinders; over 5g is bad for single-dose workflows. Retention only matters if you change beans frequently or weigh in/out precisely.',
      },
    ],
  },

  // -- Pattern B: "for [niche use case]" ----------------------
  {
    slug: 'best-espresso-machine-for-office',
    title: 'Best Espresso Machines for Office Use',
    intro:
      'Office espresso has different priorities than home: high uptime, low maintenance, and multiple users with no training. The picks here favor super-automatics and forgiving semi-autos that any colleague can run without breaking.',
    description:
      'Espresso machines designed for shared office use — super-automatics and forgiving semi-autos with low training overhead.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'super-automatic') ||
        hasTag(p, 'office-friendly') ||
        bestForIncludes(p, 'office') ||
        bestForIncludes(p, 'shared')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Should an office buy a semi-auto or a super-auto?',
        a: 'Super-auto if untrained people will use it daily. Semi-auto only if one or two designated office baristas will own the workflow — otherwise pucks end up in sinks and the machine breaks.',
      },
      {
        q: 'How often does an office machine need descaling?',
        a: 'In hard-water cities, every 2-3 months for a heavy-use office. Super-autos usually prompt you; semi-autos require you to remember. A water softener or filtered tank water doubles the interval.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-one-person-home',
    title: 'Best Espresso Machines for One Person',
    intro:
      'A single-cup household has different needs than a multi-drink family kitchen. Smaller water tanks, faster warm-up, and lever or single-boiler designs all become more attractive — you do not need dual-boiler simultaneous milk and brew for one drink.',
    description:
      'Compact, fast-warmup espresso machines for one-person households — lever and single-boiler picks under various budgets.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'small-kitchen') ||
        hasTag(p, 'compact') ||
        hasTag(p, 'manual-lever') ||
        hasTag(p, 'portable') ||
        bestForIncludes(p, 'single-cup') ||
        bestForIncludes(p, 'small')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is a dual-boiler overkill for one person?',
        a: 'Yes, in most cases. Dual boilers shine when you steam milk for one drink while pulling shots for another — a one-person workflow rarely needs that. A single-boiler PID or thermojet covers single-cup duty for less money and less heat-up time.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-milk-drinks',
    title: 'Best Espresso Machines for Milk Drinks (Latte, Cappuccino, Flat White)',
    intro:
      'Milk drinks ask different things of a machine than straight espresso: steam power, simultaneous brew+steam, and either skill with the wand or assistance from auto-frothers. The picks here split into "learn the wand" and "let the machine do it" categories.',
    description:
      'Best espresso machines for latte, cappuccino, and flat white drinkers. Auto-froth and manual-wand picks across price tiers.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'milk-drinks') ||
        bestForIncludes(p, 'latte') ||
        bestForIncludes(p, 'cappuccino')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Single boiler or dual boiler for daily milk drinks?',
        a: 'For one or two milk drinks a day, a single boiler is fine — you just wait 30 seconds between brew and steam. For three-plus daily or back-to-back drinks for guests, dual boiler is meaningfully better.',
      },
      {
        q: 'Auto-frother vs manual steam wand — which produces better milk?',
        a: 'A skilled barista with a commercial wand wins. An auto-frother (Bambino Plus, Oracle) beats an unskilled user with a manual wand. Pick by your willingness to practice, not by spec sheet.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-light-roasts',
    title: 'Best Espresso Machines for Light Roasts',
    intro:
      'Light roasts need higher brew temperatures and more pressure control to extract properly. Stock thermoblock machines often underextract them, producing sour cups. The picks here all have PID temperature stability and either preinfusion or programmable profiles.',
    description:
      'Espresso machines that handle light-roast single-origin coffee — PID stability and preinfusion picks across price tiers.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      boolFeature(p, 'pid') &&
      (boolFeature(p, 'preinfusion') || strFeature(p, 'preinfusion') !== undefined),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Why are light roasts harder to pull?',
        a: 'Light roasts are denser and less soluble — they need higher temperatures (95-96C+), longer contact time, and often longer preinfusion to extract cleanly. Cheaper machines hold temperature less precisely, so the brew temp drifts down and you underextract.',
      },
      {
        q: 'Does a flow-control mod help with light roasts?',
        a: 'Yes — long, low-pressure preinfusion (10-30 seconds at 3-4 bar) wets the puck evenly before the main pull, which dramatically reduces channeling and underextraction on light roasts. Many Gaggia and E61 owners add aftermarket flow control specifically for this.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-travel',
    title: 'Best Espresso Machines for Travel',
    intro:
      'Travel espresso has one absolute requirement — it has to work without a wall outlet, or fit in checked luggage, or both. The picks here cover the rare segment of machines that produce real espresso in a campsite, a hotel room, or a van: manual levers, no electricity required.',
    description:
      'Best portable and travel espresso machines — manual lever and no-electricity picks that pull real espresso anywhere.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'travel') ||
        hasTag(p, 'portable') ||
        hasTag(p, 'no-electricity') ||
        boolFeature(p, 'manual_lever') ||
        boolFeature(p, 'travel_case')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Can a manual lever produce hotel-room espresso?',
        a: 'Yes — heat water in the room kettle, transfer to the lever group, pull the shot. The Flair Classic and Cafelat Robot both do this routinely. The hardest part is grinding fresh beans, so most travelers pair a lever with a hand grinder like the Comandante or 1Zpresso.',
      },
      {
        q: 'Are there any electric espresso machines small enough for travel?',
        a: 'The Wacaco Picopresso and Nanopresso are designed for it, but they trade off shot quality and capacity. For real espresso on the road, manual lever machines remain the standard.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-apartments',
    title: 'Best Espresso Machines for Apartments',
    intro:
      'Apartment espresso has three constraints rarely listed on spec sheets: noise (neighbors), counter space (small), and water (often hard, often tank-only). The picks here keep all three in mind — narrow footprints, quiet pumps, and tank-friendly designs.',
    description:
      'Compact, quiet espresso machines for apartment kitchens — slim footprints, fast warm-up, tank-fed designs.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'small-kitchen') ||
        hasTag(p, 'compact') ||
        hasTag(p, 'narrow-footprint') ||
        hasTag(p, 'manual-lever') ||
        hasTag(p, 'portable')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'How loud are espresso machines?',
        a: 'The pump is the loudest part — typically 60-75 dB for 20-30 seconds per shot. The grinder is usually louder. For apartments with thin walls, hand grinders and lever machines (Flair, Cafelat Robot) are nearly silent.',
      },
    ],
  },

  // -- Pattern C: "[accessory] for [brand specific model]" ----
  {
    slug: 'best-grinder-for-breville-bambino',
    title: 'Best Grinders for the Breville Bambino (and Bambino Plus)',
    intro:
      'The Bambino series only performs at its full potential when paired with a real burr grinder — the stock pressurized basket masks bad grind, but the non-pressurized basket needs a real grinder behind it. The picks here range from $80 hand grinders to $700 flat-burr electrics.',
    description:
      'Best burr grinders to pair with the Breville Bambino and Bambino Plus — espresso-capable options across all budgets.',
    filter: (p) =>
      p.type === 'grinder' &&
      (bestForIncludes(p, 'espresso') || hasTag(p, 'espresso') || hasTag(p, 'espresso-capable')) &&
      p.price <= 800,
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'What is the minimum grinder budget for a Bambino?',
        a: 'For the non-pressurized basket, around $150 will get you a Timemore C2 + practice, or a Baratza Encore ESP if you want electric. Below that, stay with the stock pressurized basket — the grinder will be the bottleneck.',
      },
      {
        q: 'Is the Baratza Encore ESP good enough for a Bambino?',
        a: 'Yes — it is the sweet-spot pick. The ESP variant gives you dedicated espresso steps that the standard Encore lacks. Above the Encore ESP, returns diminish until you spend $500+ for a Specialita or Niche.',
      },
    ],
  },
  {
    slug: 'best-grinder-for-gaggia-classic-pro',
    title: 'Best Grinders for the Gaggia Classic Pro',
    intro:
      'The Gaggia Classic Pro asks more of a grinder than a Bambino does — the 58mm commercial portafilter and non-pressurized stock baskets reward grind quality directly. Most owners pair the Gaggia with a grinder that costs as much as or more than the machine itself.',
    description:
      'Best burr grinders to pair with the Gaggia Classic Pro — from Baratza Encore ESP to Niche Zero, ranked by espresso consistency.',
    filter: (p) =>
      p.type === 'grinder' &&
      (bestForIncludes(p, 'espresso') || hasTag(p, 'espresso')) &&
      p.price >= 150 &&
      p.price <= 900,
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'What is the minimum grinder for a Gaggia Classic?',
        a: 'Realistically, a Baratza Encore ESP at $200. Below that, the Gaggia\'s manual workflow makes dialing painful — you spend more time grinding-by-trial than enjoying espresso. The Eureka Mignon Specialita at $700 is the typical ceiling for a stock Classic.',
      },
      {
        q: 'Is a hand grinder viable for a Gaggia Classic?',
        a: 'Yes — a 1Zpresso JX-Pro or Comandante C40 dials espresso for a Gaggia and produces excellent shots. The trade-off is 60+ seconds of grinding effort per shot, which annoys some users and is fine for others.',
      },
    ],
  },
  {
    slug: 'best-tamper-for-gaggia-classic',
    title: 'Best Tampers for the Gaggia Classic Pro',
    intro:
      'The Gaggia Classic ships with a plastic 58mm tamper that introduces variability into every shot. A calibrated or spring-loaded tamper sized to the Gaggia\'s commercial 58mm basket is one of the cheapest upgrades that visibly improves shot quality.',
    description:
      'Best 58mm tampers for the Gaggia Classic Pro — calibrated and spring-loaded picks for the commercial portafilter.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'tamper') || hasTag(p, 'espresso-tools')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is the stock Gaggia tamper actually a problem?',
        a: 'Yes — it is plastic, slightly undersized for the basket, and produces a tamp that varies by 5-10 pounds shot to shot. A $40-65 calibrated tamper eliminates that variable and is the cheapest upgrade with a noticeable cup-quality effect.',
      },
      {
        q: 'What size tamper does a Gaggia Classic need?',
        a: '58mm — specifically 58.35-58.5mm to leave a small clearance against the basket wall. A spring-loaded 58.5mm tamper (Normcore, etc.) is the easiest way to remove tamping variation as a beginner.',
      },
    ],
  },
  {
    slug: 'best-scale-for-espresso-shots',
    title: 'Best Scales for Espresso Shots',
    intro:
      'Espresso scales need three things kitchen scales lack: 0.1g resolution, fast response (under 200ms), and a footprint small enough to fit on the drip tray. The picks here range from $30 lab scales to $220 Acaia options.',
    description:
      'Best scales for weighing espresso shots in real time — 0.1g resolution, fast-response picks for home baristas.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'scale') ||
        hasTag(p, 'brewing-tools') ||
        bestForIncludes(p, 'espresso shots')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Do I need a scale that resolves to 0.1g for espresso?',
        a: 'For dialing in a recipe, yes — a 1g resolution scale will round 18.4g to 18g and you lose precision on a 1:2 ratio. Most users move to 0.1g once they start weighing out shots.',
      },
      {
        q: 'Is the Acaia Pearl worth the premium over a $30 scale?',
        a: 'For pure weighing, no. For app integration, recipe tracking, and shot-timer auto-start, yes. Most home baristas can live with a $30 scale; the Acaia earns its price for users who track every shot.',
      },
    ],
  },
  {
    slug: 'best-kettle-for-pour-over',
    title: 'Best Kettles for Pour-Over Coffee',
    intro:
      'A pour-over kettle does two things a regular kettle cannot: hold a controlled temperature, and pour in a slow controlled stream through a goose-neck spout. The picks below cover both budget gooseneck options and premium temperature-precise variants.',
    description:
      'Best gooseneck kettles for pour-over brewing — temperature-precise, hold-temp, and budget picks compared.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'kettle') ||
        hasTag(p, 'pour-over') ||
        hasTag(p, 'goose-neck') ||
        bestForIncludes(p, 'pour over')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Do I really need a gooseneck kettle for pour-over?',
        a: 'For Hario V60 or Chemex, yes — pouring from a regular kettle produces a heavy stream that channels and underextracts. For Kalita Wave with the flat bottom and three holes, a gooseneck helps but is more forgiving.',
      },
      {
        q: 'What water temperature is right for pour-over?',
        a: '93-96C (200-205F) is the standard range. Light roasts pull better at 95-96C; darker roasts pull cleaner at 92-94C to avoid bitterness. A variable-temperature kettle lets you tune by roast.',
      },
    ],
  },

  // -- Pattern D: combined feature + audience -----------------
  {
    slug: 'best-espresso-machine-for-beginners-under-500',
    title: 'Best Espresso Machines for Beginners Under $500',
    intro:
      'Combining "beginner-friendly" with "under $500" narrows the field — most truly forgiving machines cost more, and most sub-$500 machines demand more skill. The picks here are the few that hit both targets.',
    description:
      'Beginner-friendly espresso machines under $500 — PID-equipped, simple workflows, auto-frothing or assisted options.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      p.price < 500 &&
      (hasTag(p, 'beginner-friendly') ||
        hasTag(p, 'entry-level') ||
        hasTag(p, 'starter-machine') ||
        hasTag(p, 'super-automatic')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is a Bambino Plus or a Casabrews a better first machine?',
        a: 'Bambino Plus if you can stretch to $500 — PID, real preinfusion, and Thermojet warm-up matter. Casabrews at $140 is a real machine for the price but ceiling is much lower; treat it as a 1-2 year stepping stone.',
      },
    ],
  },
  {
    slug: 'best-grinder-for-pour-over-under-300',
    title: 'Best Grinders for Pour-Over Under $300',
    intro:
      'Pour-over is more forgiving than espresso about grinder consistency, but particle distribution still matters — uneven grinds produce flat or muddy cups. Under $300, the picks split between budget electric and premium hand grinders.',
    description:
      'Best burr grinders for pour-over coffee under $300 — Wilfa Svart, Baratza Encore, and premium hand grinders compared.',
    filter: (p) =>
      p.type === 'grinder' &&
      p.price < 300 &&
      (bestForIncludes(p, 'pour over') || hasTag(p, 'filter-coffee') || hasTag(p, 'pour-over')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Hand grinder or electric grinder for pour-over under $300?',
        a: 'A $300 hand grinder (Comandante C40) produces a more even pour-over grind than a $300 electric. The trade-off is 60 seconds of effort per brew. For households doing one daily cup, hand wins; for batch brewing, electric.',
      },
    ],
  },
  {
    slug: 'best-espresso-machine-for-latte-art-under-1000',
    title: 'Best Espresso Machines for Latte Art Under $1,000',
    intro:
      'Latte art requires three things from a machine: dry, high-pressure steam (4+ bar), a wand you can position freely, and consistent shot quality so you can repeat your milk practice on the same espresso each time. The picks here check all three boxes under $1,000.',
    description:
      'Espresso machines under $1,000 that produce real microfoam for latte art — manual wand picks compared.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      p.price < 1000 &&
      (boolFeature(p, 'commercial_steam_wand') ||
        boolFeature(p, 'manual_steam_wand') ||
        hasTag(p, 'milk-drinks') ||
        hasTag(p, '58mm-standard') ||
        hasTag(p, 'commercial-portafilter') ||
        hasTag(p, 'all-in-one')) &&
      !hasTag(p, 'super-automatic'),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Can the Breville Bambino Plus do real latte art?',
        a: 'The auto-froth wand produces good microfoam but does not let you guide texture during steaming. For competition-grade rosetta and tulip pours, manual wand machines (Gaggia, Rancilio, Lelit) are the standard. For home heart-and-tulip, the Bambino Plus is acceptable.',
      },
    ],
  },
  {
    slug: 'best-prosumer-espresso-machine-under-2000',
    title: 'Best Prosumer Espresso Machines Under $2,000',
    intro:
      '"Prosumer" in espresso means commercial-style hardware in a home-sized package: E61 group heads or saturated groups, PID temperature control, and serviceable internals. Under $2,000 covers the entry tier — real prosumer machines, just not the dual-boiler kings.',
    description:
      'Prosumer espresso machines under $2,000 — E61 single-boilers, dual-boilers, and heat exchanger picks compared.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      p.price < 2000 &&
      (hasTag(p, 'prosumer') ||
        hasTag(p, 'prosumer-entry') ||
        hasTag(p, 'e61')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is a $2,000 prosumer machine really better than a $700 Breville?',
        a: 'For pure cup quality, the gap is small once both have a good grinder. The prosumer wins on build longevity (15-25 years vs 5-8), repairability, and the satisfaction of brass + steel hardware. Buy prosumer if you keep gear long-term, not for short-term cup gains.',
      },
    ],
  },

  // -- Pattern E: sub-type / architecture ---------------------
  {
    slug: 'best-manual-lever-espresso-machine',
    title: 'Best Manual Lever Espresso Machines',
    intro:
      'Manual lever espresso machines trade convenience for control. No pump, no boiler, no electronics — just you, lever pressure, and hot water. The picks here range from the $120 entry Flair Classic to the $700 Flair 58 with full 58mm portafilter compatibility.',
    description:
      'Best manual lever espresso machines for home — Flair Classic, Cafelat Robot, and Flair 58 compared for travel, off-grid, and portafilter compatibility.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'manual-lever') ||
        boolFeature(p, 'manual_lever') ||
        hasTag(p, 'no-electricity')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Can a manual lever match a $1,500 prosumer machine?',
        a: 'For straight espresso quality, surprisingly yes — the Flair 58 and Cafelat Robot pull shots that compete with prosumer machines at twice their price. The compromise is milk: no steam wand, so latte drinkers need a separate frother.',
      },
      {
        q: 'How long does it take to learn a lever?',
        a: 'Around 2-4 weeks of daily practice to pull consistent shots. The reward is total control over pressure profiling — a feature that costs $1,000+ in semi-automatic flow-control mods.',
      },
    ],
  },
  {
    slug: 'best-dual-boiler-espresso-machine',
    title: 'Best Dual Boiler Espresso Machines',
    intro:
      'Dual boilers split brewing and steaming into separate circuits, so you can pull a shot and steam milk simultaneously — the prosumer baseline for households making more than one milk drink. The picks here span $1,400 to $5,900, all with real dual-boiler architecture.',
    description:
      'Best dual-boiler espresso machines — Breville Dual Boiler, Profitec Pro 300, Rancilio Silvia Pro X, and La Marzocco Linea Mini compared.',
    filter: (p) =>
      p.type === 'espresso-machine' &&
      (hasTag(p, 'dual-boiler') ||
        (strFeature(p, 'boiler_type')?.toLowerCase().includes('dual') ?? false)),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'When is dual boiler worth the premium over single boiler?',
        a: 'When you regularly pull two or more milk drinks in sequence (for guests, for a household), dual boiler removes the wait. For one drink at a time, a single-boiler PID is functionally equivalent and saves $600-1,500.',
      },
    ],
  },
  {
    slug: 'best-single-dose-grinder',
    title: 'Best Single-Dose Coffee Grinders',
    intro:
      'Single-dose grinders are designed for users who switch beans frequently — light roast in the morning, dark in the afternoon, decaf at night. They retain near-zero grounds between doses, so each bean change starts clean. The picks here range $200 to $800.',
    introHtml:
      '<a href="/glossary/#single-dosing">Single-dose grinders</a> are designed for users who switch beans frequently — <a href="/glossary/#light-roast">light roast</a> in the morning, <a href="/glossary/#dark-roast">dark</a> in the afternoon, decaf at night. They have near-zero <a href="/glossary/#retention">retention</a> between doses, so each bean change starts clean. The picks here range $200 to $800.',
    description:
      'Best single-dose grinders — Fellow Opus, Fellow Ode Gen 2, DF64, and Niche Zero compared for low-retention espresso and filter workflows.',
    filter: (p) =>
      p.type === 'grinder' &&
      (boolFeature(p, 'single_dose') || hasTag(p, 'single-dose')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is single-dose better than hopper-fed?',
        a: 'For multi-bean households and freshness purists, yes. For one-bean-at-a-time daily drivers, hopper-fed is faster and often produces more consistent dosing because the burrs stay warm and the chamber stays loaded.',
      },
    ],
  },
  {
    slug: 'best-flat-burr-grinder',
    title: 'Best Flat Burr Coffee Grinders',
    intro:
      'Flat burr grinders produce a different particle distribution than conicals — bimodal at fine settings, generally regarded as cleaner and more separated in the cup. The picks here range from the $345 Fellow Ode Gen 2 (filter-focused) to the $900 Mahlkonig X54 (espresso + filter).',
    description:
      'Best flat-burr coffee grinders — Fellow Ode Gen 2, DF64, Eureka Specialita, and Mahlkonig X54 compared.',
    filter: (p) =>
      p.type === 'grinder' &&
      ((strFeature(p, 'burr_type')?.toLowerCase().includes('flat') ?? false) || hasTag(p, 'flat-burr')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Flat burr or conical burr for espresso?',
        a: 'Subjective — flat burrs are often described as "cleaner" and "more separated" in the cup; conicals as "heavier-bodied" and "more chocolatey." Both pull excellent espresso. Pick by retention, footprint, and budget more than by burr geometry alone.',
      },
    ],
  },

  // ============================================================
  // Batch 3a — accessory-leveraging long-tails
  // Targets KGR gold patterns surfaced in agent batch 2 review:
  // knock boxes, WDT, descalers, 54mm tampers, milk pitchers,
  // and accessory bundle queries.
  // ============================================================
  {
    slug: 'best-knock-box-for-breville-bambino',
    title: 'Best Knock Boxes for the Breville Bambino',
    intro:
      'The Bambino and Bambino Plus pull pucks at the rate of a daily-driver home machine — a knock box should be low enough to slide under the drip tray and small enough to live next to a compact machine. The picks here all fit under 5 inches tall, leaving the Bambino\'s narrow footprint intact.',
    description:
      'Best knock boxes for the Breville Bambino and Bambino Plus — low-profile picks that fit compact kitchens.',
    filter: (p) =>
      p.type === 'accessory' &&
      hasTag(p, 'knock-box') &&
      (hasTag(p, 'small-kitchen') ||
        hasTag(p, 'compact') ||
        bestForIncludes(p, 'breville bambino') ||
        (numFeature(p, 'height_in') !== undefined && (numFeature(p, 'height_in') as number) <= 5)),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'What knock box height fits under the Bambino drip tray?',
        a: 'Under 5 inches. The Bambino sits about 5.5 inches off most counters at the spout-clearance gap, so a 4-4.5 inch box slides under without removing the tray. The Rattleware Short and Joe Frex Mini both fit; the Espro Toroid does not.',
      },
      {
        q: 'How often do I need to empty the knock box?',
        a: 'For a single-cup-a-day Bambino household, every 5-7 days. For two drinks a day, every 3-4 days. A 10-12 puck box matches the single-cup cadence; a 20-25 puck box adds a week of buffer if you do not want to think about it.',
      },
      {
        q: 'Is a knock box worth it over knocking pucks straight into the trash?',
        a: 'Yes — pucks are wet, heavy, and stain trash bag interiors. A real knock box also gives a firm impact target so you can dislodge a stubborn puck without bending the basket. At $24-65, the upgrade pays for itself in a couple of months of avoided mess.',
      },
    ],
  },
  {
    slug: 'best-knock-box-for-gaggia-classic',
    title: 'Best Knock Boxes for the Gaggia Classic Pro',
    intro:
      'The Gaggia Classic uses a commercial 58mm portafilter that delivers a heavier puck and a harder knock than a Breville Bambino. A knock box for the Gaggia should be stable under hard impact and tall enough to absorb the wider puck shape without splashing grounds onto the counter.',
    description:
      'Best knock boxes for the Gaggia Classic Pro and Evo Pro — stable, capacity-friendly picks for 58mm portafilter pucks.',
    filter: (p) =>
      p.type === 'accessory' &&
      hasTag(p, 'knock-box') &&
      p.price >= 25,
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Why does knock box stability matter more for a Gaggia than a Bambino?',
        a: 'The Gaggia\'s 58mm portafilter weighs about 600g loaded and produces a harder knock than the Bambino\'s 54mm. A light or plastic knock box rocks under that impact; a stainless steel or weighted-silicone design stays put.',
      },
      {
        q: 'What capacity makes sense for a Gaggia household?',
        a: 'Most Gaggia owners pull 1-3 shots a day. A 20-25 puck capacity (Espro Toroid, Cafelat Knock Tube) buys a full week between empties. A 12-puck (Rattleware Short) needs emptying every 3-4 days for a multi-drink household.',
      },
      {
        q: 'Does the knock box need to match the machine aesthetic?',
        a: 'Not functionally, but the Gaggia\'s polished stainless body pairs visually with a stainless knock box (Rattleware, Espro). The black Cafelat Knock Tube reads as a deliberate contrast. The Joe Frex Mini\'s plastic body looks budget next to the Gaggia\'s build — fine if you do not care about counter aesthetics.',
      },
    ],
  },
  {
    slug: 'best-milk-pitcher-for-latte-art',
    title: 'Best Milk Pitchers for Latte Art',
    intro:
      'Latte art pitchers earn their place by spout geometry, not capacity. The standard recommendation for a single drink is a 12oz pitcher with a sharp competition-cut spout. For two-drink batches, a 20oz pitcher with a slightly wider but still tapered spout is the right tool.',
    description:
      'Best milk pitchers for latte art — 12oz and 20oz competition-spout picks for rosetta, tulip, and heart pours.',
    filter: (p) =>
      p.type === 'accessory' &&
      hasTag(p, 'milk-pitcher') &&
      (hasTag(p, 'latte-art') ||
        bestForIncludes(p, 'latte art') ||
        bestForIncludes(p, 'latte') ||
        bestForIncludes(p, 'cappuccino')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'What size pitcher do I need for latte art?',
        a: '12oz for a single 6-8oz drink — fill to just below the spout base. 20oz for two drinks or one 12oz drink. The pitcher should be roughly double the final drink volume so the milk has room to texture without overflowing.',
      },
      {
        q: 'Does the pitcher material affect latte art?',
        a: 'Stainless steel is the standard. Copper-lined and ceramic pitchers exist but offer no functional advantage and complicate steaming. Any single-walled polished stainless pitcher in the 12-20oz range will pour fine latte art with a sharp spout.',
      },
      {
        q: 'Is a thermometer mount hole useful?',
        a: 'For the first 1-3 months of microfoam practice, yes — it lets you hit 60-65C without hand-feel experience. After that, most baristas remove the thermometer and learn temperature by touch on the pitcher exterior. The Bellman 20oz includes a hole; the Rattleware 12oz and Joe Frex 20oz do not.',
      },
    ],
  },
  {
    slug: 'best-milk-pitcher-for-breville-bambino',
    title: 'Best Milk Pitchers for the Breville Bambino',
    intro:
      'The Bambino Plus auto-frother and the Bambino\'s manual wand both work best with a 12oz pitcher. The machine is sized for single drinks; the steam wand is short; the wand tip prefers a pitcher base around 3-3.5 inches in diameter. A 20oz pitcher technically works but wastes milk and is awkward to angle under the short wand.',
    description:
      'Best milk pitchers for the Breville Bambino and Bambino Plus — 12oz picks sized for the short steam wand.',
    filter: (p) =>
      p.type === 'accessory' &&
      hasTag(p, 'milk-pitcher') &&
      (numFeature(p, 'capacity_oz') !== undefined && (numFeature(p, 'capacity_oz') as number) <= 14 ||
        hasTag(p, 'small') ||
        bestForIncludes(p, 'breville bambino')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Will a 20oz pitcher work on the Bambino?',
        a: 'Yes, but the steam wand is short and you will need to tilt the pitcher more than feels comfortable. For two-drink households making milk drinks back to back, a 20oz pitcher is workable; for single drinks, the 12oz is the right size.',
      },
      {
        q: 'Does the Bambino Plus auto-frother prefer a specific pitcher?',
        a: 'The auto-frother probe needs the pitcher base to sit on the drip tray and the probe to reach the milk. A 12oz Rattleware-class pitcher fits the geometry; non-standard tall or narrow pitchers may prevent the probe from reading correctly.',
      },
    ],
  },
  {
    slug: 'best-wdt-tool-for-espresso',
    title: 'Best WDT Tools for Espresso (Weiss Distribution Technique)',
    intro:
      'WDT (Weiss Distribution Technique) tools fix the most common cause of channeling in home espresso: clumps of fresh-ground coffee that fall unevenly into the basket. A WDT tool stirs the dose with thin needles to break up clumps before tamping — a 10-second step that visibly improves shot quality on most home grinders.',
    description:
      'Best WDT tools for home espresso — Normcore, Bplus, and KafaTek-class picks for puck preparation and channeling reduction.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'wdt') || hasTag(p, 'distribution-tool')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Do I really need a WDT tool, or is a paperclip fine?',
        a: 'A bent paperclip works as a free WDT solution and many home baristas use one for years. A dedicated tool produces more even distribution because the needles are thinner (0.35-0.4mm vs the paperclip\'s ~1mm) and there are multiple needles spaced in a circle. The cup-quality gap is small but real.',
      },
      {
        q: 'What needle gauge should I look for?',
        a: '0.4mm is the consensus for budget tools (Normcore); 0.35mm is the premium gauge (Bplus, KafaTek). Finer needles leave less impression in the bed and produce slightly better distribution, but they bend more easily if dropped. For most users, 0.4mm is the right balance of effectiveness and durability.',
      },
      {
        q: 'Does WDT matter on a hopper-fed grinder?',
        a: 'Less than on a single-dose grinder, but still some. Hopper-fed grinders (Eureka Specialita, Mahlkonig X54) produce fewer clumps than single-dose flat-burrs (DF64, Niche), but light roasts and aged beans still benefit from a quick stir. For dark roasts on a quality hopper-fed grinder, WDT is optional.',
      },
      {
        q: 'When does WDT become unnecessary?',
        a: 'Almost never for espresso. The very high-end grinders (EK43, Mythos) produce distributions clean enough that WDT adds little; below that tier (everything in a home kitchen), WDT remains the highest-ROI ten seconds you can add to your shot prep.',
      },
    ],
  },
  {
    slug: 'best-descaler-for-breville-espresso-machines',
    title: 'Best Descalers and Cleaners for Breville Espresso Machines',
    intro:
      'Breville espresso machines need two different maintenance products on different schedules: a backflush cleaner (weekly, for coffee oils) and a descaler (every 3-6 months, for limescale in the thermojet or boiler). The picks here cover both categories — Cafiza for cleaning, plus the descaler chemistry Breville officially supports.',
    description:
      'Best cleaning and descaling products for Breville Bambino, Barista Express, Barista Pro, and Dual Boiler — Cafiza and descaler picks.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'cleaning') ||
        hasTag(p, 'descaler') ||
        hasTag(p, 'backflush') ||
        hasTag(p, 'maintenance')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is Cafiza a descaler?',
        a: 'No — Cafiza is an alkaline cleaner that removes coffee oils from the group head and brew path. Descalers are acidic (citric or lactic) and remove limescale from the boiler. Most machines need both, on different schedules. Mixing them up is the most common maintenance mistake.',
      },
      {
        q: 'How often should I descale a Breville?',
        a: 'Every 3 months in hard-water cities, every 6 months in soft-water areas. Most Brevilles prompt you with a "CLEAN ME" or descale icon when the cycle count says you are due. Using filtered tank water doubles the interval; ignoring the prompt eventually clogs the thermojet permanently.',
      },
      {
        q: 'Can I use any descaler on a Breville?',
        a: 'Breville recommends their proprietary descaler, but third-party citric or lactic acid descalers work fine and cost a third of the price. Avoid vinegar — too acidic, leaves a smell, and can damage rubber gaskets.',
      },
      {
        q: 'Does the Bambino need backflushing?',
        a: 'The Bambino does not have a three-way solenoid, so traditional backflushing with a blind basket is not possible. Instead, run plain water cycles regularly and descale on schedule. The Barista Express and Dual Boiler do have the solenoid and benefit from Cafiza weekly.',
      },
    ],
  },
  {
    slug: 'best-54mm-tamper-for-breville-bambino',
    title: 'Best 54mm Tampers for the Breville Bambino',
    intro:
      'Breville uses a proprietary 54mm basket across the entire current lineup — Bambino, Bambino Plus, Barista Express, Barista Pro, Touch Impress. The stock plastic tamper is undersized and inconsistent; a real 54mm calibrated tamper is one of the cheapest upgrades with a directly visible effect on shot quality.',
    description:
      'Best 54mm tampers for the Breville Bambino and Barista series — calibrated, spring-loaded picks that fit Breville\'s proprietary basket.',
    filter: (p) =>
      p.type === 'accessory' &&
      hasTag(p, 'tamper') &&
      (hasTag(p, '54mm') ||
        hasTag(p, 'breville-compatible') ||
        (numFeature(p, 'diameter_mm') !== undefined && (numFeature(p, 'diameter_mm') as number) < 56)),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Why does Breville use 54mm instead of the commercial 58mm?',
        a: 'Breville designed the Bambino lineup around a smaller-footprint group head, which made 54mm the natural basket size for the platform. The downside is a smaller aftermarket — 58mm has every imaginable accessory, 54mm has fewer choices and slightly higher per-item pricing.',
      },
      {
        q: 'Will a 58mm tamper work on a Bambino?',
        a: 'No — a 58mm tamper is physically too large for the 54mm basket and will not seat against the coffee bed properly. You need a 54mm tamper for any Breville machine in the current Bambino, Barista, or Infuser lineup.',
      },
      {
        q: 'Is a spring-loaded tamper better than a flat tamper for beginners?',
        a: 'Yes, almost universally. A spring-loaded tamper applies a calibrated 30-lb pressure every shot regardless of how hard you push; a flat tamper depends on user technique. For the first 6-12 months of Bambino ownership, a Normcore 54mm spring-loaded tamper eliminates one of the biggest sources of shot variation.',
      },
    ],
  },
  {
    slug: 'best-espresso-accessories-under-100',
    title: 'Best Espresso Accessories Under $100',
    intro:
      'A first-year home espresso setup benefits from a small set of accessories more than from any single upgrade: a real tamper, a knock box, a milk pitcher, and a WDT tool. The picks here are all under $100 individually and collectively cover the workflow gaps that ship with most starter machines.',
    description:
      'Best espresso accessories under $100 — tampers, knock boxes, milk pitchers, WDT tools, and cleaning products for home espresso.',
    filter: (p) =>
      p.type === 'accessory' &&
      p.price < 100 &&
      (hasTag(p, 'tamper') ||
        hasTag(p, 'knock-box') ||
        hasTag(p, 'milk-pitcher') ||
        hasTag(p, 'wdt') ||
        hasTag(p, 'puck-screen') ||
        hasTag(p, 'cleaning') ||
        hasTag(p, 'thermometer') ||
        hasTag(p, 'espresso-tools')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'What accessories should I buy first with a new espresso machine?',
        a: 'In order of impact: (1) a real tamper sized to your basket, (2) a knock box, (3) a milk pitcher if you do milk drinks, (4) a WDT tool, (5) cleaning supplies. The tamper and WDT have the largest cup-quality effect; the knock box has the largest workflow effect.',
      },
      {
        q: 'Can I skip the stock tamper that came with my machine?',
        a: 'Almost always yes. Stock tampers from Breville, Gaggia, De\'Longhi, and most starter machines are plastic, undersized, and inconsistent. A $40-65 calibrated tamper is the single cheapest upgrade with a visible effect on shot quality.',
      },
      {
        q: 'Do I need a puck screen?',
        a: 'Not for first-year setups. A puck screen helps reduce channeling on light roasts and keeps the shower screen cleaner, but the effect is small (5-10% extraction improvement at best). Spend the $19 on a better grinder budget first; add a puck screen later if channeling persists.',
      },
    ],
  },

  // ============================================================
  // Batch 4 — pour-over / AeroPress funnel close
  // Cierra el loop top-of-funnel (recipes Hoffmann/Kasuya en /how-to/)
  // hacia commercial intent. Cada pick honesto sobre precio/valor;
  // catálogo chico en algunas categorías → framing explícito.
  // ============================================================
  {
    slug: 'best-gooseneck-kettle-v60-pour-over',
    title: 'Best Gooseneck Kettle for V60 Pour Over',
    intro:
      'A gooseneck kettle is the single piece of pour-over gear that most directly affects cup quality: pour control determines bed agitation, which determines extraction. Our catalog currently covers one option in this category — the Fellow Stagg EKG, the de-facto standard in specialty coffee. Below we explain when gooseneck matters, when it does not, and what to look for in entry-level alternatives we do not currently link.',
    introHtml:
      'A gooseneck kettle is the single piece of pour-over gear that most directly affects cup quality: pour control determines bed agitation, which determines <a href="/glossary/#extraction">extraction</a>. Our catalog currently covers one option in this category — the <a href="/products/B0BVYGZG6T/">Fellow Stagg EKG</a>, the de-facto standard in specialty coffee. If you already have your kettle and are looking for technique, our <a href="/how-to/james-hoffmann-v60-technique/">Hoffmann V60 recipe</a> and <a href="/how-to/tetsu-kasuya-4-6-v60-method/">Kasuya 4:6 method</a> walk through the pour structure step by step.',
    description:
      'Best gooseneck kettle for V60 pour over. Catalog pick: Fellow Stagg EKG. Plus when gooseneck matters, when it does not, and budget alternatives to consider.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'goose-neck') || hasTag(p, 'kettle')) &&
      bestForIncludes(p, 'pour over'),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Do I really need a gooseneck for V60?',
        a: 'For the Hoffmann pulse-pour method or any controlled pour technique, yes. The slow, vertical stream from a gooseneck is what lets you bloom evenly and pour spirals without disturbing the bed. A wide-spout kitchen kettle pours too fast and channels the bed within seconds.',
      },
      {
        q: 'When does gooseneck matter less?',
        a: 'For Kalita Wave (flat bottom, three flow-regulating holes), a regular kettle is acceptable — the brewer compensates for pour inaccuracy. For AeroPress, gooseneck is also not required (see our Hoffmann AeroPress recipe). The gooseneck premium pays off most for V60 and Chemex.',
      },
      {
        q: 'Is the Stagg EKG worth $195 over a $40 kettle?',
        a: 'Honestly, only partly. The OEM Hario Buono kettle at ~$25-30 produces a similar pour shape without the temperature control and hold-temp features. If you brew V60 daily, the Stagg\'s 1-degree temperature control earns its price for dialing in light roasts at 96°C and dark roasts at 92°C. If you brew weekends only, the Hario Buono + a thermometer covers the same job for a fifth of the cost.',
      },
      {
        q: 'Does temperature control matter as much as the gooseneck shape?',
        a: 'For one bean at a baseline 94-96°C, no — just-off-boil water is fine and any kettle that holds heat reaches that. Temperature control matters when you rotate roasts: light Ethiopian at 96-99°C, washed Colombian at 94°C, dark Brazilian at 88-92°C. If you only ever brew medium roasts, a fixed-temperature gooseneck saves you $100-150.',
      },
      {
        q: 'What about non-electric stovetop gooseneck kettles?',
        a: 'Hario Buono (stovetop) and Kalita Wave kettle are the two most common. Both work well; the trade-off is no hold-temperature, so you have to brew right after the kettle boils. Cheap, durable, and entirely adequate for the daily V60.',
      },
    ],
  },
  {
    slug: 'best-scale-aeropress-v60-brewing',
    title: 'Best Scale for AeroPress and V60 Brewing',
    intro:
      'For AeroPress and V60 home brewing, a $30 brewing scale with 0.1g resolution and a built-in timer is the right tool — not a $200 Acaia. The Acaia Pearl S in our catalog is the specialty-coffee standard, but for pour-over and AeroPress at home it is honestly overpriced for what you get; Bluetooth app integration and 50ms response time earn their premium for espresso shots and recipe tracking, not for weighing 15g of coffee into a V60.',
    introHtml:
      'For AeroPress and V60 home brewing, a $30 brewing scale with 0.1g resolution and a built-in timer is the right tool — not a $200 Acaia. The <a href="/products/B0BC4FQDD1/">Acaia Pearl S</a> in our catalog is the specialty-coffee standard, but for pour-over and AeroPress at home it is honestly overpriced for what you get; Bluetooth app integration and 50ms response time earn their premium for espresso shots and recipe tracking, not for weighing 15g of coffee into a V60. If you already have your scale, jump to our <a href="/how-to/james-hoffmann-v60-technique/">Hoffmann V60 recipe</a> or <a href="/how-to/james-hoffmann-aeropress-recipe/">AeroPress recipe</a>.',
    description:
      'Best scale for AeroPress and V60 brewing — why a $30 scale beats the $200 Acaia for home pour-over, and what to look for in a budget brewing scale.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, 'scale') || hasTag(p, 'brewing-tools')) &&
      (bestForIncludes(p, 'pour over') || bestForIncludes(p, 'brewing')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Is the Acaia Pearl S worth it for AeroPress and V60?',
        a: 'Honestly, no — not for home brewing. A $30 Timemore or generic 0.1g brewing scale with a built-in timer covers 80% of the Pearl S\'s value for AeroPress and V60. The Acaia earns its $220 price for espresso shot weighing (50ms response, auto-start timer) and competition-level recipe tracking via app. For weighing 11g of coffee and 200g of water on the counter, you do not need any of that.',
      },
      {
        q: 'What features actually matter for a pour-over scale?',
        a: 'In order of importance: (1) 0.1g resolution (not 1g — you want to weigh 15g coffee precisely), (2) built-in timer (you need both weight and time visible at once), (3) waterproof or splash-resistant body, (4) 2kg+ capacity (enough to weigh the brewer + grounds + water). Bluetooth and apps are nice-to-haves, not requirements.',
      },
      {
        q: 'Will a kitchen scale work for AeroPress?',
        a: 'For Hoffmann\'s standard AeroPress recipe (11g coffee, 200g water), a 1g-resolution kitchen scale is acceptable — ±10g of water is barely perceptible at this dose. For Kasuya\'s championship recipe (22g coffee, 50g + 130g bypass), you really want 0.1g — the smaller pours need precision. Most home users land on a $25-40 brewing scale with timer and stop there.',
      },
      {
        q: 'Should I buy the Acaia anyway because I might do espresso later?',
        a: 'Defensible. The Pearl S handles every coffee weighing task in a home setup and the build is excellent. But the upgrade path is also fine: start with a $30 brewing scale, save $190, upgrade later if you actually buy an espresso machine and decide you need real-time shot tracking. Most pour-over-only households never need the Acaia.',
      },
      {
        q: 'What about scales without a timer?',
        a: 'Skippable for pour-over. The pour times in Hoffmann\'s and Kasuya\'s recipes are part of the method — you need to see weight and elapsed seconds at the same time. A separate phone timer works but is one more thing to glance at; an integrated timer scale saves attention.',
      },
    ],
  },
  {
    slug: 'best-paper-filters-v60-aeropress',
    title: 'Best Paper Filters for V60 and AeroPress',
    intro:
      'Paper filter choice matters less than most blog posts suggest. Genuine OEM filters (Hario tabbed V60, AeroPress original) are inexpensive, widely available, and produce the cup the brewer was designed for. Generic and "premium" alternatives change the cup at the margins — bleached vs natural, thickness, fold pattern — but no filter saves a bad brew, and no brew is ruined by a competent generic filter. This page covers when OEM is worth the premium, when generic is fine, and what to actually look for if you go off-brand.',
    introHtml:
      'Paper filter choice matters less than most blog posts suggest. Genuine OEM filters (Hario tabbed V60, AeroPress original) are inexpensive, widely available, and produce the cup the brewer was designed for. Generic and "premium" alternatives change the cup at the margins — bleached vs natural, thickness, fold pattern — but no filter saves a bad brew, and no brew is ruined by a competent generic filter. If you have your filters, see our <a href="/how-to/james-hoffmann-v60-technique/">Hoffmann V60 technique</a>, <a href="/how-to/james-hoffmann-aeropress-recipe/">Hoffmann AeroPress recipe</a>, or <a href="/how-to/aeropress-inverted-method/">inverted AeroPress method</a>.',
    description:
      'Best paper filters for V60 and AeroPress — when OEM filters matter, when generic is fine, and what to look for in non-OEM alternatives.',
    // Picks ordered cheapest-first: OEM Hario/AeroPress as defaults,
    // CAFEC Abaca+ as the optional light-roast upgrade.
    filter: (p) => p.type === 'accessory' && hasTag(p, 'paper-filters'),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'Should I always buy OEM Hario or OEM AeroPress filters?',
        a: 'For convenience and predictability, yes — they cost roughly $5-8 per 100 and are stocked at most specialty coffee retailers. Generic V60-compatible filters work fine; the main risk with off-brand is variable fit (some sit slightly off in the dripper, leaving a gap where water can bypass the bed). For AeroPress specifically, the OEM filters are so cheap that there is little reason to source generic.',
      },
      {
        q: 'Bleached or natural (unbleached) filters?',
        a: 'Bleached produce less paper taste with a brief rinse. Natural filters need a more thorough rinse (15-20 seconds of hot water) to remove the woody paper note, but are functionally equivalent once rinsed. The bleaching process modern brands use is chlorine-free — there is no health reason to prefer natural.',
      },
      {
        q: 'What about metal AeroPress filters?',
        a: 'They change the cup — let more fines and oils through, producing a heavier body closer to French press. Some users prefer this; most do not. Hoffmann\'s and Kasuya\'s competition recipes both use paper. If you brew daily and hate replacing filters, a metal filter works; for cup quality, paper is the default.',
      },
      {
        q: 'Do "premium" filters (Cafec, Sibarist) actually improve the cup?',
        a: 'Marginally, for V60. Cafec Abaca+ and Sibarist FAST are thinner and faster-draining than standard Hario, which lets light roasts extract more fully without over-developing the bed. For dark roasts or daily brewing, the difference is below most palates. They cost 3-4x standard Hario — worth trying once if you brew light single-origins frequently, skippable otherwise.',
      },
      {
        q: 'What should I look for in a non-OEM V60 filter?',
        a: 'Three things: (1) correct size (V60 02 takes 02-size filters, not 01), (2) cone shape that seats fully against the dripper walls without gaps, (3) fold seam that does not crack when wet. Avoid filters marketed as "universal" — they fit nothing well. Standard Hario tabbed 02 paper at ~$6 per 100 is the safe default.',
      },
      {
        q: 'How do I know if a filter is bypassing water?',
        a: 'During the bloom, water should saturate the bed evenly and pool slightly at the top. If you see fast-moving liquid running down the sides of the dripper without contacting grounds, the filter is not sealing — either wrong size or seated incorrectly. Re-seat after rinsing; the wet paper grips the dripper better than dry.',
      },
    ],
  },
  {
    slug: 'best-burr-grinder-aeropress-v60-under-200',
    title: 'Best Burr Grinder for AeroPress and V60 Under $200',
    intro:
      'For AeroPress and V60, a $80-200 burr grinder is the right investment — and it matters more than the brewer or the kettle. Both methods reveal grinder weaknesses directly: V60 because uneven particles produce uneven extraction across the bed, AeroPress because the immersion phase amplifies fines into muddy body. The picks here cover hand grinders (Timemore C2 to 1Zpresso JX-Pro) and one electric (Baratza Encore), all capable of consistent medium-fine grinds for filter coffee.',
    introHtml:
      'For AeroPress and V60, a $80-200 burr grinder is the right investment — and it matters more than the brewer or the kettle. Both methods reveal grinder weaknesses directly: V60 because uneven particles produce uneven <a href="/glossary/#extraction">extraction</a> across the bed, AeroPress because the immersion phase amplifies <a href="/glossary/#fines">fines</a> into muddy body. The picks here cover hand grinders (<a href="/products/B086DM2MS3/">Timemore C2</a> to <a href="/products/B07HF93NS6/">Comandante C40</a>) and one electric (<a href="/products/B007F183LK/">Baratza Encore</a>), all capable of consistent medium-fine grinds for filter coffee. If you have your grinder, see our <a href="/how-to/james-hoffmann-v60-technique/">Hoffmann V60</a> and <a href="/how-to/james-hoffmann-aeropress-recipe/">AeroPress</a> recipes.',
    description:
      'Best burr grinder for AeroPress and V60 under $200 — hand and electric picks for clean filter coffee, plus the honest gap between $80 and $200 grinders.',
    filter: (p) =>
      p.type === 'grinder' &&
      p.price < 200 &&
      (bestForIncludes(p, 'pour over') ||
        bestForIncludes(p, 'drip') ||
        bestForIncludes(p, 'french press') ||
        hasTag(p, 'filter-coffee') ||
        hasTag(p, 'pour-over')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'How much should I spend on a grinder for AeroPress and V60?',
        a: '$80 minimum (Timemore C2 hand grinder); $150-200 sweet spot (Baratza Encore electric or Comandante C40 hand). Below $80, you are in blade grinder or low-quality burr territory where particle distribution is inconsistent enough to flatten any pour-over recipe. Above $200, returns diminish for filter coffee — premium hand grinders (1Zpresso K-Pro) and electrics (Fellow Ode Gen 2) are nicer but not categorically better for AeroPress and V60.',
      },
      {
        q: 'Hand grinder or electric grinder?',
        a: 'Hand for single-cup households on a budget, for travel, and for quietest mornings. Electric (Baratza Encore at $170) for households brewing 2+ cups, for users who hate the 60-second grind effort, or who switch beans frequently. Both produce excellent filter coffee at this price tier.',
      },
      {
        q: 'Is the Baratza Encore good enough for V60?',
        a: 'Yes, for medium and dark roasts. For very light roasts that need a finer grind to extract fully, the Encore\'s fine end is acceptable but not exceptional — a Comandante or 1Zpresso JX-Pro produces a slightly more even fine grind. For 90% of home V60 brewing, the Encore is the right tool.',
      },
      {
        q: 'What grinder settings should I use for V60 and AeroPress?',
        a: 'V60 medium-fine: Encore setting 18-22, Comandante 22-26 clicks, Timemore C2 18-22 clicks. AeroPress medium-fine: Encore 12-15, Comandante 18-22 clicks, Timemore C2 16-18 clicks. Both methods sit in the same coarse-to-medium-fine window; the AeroPress takes slightly finer because the steep extracts more efficiently.',
      },
      {
        q: 'Will a $50 blade grinder work in a pinch?',
        a: 'Honestly, no. The particle distribution from a blade grinder is so uneven that pour-over extraction is incoherent — you get sour fragments mixed with bitter ones. AeroPress is more forgiving (the pressure phase masks some unevenness) but still produces a noticeably muddier cup than even a $80 burr grinder. Skip blade grinders.',
      },
    ],
  },
  {
    slug: 'best-essential-accessories-for-gaggia-classic',
    title: 'Essential Accessories for the Gaggia Classic Pro',
    intro:
      'The Gaggia Classic ships with a plastic tamper, a single-spout portafilter, no knock box, no milk pitcher, and no cleaning supplies. Out of the box it brews drinkable espresso; with $150-200 in accessories it brews specialty-cafe espresso. The picks here are the essentials.',
    description:
      'Essential accessories for the Gaggia Classic Pro — tamper, WDT, knock box, milk pitcher, puck screen, and Cafiza picks.',
    filter: (p) =>
      p.type === 'accessory' &&
      (hasTag(p, '58mm') ||
        hasTag(p, 'tamper') ||
        hasTag(p, 'knock-box') ||
        hasTag(p, 'milk-pitcher') ||
        hasTag(p, 'wdt') ||
        hasTag(p, 'puck-screen') ||
        hasTag(p, 'cleaning') ||
        bestForIncludes(p, 'gaggia classic')),
    sort: (a, b) => a.price - b.price,
    faqExtras: [
      {
        q: 'What is the minimum accessory budget for a Gaggia Classic?',
        a: 'Around $120 total: $65 tamper (Normcore 58.5mm spring-loaded), $25 knock box (Rattleware Short), $22 milk pitcher (Rattleware 12oz), $18 Cafiza for cleaning. The WDT tool ($32) and puck screen ($19) are the next-tier additions.',
      },
      {
        q: 'Do I need a 58mm bottomless portafilter for the Gaggia?',
        a: 'Not essential, but the most-recommended upgrade for users learning espresso. A bottomless portafilter exposes channeling and uneven extractions visually, which accelerates the learning curve. Most Gaggia owners add one within the first six months.',
      },
      {
        q: 'How important is the cleaning routine on a Gaggia Classic?',
        a: 'Critical for longevity. The Gaggia\'s three-way solenoid and aluminum boiler benefit from weekly Cafiza backflushing and quarterly descaling. Skipping maintenance is the #1 cause of premature Gaggia failure — the boiler scales, the solenoid sticks, the brew temperature drifts.',
      },
    ],
  },
];
