import { z } from 'zod';

/////////////////////////////////////////
// WEEK SCHEMA
/////////////////////////////////////////

export const WeekSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string().nullish(),
  isTemplate: z.boolean().nullish(),
  isDeleted: z.boolean(),
  userId: z.string().nullish(),
  trainerId: z.string().nullish(),
  blockId: z.string().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type Week = z.infer<typeof WeekSchema>

/////////////////////////////////////////
// WEEK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WeekOptionalDefaultsSchema = WeekSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type WeekOptionalDefaults = z.infer<typeof WeekOptionalDefaultsSchema>

export default WeekSchema;
