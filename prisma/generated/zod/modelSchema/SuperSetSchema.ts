import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// SUPER SET SCHEMA
/////////////////////////////////////////

export const SuperSetSchema = z.object({
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
  weightTop: z.instanceof(Prisma.Decimal, { message: "Field 'weightTop' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  weightBottom: z.instanceof(Prisma.Decimal, { message: "Field 'weightBottom' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  targetRpe: z.instanceof(Prisma.Decimal, { message: "Field 'targetRpe' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  targetRpeHigh: z.instanceof(Prisma.Decimal, { message: "Field 'targetRpeHigh' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  restTime: z.number().int().nullish(),
  restUnit: z.string().nullish(),
  setWieght: z.instanceof(Prisma.Decimal, { message: "Field 'setWieght' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  setTopWeight: z.instanceof(Prisma.Decimal, { message: "Field 'setTopWeight' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  isEstimatedOnerm: z.boolean(),
  estimatedOnermIndex: z.number().int().nullish(),
  actualSets: z.number().int().nullish(),
  actualReps: z.number().int().nullish(),
  isComplete: z.boolean(),
  rpe: z.instanceof(Prisma.Decimal, { message: "Field 'rpe' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'SuperSet']"}).nullish(),
  exerciseId: z.string().nullish(),
  notes: z.string().nullish(),
  htmlLink: z.string().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type SuperSet = z.infer<typeof SuperSetSchema>

/////////////////////////////////////////
// SUPER SET OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SuperSetOptionalDefaultsSchema = SuperSetSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isEstimatedOnerm: z.boolean().optional(),
  isComplete: z.boolean().optional(),
}))

export type SuperSetOptionalDefaults = z.infer<typeof SuperSetOptionalDefaultsSchema>

export default SuperSetSchema;
