import { z } from 'zod'
import { UserProgramUpdateInputObjectSchema } from './objects/UserProgramUpdateInput.schema'
import { UserProgramUncheckedUpdateInputObjectSchema } from './objects/UserProgramUncheckedUpdateInput.schema'
import { UserProgramWhereUniqueInputObjectSchema } from './objects/UserProgramWhereUniqueInput.schema'

export const UserProgramUpdateOneSchema = z.object({
  data: z.union([
    UserProgramUpdateInputObjectSchema,
    UserProgramUncheckedUpdateInputObjectSchema,
  ]),
  where: UserProgramWhereUniqueInputObjectSchema,
})
