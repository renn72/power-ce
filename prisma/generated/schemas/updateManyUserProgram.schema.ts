import { z } from 'zod'
import { UserProgramUpdateManyMutationInputObjectSchema } from './objects/UserProgramUpdateManyMutationInput.schema'
import { UserProgramWhereInputObjectSchema } from './objects/UserProgramWhereInput.schema'

export const UserProgramUpdateManySchema = z.object({
  data: UserProgramUpdateManyMutationInputObjectSchema,
  where: UserProgramWhereInputObjectSchema.optional(),
})
