// how-to-pages.ts — STUB (Sub-sprint 1 scaffold)
//
// Guías how-to (e.g. "how to calibrate first layer", "how to dry filament")
// se generan en Sub-sprint 3.

export interface HowToNeed {
  name: string;
  optional?: boolean;
}

export interface HowToStep {
  heading: string;
  body: string;
}

export interface HowToFaq {
  q: string;
  a: string;
}

export type HowToTopic =
  | 'calibration'
  | 'maintenance'
  | 'slicing'
  | 'troubleshooting'
  | 'setup'
  | 'other';

export interface HowToPage {
  slug: string;
  title: string;
  topic: HowToTopic;
  productAsin?: string;
  productType?: string;
  totalTimeHuman?: string;
  needs?: HowToNeed[];
  steps?: HowToStep[];
  faqs?: HowToFaq[];
  relatedTroubleshootSlugs?: string[];
}

export function toIsoDuration(_human: string): string {
  return 'PT0M';
}

export const howToPages: HowToPage[] = [];

export const HOW_TO_TOPICS: Record<HowToTopic, string> = {
  calibration: 'Calibration',
  maintenance: 'Maintenance',
  slicing: 'Slicing',
  troubleshooting: 'Troubleshooting',
  setup: 'Setup',
  other: 'Other',
};

export function howToBySlug(slug: string): HowToPage | undefined {
  return howToPages.find((p) => p.slug === slug);
}

export function howTosForProduct(_asin: string): HowToPage[] {
  return [];
}

export function genericHowTosForType(_type: string): HowToPage[] {
  return [];
}
