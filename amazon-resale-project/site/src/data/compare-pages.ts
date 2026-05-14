// Compare-page definitions. Same hoisting rationale as best-pages.ts:
// getStaticPaths is hoisted out of the .astro frontmatter, so module-level
// constants defined in the .astro file are not in scope.
//
// Schema is intentionally minimal (asinA / asinB / intro): the [slug].astro
// template builds the spec table from the products' own `features` records,
// so adding a new comparison only requires picking two ASINs that exist in
// src/content/products/ and writing a framing intro.

export interface ComparePage {
  slug: string;
  asinA: string;
  asinB: string;
  intro: string;
}

export const comparePages: ComparePage[] = [
  // ============================================================
  // Batch 1 — original
  // ============================================================
  {
    slug: 'breville-bambino-plus-vs-gaggia-classic-pro',
    asinA: 'B07VFZHRYC',
    asinB: 'B083TQR8BV',
    intro:
      'The Breville Bambino Plus and Gaggia Classic Pro are the two most-cross-shopped sub-$600 espresso machines. They represent opposite philosophies — one assists the user with PID and auto-milk; the other gives them a 58mm commercial portafilter and asks them to learn.',
  },
  {
    slug: 'breville-barista-express-vs-breville-barista-pro',
    asinA: 'B00CH9182U',
    asinB: 'B07QGCS2KW',
    intro:
      'The Barista Express and Barista Pro share a chassis size and basket diameter, but the Pro replaces the older thermocoil with a Thermojet and adds a color LCD. Worth the $200 premium?',
  },
  {
    slug: 'baratza-encore-esp-vs-baratza-sette-270',
    asinA: 'B0BDFTC76P',
    asinB: 'B01DPNTNAS',
    intro:
      'Both are Baratza espresso-capable grinders, but the Sette 270 doubles the price for genuinely different burr architecture and retention behavior. Where does the extra spend show up?',
  },
  {
    slug: 'niche-zero-vs-eureka-mignon-specialita',
    asinA: 'B08CXVZL8R',
    asinB: 'B07YDPC1MK',
    intro:
      'These are the two most-recommended grinders in the $700-800 zone for home espresso. One is single-dose conical; the other is hopper-fed flat-burr. Which one matches your workflow?',
  },
  {
    slug: 'aeropress-original-vs-hario-v60-02',
    asinA: 'B0047BIWSK',
    asinB: 'B000P4D5HG',
    intro:
      'The two most popular single-cup brewers in specialty coffee are not interchangeable. Aeropress is forgiving and travel-friendly; V60 is technique-dependent and rewards skill. Which fits your kitchen?',
  },
  {
    slug: 'flair-58-vs-cafelat-robot',
    asinA: 'B09NDWGYG2',
    asinB: 'B07RZD5VQB',
    intro:
      'Both are 58mm manual lever espresso makers, but the Flair 58 adds a heated group element and pre-infusion chamber that the Robot intentionally skips. The price gap is real — and so is the difference in workflow.',
  },

  // ============================================================
  // Batch 2 — head-to-head with use-case framing (KGR pattern B)
  // ============================================================
  {
    slug: 'breville-bambino-plus-vs-gaggia-classic-for-milk-drinks',
    asinA: 'B07VFZHRYC',
    asinB: 'B083TQR8BV',
    intro:
      'For daily latte and cappuccino drinkers, the choice between the Bambino Plus and Gaggia Classic Pro is really a choice between "assisted milk" and "real commercial wand." The Bambino auto-textures milk to a temperature and froth level you set; the Gaggia hands you a commercial-style wand and asks you to learn. This comparison frames both for milk-drink workflows specifically.',
  },
  {
    slug: 'rancilio-silvia-vs-gaggia-classic-for-beginners',
    asinA: 'B0BQYMTBNL',
    asinB: 'B083TQR8BV',
    intro:
      'Both the Rancilio Silvia V6 and Gaggia Classic Pro are entry-prosumer single-boilers with commercial 58mm portafilters, no factory PID, and a heavy upgrade community. For a beginner, the question is: pay double for Silvia\'s brass boiler and longer life, or start with the Gaggia and mod it as skills develop?',
  },
  {
    slug: 'breville-bambino-plus-vs-delonghi-magnifica-for-office',
    asinA: 'B07VFZHRYC',
    asinB: 'B07RB5K9TJ',
    intro:
      'For an office or shared kitchen where multiple people will use the machine, the relevant question is "how forgiving is it of untrained users." The Magnifica S is a full super-automatic — beans in, button pressed, espresso out. The Bambino Plus needs a grinder beside it and assumes the user knows what a portafilter is.',
  },
  {
    slug: 'lelit-anna-vs-gaggia-classic-evo-pro',
    asinA: 'B07GVHL5HN',
    asinB: 'B0B5BC5VXM',
    intro:
      'Both target the upper-entry zone of home espresso: under $750, single boiler, PID-or-PID-ready, real commercial portafilters. The Anna ships with factory PID and a 57mm group; the Evo Pro stays old-school with a 58mm commercial group and an aftermarket PID path. Which delivers better long-term value?',
  },
  {
    slug: 'fellow-opus-vs-baratza-encore-esp-for-bambino',
    asinA: 'B0BRMR5LWB',
    asinB: 'B0BDFTC76P',
    intro:
      'Two sub-$200 grinders that both claim to dial espresso, both commonly paired with a Breville Bambino. The Encore ESP keeps the long-running Encore chassis and adds espresso-range burrs; the Fellow Opus is a modern single-dose with anti-static. Which is the better match for the Bambino specifically?',
  },

  // ============================================================
  // Batch 3 — across-category and tier comparisons
  // (sub'd in for "three-way" — current template renders 2-way
  // pairwise; multiple pairwise pages on the same triangle let
  // us cover the same SERP intent without changing the template)
  // ============================================================
  {
    slug: 'breville-bambino-plus-vs-cafelat-robot',
    asinA: 'B07VFZHRYC',
    asinB: 'B07RZD5VQB',
    intro:
      'Both land at roughly $450-500 and both pull credible espresso — but they live in completely different worlds. The Bambino Plus is an electric semi-automatic with auto-milk and PID; the Cafelat Robot is a manual lever with no electronics. This comparison frames the trade-off for buyers cross-shopping the two.',
  },
  {
    slug: 'gaggia-classic-pro-vs-cafelat-robot',
    asinA: 'B083TQR8BV',
    asinB: 'B07RZD5VQB',
    intro:
      'The Gaggia Classic Pro and Cafelat Robot are the two most-recommended sub-$500 ways into "real" 58mm espresso. The Gaggia is a pumped semi-auto with a steam wand; the Robot is a manual lever with no steam at all. For straight-shot purists vs milk-drink households, the answer flips.',
  },
  {
    slug: 'baratza-sette-270-vs-eureka-mignon-specialita',
    asinA: 'B01DPNTNAS',
    asinB: 'B07YDPC1MK',
    intro:
      'At $379 vs $699, this comparison is really about whether the Specialita\'s flat 55mm burrs and Italian build deserve nearly double the price over the Sette 270\'s low-retention conical setup. For dedicated espresso households, this is the most common cross-shop in the $400-700 grinder zone.',
  },
  {
    slug: 'fellow-ode-gen-2-vs-baratza-encore-for-pour-over',
    asinA: 'B0B7B6Z5DH',
    asinB: 'B007F183LK',
    intro:
      'For pour-over households, the Baratza Encore has been the default $170 pick for a decade; the Fellow Ode Gen 2 at $345 makes the case for 64mm flat burrs and single-dose design as a serious upgrade. Worth double the price for filter-only use?',
  },
  {
    slug: 'comandante-c40-vs-1zpresso-jx-pro-for-travel',
    asinA: 'B07HF93NS6',
    asinB: 'B07VVK39F7',
    intro:
      'Both are premium hand grinders that travel well — but they target different users. The Comandante C40 is the specialty filter standard; the 1Zpresso JX-Pro brings 48mm burrs and 200-click resolution for espresso-capable travel grinding. Pick by primary use case.',
  },
  {
    slug: 'breville-dual-boiler-vs-profitec-pro-300',
    asinA: 'B00CSAYE9W',
    asinB: 'B07D8YHHG9',
    intro:
      'The Breville Dual Boiler and Profitec Pro 300 are both sub-$1,700 true dual-boiler machines with PID — and they are the two most-cross-shopped picks for buyers stepping into prosumer espresso. The Breville offers programmable shot profiles and lower entry price; the Profitec offers German engineering and 58mm commercial parts.',
  },

  // ============================================================
  // Batch 4 — accessories and brewer pairings
  // ============================================================
  {
    slug: 'chemex-vs-hario-v60-for-pour-over',
    asinA: 'B0000YWF5E',
    asinB: 'B000P4D5HG',
    intro:
      'Both are pour-over icons, but they brew differently. The Chemex uses a thick bonded filter that produces an exceptionally clean cup over 4-6 minutes; the V60 uses thin paper for a faster, brighter extraction. The choice is about cup style and brew capacity, not "better."',
  },
  {
    slug: 'kalita-wave-vs-hario-v60-for-beginners',
    asinA: 'B00OQ80T9Y',
    asinB: 'B000P4D5HG',
    intro:
      'For pour-over beginners, the Kalita Wave\'s flat bottom and three controlled flow holes forgive uneven pouring much better than the V60\'s cone. The V60 rewards skill more directly. This comparison frames each for the first-time pour-over user specifically.',
  },
  {
    slug: 'fellow-stagg-ekg-vs-aeropress-bundle',
    asinA: 'B0BVYGZG6T',
    asinB: 'B0047BIWSK',
    intro:
      'Two of the most-recommended single-cup specialty coffee tools, often bought together. The Stagg EKG is the gold-standard pour-over kettle; the AeroPress is the most forgiving single-cup brewer in coffee. Comparing them shows what each unlocks — and why most enthusiasts end up owning both.',
  },
  {
    slug: 'moccamaster-kbgv-vs-chemex-for-batch-brewing',
    asinA: 'B07S9WT5QR',
    asinB: 'B0000YWF5E',
    intro:
      'Both brew 4-10 cups of high-quality filter coffee, but they ask different things of the user. The Moccamaster is a one-button SCA-certified drip machine; the Chemex is a manual pour-over that requires technique. For households brewing daily batches for 2+ people, the choice comes down to skill vs convenience.',
  },
  {
    slug: 'baratza-encore-vs-baratza-encore-esp',
    asinA: 'B007F183LK',
    asinB: 'B0BDFTC76P',
    intro:
      'The Encore ESP is the Encore + an espresso-capable burr redesign for an extra $30. For households making only filter coffee, the original Encore stays the better value. For anyone who might want espresso later, the ESP earns the upgrade. This is the cleanest within-family comparison Baratza ships.',
  },
];
