import { z } from 'zod'
import { UserProgramCreateManyInputObjectSchema } from './objects/UserProgramCreateManyInput.schema'

export const UserProgramCreateManySchema = z.object({
  data: z.union([
    UserProgramCreateManyInputObjectSchema,
    z.array(UserProgramCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
