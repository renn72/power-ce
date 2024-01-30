import { z } from 'zod';

/////////////////////////////////////////
// WARMUP SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const WarmupSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  notes: z.string(),
  name: z.string(),
  link: z.string(),
  warmupTemplateId: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type Warmup = z.infer<typeof WarmupSchema>

/////////////////////////////////////////
// WARMUP OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WarmupOptionalDefaultsSchema = WarmupSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type WarmupOptionalDefaults = z.infer<typeof WarmupOptionalDefaultsSchema>

export default WarmupSchema;
