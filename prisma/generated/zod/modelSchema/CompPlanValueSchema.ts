import { z } from 'zod';

/////////////////////////////////////////
// COMP PLAN VALUE SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const CompPlanValueSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  CompPlanId: z.string(),
  name: z.string(),
  value: z.string(),
  notes: z.string().nullish(),
  time: z.string().nullish(),
  isGoodLift: z.boolean().nullish(),
  isComplete: z.boolean(),
})

export type CompPlanValue = z.infer<typeof CompPlanValueSchema>

/////////////////////////////////////////
// COMP PLAN VALUE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CompPlanValueOptionalDefaultsSchema = CompPlanValueSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isComplete: z.boolean().optional(),
}))

export type CompPlanValueOptionalDefaults = z.infer<typeof CompPlanValueOptionalDefaultsSchema>

export default CompPlanValueSchema;
