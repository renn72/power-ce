import { z } from 'zod'
import { WeekWhereInputObjectSchema } from './objects/WeekWhereInput.schema'
import { WeekOrderByWithAggregationInputObjectSchema } from './objects/WeekOrderByWithAggregationInput.schema'
import { WeekScalarWhereWithAggregatesInputObjectSchema } from './objects/WeekScalarWhereWithAggregatesInput.schema'
import { WeekScalarFieldEnumSchema } from './enums/WeekScalarFieldEnum.schema'

export const WeekGroupBySchema = z.object({
  where: WeekWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      WeekOrderByWithAggregationInputObjectSchema,
      WeekOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: WeekScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(WeekScalarFieldEnumSchema),
})
