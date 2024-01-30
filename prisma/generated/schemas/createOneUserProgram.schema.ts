import { z } from 'zod'
import { UserProgramCreateInputObjectSchema } from './objects/UserProgramCreateInput.schema'
import { UserProgramUncheckedCreateInputObjectSchema } from './objects/UserProgramUncheckedCreateInput.schema'

export const UserProgramCreateOneSchema = z.object({
  data: z.union([
    UserProgramCreateInputObjectSchema,
    UserProgramUncheckedCreateInputObjectSchema,
  ]),
})
