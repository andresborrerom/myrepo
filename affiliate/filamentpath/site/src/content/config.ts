import { defineCollection, z } from 'astro:content';

// 3D printing product types — drive template selection and feature schemas.
const productType = z.enum(['printer', 'filament', 'accessory']);

// Price tiers stored explicitly so templates can group/filter without
// recomputing. Boundaries calibrated to FDM consumer market:
//   budget  <$250
//   mid     $250-$499
//   premium $500-$999
//   pro     >=$1000
const priceTier = z.enum(['budget', 'mid', 'premium', 'pro']);

// ----- Type-specific feature schemas -----------------------------------
// Each kind of product carries different specs. We model them as optional
// fields under a `features` object so templates can pick what to show; the
// concrete enum below documents what we expect per type.

// Printer features.
const printerFeatures = z.object({
  build_volume: z.string(), // e.g. "180x180x180mm"
  xy_resolution: z.string().optional(), // e.g. "0.05-0.4mm layer"
  max_print_speed: z.string().optional(), // e.g. "500mm/s"
  bed_temp_max: z.number().optional(), // Celsius
  nozzle_temp_max: z.number().optional(), // Celsius
  compatible_materials: z.array(z.string()).default([]),
  enclosed: z.boolean().default(false),
  direct_drive: z.boolean().default(false),
  auto_bed_leveling: z.boolean().default(false),
});

// Filament features.
const filamentMaterial = z.enum(['PLA', 'PLA+', 'PETG', 'ABS', 'TPU']);
const filamentDiameter = z.union([z.literal(1.75), z.literal(2.85)]);

const filamentFeatures = z.object({
  material: filamentMaterial,
  diameter: filamentDiameter,
  spool_weight_g: z.number().positive(),
  print_temp_range: z.string(), // e.g. "200-220°C"
  bed_temp_range: z.string().optional(),
  color: z.string().optional(),
});

// Accessory features.
const accessorySubtype = z.enum([
  'build_plate',
  'nozzle',
  'tool',
  'enclosure',
  'other',
]);

const accessoryFeatures = z.object({
  subtype: accessorySubtype,
  compatible_with: z.array(z.string()).default([]),
});

// Union: the `features` blob varies by product type. We accept any of the
// three at the schema level and let templates branch on `type`.
const featuresUnion = z.union([
  printerFeatures,
  filamentFeatures,
  accessoryFeatures,
]);

const products = defineCollection({
  type: 'content',
  schema: z.object({
    asin: z.string().min(8).max(14),
    name: z.string(),
    brand: z.string(),
    type: productType,
    price: z.number().positive(),
    price_tier: priceTier,
    image_url: z.string().url().optional(),
    features: featuresUnion,
    pros: z.array(z.string()).min(1),
    cons: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    best_for: z.array(z.string()).default([]),
    updated_at: z.coerce.date(),
  }),
});

export const collections = { products };

// Helper used by templates so they stay consistent on tier boundaries.
export function deriveTier(price: number): z.infer<typeof priceTier> {
  if (price < 250) return 'budget';
  if (price < 500) return 'mid';
  if (price < 1000) return 'premium';
  return 'pro';
}
