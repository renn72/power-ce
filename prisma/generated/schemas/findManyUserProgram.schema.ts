import { z } from 'zod'
import { UserProgramOrderByWithRelationInputObjectSchema } from './objects/UserProgramOrderByWithRelationInput.schema'
import { UserProgramWhereInputObjectSchema } from './objects/UserProgramWhereInput.schema'
import { UserProgramWhereUniqueInputObjectSchema } from './objects/UserProgramWhereUniqueInput.schema'
import { UserProgramScalarFieldEnumSchema } from './enums/UserProgramScalarFieldEnum.schema'

export const UserProgramFindManySchema = z.object({
  orderBy: z
    .union([
      UserProgramOrderByWithRelationInputObjectSchema,
      UserProgramOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UserProgramWhereInputObjectSchema.optional(),
  cursor: UserProgramWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(UserProgramScalarFieldEnumSchema).optional(),
})
