import { z } from 'zod'
import { BlockIncludeObjectSchema } from './objects/BlockInclude.schema'
import { BlockOrderByWithRelationInputObjectSchema } from './objects/BlockOrderByWithRelationInput.schema'
import { BlockWhereInputObjectSchema } from './objects/BlockWhereInput.schema'
import { BlockWhereUniqueInputObjectSchema } from './objects/BlockWhereUniqueInput.schema'
import { BlockScalarFieldEnumSchema } from './enums/BlockScalarFieldEnum.schema'

export const BlockFindFirstSchema = z.object({
  include: BlockIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      BlockOrderByWithRelationInputObjectSchema,
      BlockOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: BlockWhereInputObjectSchema.optional(),
  cursor: BlockWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(BlockScalarFieldEnumSchema).optional(),
})
