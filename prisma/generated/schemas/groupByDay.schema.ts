import { z } from 'zod'
import { DayWhereInputObjectSchema } from './objects/DayWhereInput.schema'
import { DayOrderByWithAggregationInputObjectSchema } from './objects/DayOrderByWithAggregationInput.schema'
import { DayScalarWhereWithAggregatesInputObjectSchema } from './objects/DayScalarWhereWithAggregatesInput.schema'
import { DayScalarFieldEnumSchema } from './enums/DayScalarFieldEnum.schema'

export const DayGroupBySchema = z.object({
  where: DayWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      DayOrderByWithAggregationInputObjectSchema,
      DayOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: DayScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(DayScalarFieldEnumSchema),
})
