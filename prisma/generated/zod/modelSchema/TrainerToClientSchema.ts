import { z } from 'zod';

/////////////////////////////////////////
// TRAINER TO CLIENT SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const TrainerToClientSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  trainerId: z.string(),
  clientId: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type TrainerToClient = z.infer<typeof TrainerToClientSchema>

/////////////////////////////////////////
// TRAINER TO CLIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TrainerToClientOptionalDefaultsSchema = TrainerToClientSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type TrainerToClientOptionalDefaults = z.infer<typeof TrainerToClientOptionalDefaultsSchema>

export default TrainerToClientSchema;
