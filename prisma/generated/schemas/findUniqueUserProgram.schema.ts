import { z } from 'zod'
import { UserProgramWhereUniqueInputObjectSchema } from './objects/UserProgramWhereUniqueInput.schema'

export const UserProgramFindUniqueSchema = z.object({
  where: UserProgramWhereUniqueInputObjectSchema,
})
