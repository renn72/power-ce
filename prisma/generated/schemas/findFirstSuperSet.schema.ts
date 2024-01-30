import { z } from 'zod'
import { SuperSetIncludeObjectSchema } from './objects/SuperSetInclude.schema'
import { SuperSetOrderByWithRelationInputObjectSchema } from './objects/SuperSetOrderByWithRelationInput.schema'
import { SuperSetWhereInputObjectSchema } from './objects/SuperSetWhereInput.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './objects/SuperSetWhereUniqueInput.schema'
import { SuperSetScalarFieldEnumSchema } from './enums/SuperSetScalarFieldEnum.schema'

export const SuperSetFindFirstSchema = z.object({
  include: SuperSetIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      SuperSetOrderByWithRelationInputObjectSchema,
      SuperSetOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SuperSetWhereInputObjectSchema.optional(),
  cursor: SuperSetWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(SuperSetScalarFieldEnumSchema).optional(),
})
