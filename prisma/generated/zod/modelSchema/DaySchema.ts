import { z } from 'zod';

/////////////////////////////////////////
// DAY SCHEMA
/////////////////////////////////////////

export const DaySchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string().nullish(),
  userId: z.string().nullish(),
  trainerId: z.string().nullish(),
  isTemplate: z.boolean().nullish(),
  isRestDay: z.boolean(),
  weekId: z.string().nullish(),
  warmupTemplateId: z.string().nullish(),
  energyRating: z.string(),
  isComplete: z.boolean().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type Day = z.infer<typeof DaySchema>

/////////////////////////////////////////
// DAY OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DayOptionalDefaultsSchema = DaySchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  energyRating: z.string().optional(),
}))

export type DayOptionalDefaults = z.infer<typeof DayOptionalDefaultsSchema>

export default DaySchema;
