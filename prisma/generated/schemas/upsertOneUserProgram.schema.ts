import { z } from 'zod'
import { UserProgramWhereUniqueInputObjectSchema } from './objects/UserProgramWhereUniqueInput.schema'
import { UserProgramCreateInputObjectSchema } from './objects/UserProgramCreateInput.schema'
import { UserProgramUncheckedCreateInputObjectSchema } from './objects/UserProgramUncheckedCreateInput.schema'
import { UserProgramUpdateInputObjectSchema } from './objects/UserProgramUpdateInput.schema'
import { UserProgramUncheckedUpdateInputObjectSchema } from './objects/UserProgramUncheckedUpdateInput.schema'

export const UserProgramUpsertSchema = z.object({
  where: UserProgramWhereUniqueInputObjectSchema,
  create: z.union([
    UserProgramCreateInputObjectSchema,
    UserProgramUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    UserProgramUpdateInputObjectSchema,
    UserProgramUncheckedUpdateInputObjectSchema,
  ]),
})
