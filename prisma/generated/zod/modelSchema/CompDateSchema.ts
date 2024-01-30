import { z } from 'zod';

/////////////////////////////////////////
// COMP DATE SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const CompDateSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type CompDate = z.infer<typeof CompDateSchema>

/////////////////////////////////////////
// COMP DATE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CompDateOptionalDefaultsSchema = CompDateSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type CompDateOptionalDefaults = z.infer<typeof CompDateOptionalDefaultsSchema>

export default CompDateSchema;
