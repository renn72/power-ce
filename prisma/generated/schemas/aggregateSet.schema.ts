import { z } from 'zod'
import { SetOrderByWithRelationInputObjectSchema } from './objects/SetOrderByWithRelationInput.schema'
import { SetWhereInputObjectSchema } from './objects/SetWhereInput.schema'
import { SetWhereUniqueInputObjectSchema } from './objects/SetWhereUniqueInput.schema'
import { SetCountAggregateInputObjectSchema } from './objects/SetCountAggregateInput.schema'
import { SetMinAggregateInputObjectSchema } from './objects/SetMinAggregateInput.schema'
import { SetMaxAggregateInputObjectSchema } from './objects/SetMaxAggregateInput.schema'
import { SetAvgAggregateInputObjectSchema } from './objects/SetAvgAggregateInput.schema'
import { SetSumAggregateInputObjectSchema } from './objects/SetSumAggregateInput.schema'

export const SetAggregateSchema = z.object({
  orderBy: z
    .union([
      SetOrderByWithRelationInputObjectSchema,
      SetOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SetWhereInputObjectSchema.optional(),
  cursor: SetWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), SetCountAggregateInputObjectSchema])
    .optional(),
  _min: SetMinAggregateInputObjectSchema.optional(),
  _max: SetMaxAggregateInputObjectSchema.optional(),
  _avg: SetAvgAggregateInputObjectSchema.optional(),
  _sum: SetSumAggregateInputObjectSchema.optional(),
})
