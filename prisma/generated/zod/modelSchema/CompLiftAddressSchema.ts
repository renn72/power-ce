import { z } from 'zod';

/////////////////////////////////////////
// COMP LIFT ADDRESS SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const CompLiftAddressSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  address: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type CompLiftAddress = z.infer<typeof CompLiftAddressSchema>

/////////////////////////////////////////
// COMP LIFT ADDRESS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CompLiftAddressOptionalDefaultsSchema = CompLiftAddressSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type CompLiftAddressOptionalDefaults = z.infer<typeof CompLiftAddressOptionalDefaultsSchema>

export default CompLiftAddressSchema;
