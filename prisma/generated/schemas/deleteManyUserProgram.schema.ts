import { z } from 'zod'
import { UserProgramWhereInputObjectSchema } from './objects/UserProgramWhereInput.schema'

export const UserProgramDeleteManySchema = z.object({
  where: UserProgramWhereInputObjectSchema.optional(),
})
