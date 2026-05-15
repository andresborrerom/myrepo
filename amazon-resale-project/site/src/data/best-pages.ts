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
    description:
      'Best burr grinders under $200 for espresso and filter coffee. Includes electric and hand grinders, ranked by particle distribution and value.',
    filter: (p) => p.type === 'grinder' && p.price < 200,
    sort: (a, b) => b.price - a.price,
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
