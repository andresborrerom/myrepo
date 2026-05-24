import { defineCollection, z } from 'astro:content';

// Product type enum drives template selection and feature schemas downstream.
const productType = z.enum([
  'espresso-machine',
  'grinder',
  'accessory',
  'brewer',
]);

// Price tiers are derivable from `price`, but stored explicitly so we can
// filter/group efficiently in templates without recomputing per-render.
// Boundaries: budget <$150, mid $150-499, premium $500-1499, pro >=$1500.
const priceTier = z.enum(['budget', 'mid', 'premium', 'pro']);

// `features` intentionally permissive: keys vary by product type.
// Espresso machine: boiler_type, pid, bar_pressure, group_head, water_tank_l, etc.
// Grinder: burr_type, burr_size_mm, motor_watts, stepless, hopper_g, etc.
// Accessory/brewer: capacity_ml, material, filter_type, etc.
const featuresSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean()])
);

const products = defineCollection({
  type: 'content',
  schema: z.object({
    asin: z.string().min(10).max(14),
    name: z.string(),
    brand: z.string(),
    type: productType,
    price: z.number().positive(),
    price_tier: priceTier,
    image_url: z.string().url().optional(),
    features: featuresSchema,
    pros: z.array(z.string()).min(1),
    cons: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    best_for: z.array(z.string()).default([]),
    updated_at: z.coerce.date(),
  }),
});

export const collections = { products };

// Helper used by templates so they can stay consistent on tier boundaries.
export function deriveTier(price: number): z.infer<typeof priceTier> {
  if (price < 150) return 'budget';
  if (price < 500) return 'mid';
  if (price < 1500) return 'premium';
  return 'pro';
}
