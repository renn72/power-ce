import { z } from 'zod';

/////////////////////////////////////////
// BLOCK SCHEMA
/////////////////////////////////////////

export const BlockSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  creatorId: z.string().nullish(),
  isGlobal: z.boolean(),
  name: z.string(),
  isProgram: z.boolean(),
  isDeleted: z.boolean(),
  userId: z.string().nullish(),
  trainerId: z.string().nullish(),
  userIdOfProgram: z.string().nullish(),
  isProgramActive: z.boolean().nullish(),
  isComplete: z.boolean().nullish(),
  isSecondary: z.boolean().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
})

export type Block = z.infer<typeof BlockSchema>

/////////////////////////////////////////
// BLOCK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BlockOptionalDefaultsSchema = BlockSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isGlobal: z.boolean().optional(),
  isProgram: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}))

export type BlockOptionalDefaults = z.infer<typeof BlockOptionalDefaultsSchema>

export default BlockSchema;
