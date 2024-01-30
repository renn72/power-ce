import { z } from 'zod'
import { UserProgramWhereInputObjectSchema } from './objects/UserProgramWhereInput.schema'
import { UserProgramOrderByWithAggregationInputObjectSchema } from './objects/UserProgramOrderByWithAggregationInput.schema'
import { UserProgramScalarWhereWithAggregatesInputObjectSchema } from './objects/UserProgramScalarWhereWithAggregatesInput.schema'
import { UserProgramScalarFieldEnumSchema } from './enums/UserProgramScalarFieldEnum.schema'

export const UserProgramGroupBySchema = z.object({
  where: UserProgramWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UserProgramOrderByWithAggregationInputObjectSchema,
      UserProgramOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UserProgramScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UserProgramScalarFieldEnumSchema),
})
