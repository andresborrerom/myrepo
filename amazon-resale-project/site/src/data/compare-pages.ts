// Compare-page definitions. Same hoisting rationale as best-pages.ts:
// getStaticPaths is hoisted out of the .astro frontmatter, so module-level
// constants defined in the .astro file are not in scope.

export interface ComparePage {
  slug: string;
  asinA: string;
  asinB: string;
  intro: string;
}

export const comparePages: ComparePage[] = [
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
];
