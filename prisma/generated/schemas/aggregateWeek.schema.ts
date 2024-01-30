import { z } from 'zod'
import { WeekOrderByWithRelationInputObjectSchema } from './objects/WeekOrderByWithRelationInput.schema'
import { WeekWhereInputObjectSchema } from './objects/WeekWhereInput.schema'
import { WeekWhereUniqueInputObjectSchema } from './objects/WeekWhereUniqueInput.schema'
import { WeekCountAggregateInputObjectSchema } from './objects/WeekCountAggregateInput.schema'
import { WeekMinAggregateInputObjectSchema } from './objects/WeekMinAggregateInput.schema'
import { WeekMaxAggregateInputObjectSchema } from './objects/WeekMaxAggregateInput.schema'

export const WeekAggregateSchema = z.object({
  orderBy: z
    .union([
      WeekOrderByWithRelationInputObjectSchema,
      WeekOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: WeekWhereInputObjectSchema.optional(),
  cursor: WeekWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), WeekCountAggregateInputObjectSchema])
    .optional(),
  _min: WeekMinAggregateInputObjectSchema.optional(),
  _max: WeekMaxAggregateInputObjectSchema.optional(),
})
