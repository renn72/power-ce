import { z } from 'zod'
import { DayOrderByWithRelationInputObjectSchema } from './objects/DayOrderByWithRelationInput.schema'
import { DayWhereInputObjectSchema } from './objects/DayWhereInput.schema'
import { DayWhereUniqueInputObjectSchema } from './objects/DayWhereUniqueInput.schema'
import { DayCountAggregateInputObjectSchema } from './objects/DayCountAggregateInput.schema'
import { DayMinAggregateInputObjectSchema } from './objects/DayMinAggregateInput.schema'
import { DayMaxAggregateInputObjectSchema } from './objects/DayMaxAggregateInput.schema'

export const DayAggregateSchema = z.object({
  orderBy: z
    .union([
      DayOrderByWithRelationInputObjectSchema,
      DayOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DayWhereInputObjectSchema.optional(),
  cursor: DayWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), DayCountAggregateInputObjectSchema])
    .optional(),
  _min: DayMinAggregateInputObjectSchema.optional(),
  _max: DayMaxAggregateInputObjectSchema.optional(),
})
