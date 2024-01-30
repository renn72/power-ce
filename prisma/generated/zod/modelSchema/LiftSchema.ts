import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// LIFT SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const LiftSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  createdAtUser: z.coerce.date(),
  userId: z.string(),
  trainerId: z.string().nullish(),
  liftId: z.string(),
  isDeleted: z.boolean(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'Lift']"}),
  reps: z.number().int(),
  liftName: z.string(),
  notes: z.string().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type Lift = z.infer<typeof LiftSchema>

/////////////////////////////////////////
// LIFT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const LiftOptionalDefaultsSchema = LiftSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  createdAtUser: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type LiftOptionalDefaults = z.infer<typeof LiftOptionalDefaultsSchema>

export default LiftSchema;
