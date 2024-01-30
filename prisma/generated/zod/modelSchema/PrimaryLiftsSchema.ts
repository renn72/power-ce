import { z } from 'zod';

/////////////////////////////////////////
// PRIMARY LIFTS SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const PrimaryLiftsSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string(),
  creadedBy: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type PrimaryLifts = z.infer<typeof PrimaryLiftsSchema>

/////////////////////////////////////////
// PRIMARY LIFTS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const PrimaryLiftsOptionalDefaultsSchema = PrimaryLiftsSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type PrimaryLiftsOptionalDefaults = z.infer<typeof PrimaryLiftsOptionalDefaultsSchema>

export default PrimaryLiftsSchema;
