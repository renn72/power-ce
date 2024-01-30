import { z } from 'zod'
import { BlockOrderByWithRelationInputObjectSchema } from './objects/BlockOrderByWithRelationInput.schema'
import { BlockWhereInputObjectSchema } from './objects/BlockWhereInput.schema'
import { BlockWhereUniqueInputObjectSchema } from './objects/BlockWhereUniqueInput.schema'
import { BlockCountAggregateInputObjectSchema } from './objects/BlockCountAggregateInput.schema'
import { BlockMinAggregateInputObjectSchema } from './objects/BlockMinAggregateInput.schema'
import { BlockMaxAggregateInputObjectSchema } from './objects/BlockMaxAggregateInput.schema'

export const BlockAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), BlockCountAggregateInputObjectSchema])
    .optional(),
  _min: BlockMinAggregateInputObjectSchema.optional(),
  _max: BlockMaxAggregateInputObjectSchema.optional(),
})
