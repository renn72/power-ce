import { z } from 'zod'
import { UserProgramWhereUniqueInputObjectSchema } from './objects/UserProgramWhereUniqueInput.schema'

export const UserProgramDeleteOneSchema = z.object({
  where: UserProgramWhereUniqueInputObjectSchema,
})
