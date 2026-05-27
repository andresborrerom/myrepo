// review-pages.ts — STUB (Sub-sprint 1 scaffold)
//
// Long-form review pages se generan en Sub-sprint 3.

export type Verdict = 'yes' | 'no' | 'depends';

export interface ReviewFaqItem {
  q: string;
  a: string;
}

export interface ReviewPage {
  slug: string;
  title: string;
  productAsin: string;
  alternativeAsins: string[];
  verdict: Verdict;
  oneLineVerdict: string;
  body?: string;
  faqs?: ReviewFaqItem[];
}

export const reviewPages: ReviewPage[] = [];
