import { z } from 'zod';

/////////////////////////////////////////
// GOAL SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const GoalSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  goal: z.string(),
  date: z.coerce.date(),
  isComplete: z.boolean(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type Goal = z.infer<typeof GoalSchema>

/////////////////////////////////////////
// GOAL OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const GoalOptionalDefaultsSchema = GoalSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isComplete: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}))

export type GoalOptionalDefaults = z.infer<typeof GoalOptionalDefaultsSchema>

export default GoalSchema;
