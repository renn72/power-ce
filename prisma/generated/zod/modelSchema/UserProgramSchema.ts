import { z } from 'zod';

/////////////////////////////////////////
// USER PROGRAM SCHEMA
/////////////////////////////////////////

export const UserProgramSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  trainerId: z.string().nullish(),
  templateId: z.string(),
  programId: z.string().nullish(),
  isProgramActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
})

export type UserProgram = z.infer<typeof UserProgramSchema>

/////////////////////////////////////////
// USER PROGRAM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserProgramOptionalDefaultsSchema = UserProgramSchema.merge(z.object({
  id: z.string().cuid().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type UserProgramOptionalDefaults = z.infer<typeof UserProgramOptionalDefaultsSchema>

export default UserProgramSchema;
