import { z } from 'zod'
import { UserProgramOrderByWithRelationInputObjectSchema } from './objects/UserProgramOrderByWithRelationInput.schema'
import { UserProgramWhereInputObjectSchema } from './objects/UserProgramWhereInput.schema'
import { UserProgramWhereUniqueInputObjectSchema } from './objects/UserProgramWhereUniqueInput.schema'
import { UserProgramCountAggregateInputObjectSchema } from './objects/UserProgramCountAggregateInput.schema'
import { UserProgramMinAggregateInputObjectSchema } from './objects/UserProgramMinAggregateInput.schema'
import { UserProgramMaxAggregateInputObjectSchema } from './objects/UserProgramMaxAggregateInput.schema'

export const UserProgramAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), UserProgramCountAggregateInputObjectSchema])
    .optional(),
  _min: UserProgramMinAggregateInputObjectSchema.optional(),
  _max: UserProgramMaxAggregateInputObjectSchema.optional(),
})
