import { z } from 'zod';

/////////////////////////////////////////
// COMP PLAN SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const CompPlanSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  isDeleted: z.boolean(),
})

export type CompPlan = z.infer<typeof CompPlanSchema>

/////////////////////////////////////////
// COMP PLAN OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CompPlanOptionalDefaultsSchema = CompPlanSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type CompPlanOptionalDefaults = z.infer<typeof CompPlanOptionalDefaultsSchema>

export default CompPlanSchema;
