import { z } from 'zod'
import { SetWhereInputObjectSchema } from './objects/SetWhereInput.schema'
import { SetOrderByWithAggregationInputObjectSchema } from './objects/SetOrderByWithAggregationInput.schema'
import { SetScalarWhereWithAggregatesInputObjectSchema } from './objects/SetScalarWhereWithAggregatesInput.schema'
import { SetScalarFieldEnumSchema } from './enums/SetScalarFieldEnum.schema'

export const SetGroupBySchema = z.object({
  where: SetWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      SetOrderByWithAggregationInputObjectSchema,
      SetOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: SetScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(SetScalarFieldEnumSchema),
})
