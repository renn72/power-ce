import { z } from 'zod'
import { SuperSetOrderByWithRelationInputObjectSchema } from './objects/SuperSetOrderByWithRelationInput.schema'
import { SuperSetWhereInputObjectSchema } from './objects/SuperSetWhereInput.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './objects/SuperSetWhereUniqueInput.schema'
import { SuperSetCountAggregateInputObjectSchema } from './objects/SuperSetCountAggregateInput.schema'
import { SuperSetMinAggregateInputObjectSchema } from './objects/SuperSetMinAggregateInput.schema'
import { SuperSetMaxAggregateInputObjectSchema } from './objects/SuperSetMaxAggregateInput.schema'
import { SuperSetAvgAggregateInputObjectSchema } from './objects/SuperSetAvgAggregateInput.schema'
import { SuperSetSumAggregateInputObjectSchema } from './objects/SuperSetSumAggregateInput.schema'

export const SuperSetAggregateSchema = z.object({
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
  _count: z
    .union([z.literal(true), SuperSetCountAggregateInputObjectSchema])
    .optional(),
  _min: SuperSetMinAggregateInputObjectSchema.optional(),
  _max: SuperSetMaxAggregateInputObjectSchema.optional(),
  _avg: SuperSetAvgAggregateInputObjectSchema.optional(),
  _sum: SuperSetSumAggregateInputObjectSchema.optional(),
})
