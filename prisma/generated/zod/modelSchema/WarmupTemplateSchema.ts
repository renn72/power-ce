import { z } from 'zod';

/////////////////////////////////////////
// WARMUP TEMPLATE SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const WarmupTemplateSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  creatorId: z.string(),
  name: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type WarmupTemplate = z.infer<typeof WarmupTemplateSchema>

/////////////////////////////////////////
// WARMUP TEMPLATE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WarmupTemplateOptionalDefaultsSchema = WarmupTemplateSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type WarmupTemplateOptionalDefaults = z.infer<typeof WarmupTemplateOptionalDefaultsSchema>

export default WarmupTemplateSchema;
