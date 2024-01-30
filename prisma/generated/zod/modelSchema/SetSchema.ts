import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// SET SCHEMA
/////////////////////////////////////////

export const SetSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  rep: z.number().int(),
  rpe: z.instanceof(Prisma.Decimal, { message: "Field 'rpe' must be a Decimal. Location: ['Models', 'Set']"}).nullish(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'Set']"}).nullish(),
  isComplete: z.boolean(),
  name: z.string().nullish(),
  lift: z.string().nullish(),
  userId: z.string().nullish(),
  trainerId: z.string().nullish(),
  actualReps: z.number().int().nullish(),
  estiamtedOnerm: z.instanceof(Prisma.Decimal, { message: "Field 'estiamtedOnerm' must be a Decimal. Location: ['Models', 'Set']"}).nullish(),
  exerciseId: z.string().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type Set = z.infer<typeof SetSchema>

/////////////////////////////////////////
// SET OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const SetOptionalDefaultsSchema = SetSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type SetOptionalDefaults = z.infer<typeof SetOptionalDefaultsSchema>

export default SetSchema;
