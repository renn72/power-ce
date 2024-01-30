import { z } from 'zod';

/////////////////////////////////////////
// LIFTS SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const LiftsSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  name: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type Lifts = z.infer<typeof LiftsSchema>

/////////////////////////////////////////
// LIFTS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const LiftsOptionalDefaultsSchema = LiftsSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type LiftsOptionalDefaults = z.infer<typeof LiftsOptionalDefaultsSchema>

export default LiftsSchema;
