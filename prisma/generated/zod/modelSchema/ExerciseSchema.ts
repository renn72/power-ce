import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// EXERCISE SCHEMA
/////////////////////////////////////////

export const ExerciseSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string().nullish(),
  lift: z.string().nullish(),
  sets: z.number().int().nullish(),
  reps: z.number().int().nullish(),
  userId: z.string().nullish(),
  trainerId: z.string().nullish(),
  isTemplate: z.boolean().nullish(),
  repUnit: z.string().nullish(),
  weightType: z.string().nullish(),
  onerm: z.number().int().nullish(),
  onermTop: z.number().int().nullish(),
  weightTop: z.instanceof(Prisma.Decimal, { message: "Field 'weightTop' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  weightBottom: z.instanceof(Prisma.Decimal, { message: "Field 'weightBottom' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  targetRpe: z.instanceof(Prisma.Decimal, { message: "Field 'targetRpe' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  targetRpeHigh: z.instanceof(Prisma.Decimal, { message: "Field 'targetRpeHigh' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  restTime: z.number().int().nullish(),
  restUnit: z.string().nullish(),
  setWieght: z.instanceof(Prisma.Decimal, { message: "Field 'setWieght' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  setTopWeight: z.instanceof(Prisma.Decimal, { message: "Field 'setTopWeight' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  isEstimatedOnerm: z.boolean(),
  estimatedOnermIndex: z.number().int().nullish(),
  tempoDown: z.number().int().nullish(),
  tempoPause: z.number().int().nullish(),
  tempoUp: z.number().int().nullish(),
  actualSets: z.number().int().nullish(),
  actualReps: z.number().int().nullish(),
  isComplete: z.boolean(),
  rpe: z.instanceof(Prisma.Decimal, { message: "Field 'rpe' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'Exercise']"}).nullish(),
  dayId: z.string().nullish(),
  isSS: z.boolean().nullish(),
  notes: z.string().nullish(),
  htmlLink: z.string().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type Exercise = z.infer<typeof ExerciseSchema>

/////////////////////////////////////////
// EXERCISE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ExerciseOptionalDefaultsSchema = ExerciseSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isEstimatedOnerm: z.boolean().optional(),
  isComplete: z.boolean().optional(),
}))

export type ExerciseOptionalDefaults = z.infer<typeof ExerciseOptionalDefaultsSchema>

export default ExerciseSchema;
