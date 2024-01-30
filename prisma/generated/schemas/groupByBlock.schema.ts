import { z } from 'zod'
import { BlockWhereInputObjectSchema } from './objects/BlockWhereInput.schema'
import { BlockOrderByWithAggregationInputObjectSchema } from './objects/BlockOrderByWithAggregationInput.schema'
import { BlockScalarWhereWithAggregatesInputObjectSchema } from './objects/BlockScalarWhereWithAggregatesInput.schema'
import { BlockScalarFieldEnumSchema } from './enums/BlockScalarFieldEnum.schema'

export const BlockGroupBySchema = z.object({
  where: BlockWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      BlockOrderByWithAggregationInputObjectSchema,
      BlockOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: BlockScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(BlockScalarFieldEnumSchema),
})
