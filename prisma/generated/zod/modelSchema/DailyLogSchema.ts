import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// DAILY LOG SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const DailyLogSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'DailyLog']"}).nullish(),
  fat: z.instanceof(Prisma.Decimal, { message: "Field 'fat' must be a Decimal. Location: ['Models', 'DailyLog']"}).nullish(),
  carbs: z.instanceof(Prisma.Decimal, { message: "Field 'carbs' must be a Decimal. Location: ['Models', 'DailyLog']"}).nullish(),
  protein: z.instanceof(Prisma.Decimal, { message: "Field 'protein' must be a Decimal. Location: ['Models', 'DailyLog']"}).nullish(),
  calories: z.instanceof(Prisma.Decimal, { message: "Field 'calories' must be a Decimal. Location: ['Models', 'DailyLog']"}).nullish(),
  steps: z.number().int().nullish(),
  motivation: z.number().int().nullish(),
  notes: z.string().nullish(),
  sleepHrs: z.instanceof(Prisma.Decimal, { message: "Field 'sleepHrs' must be a Decimal. Location: ['Models', 'DailyLog']"}).nullish(),
  sleepQuality: z.number().int().nullish(),
  recovery: z.number().int().nullish(),
  stress: z.number().int().nullish(),
  energy: z.number().int().nullish(),
  restingHeartRate: z.number().int().nullish(),
  vo2Max: z.number().int().nullish(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type DailyLog = z.infer<typeof DailyLogSchema>

/////////////////////////////////////////
// DAILY LOG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DailyLogOptionalDefaultsSchema = DailyLogSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type DailyLogOptionalDefaults = z.infer<typeof DailyLogOptionalDefaultsSchema>

export default DailyLogSchema;
