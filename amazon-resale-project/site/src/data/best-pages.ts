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

export const bestPages: BestPage[] = [
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
];
