import { z } from 'zod'
import { SuperSetWhereInputObjectSchema } from './objects/SuperSetWhereInput.schema'
import { SuperSetOrderByWithAggregationInputObjectSchema } from './objects/SuperSetOrderByWithAggregationInput.schema'
import { SuperSetScalarWhereWithAggregatesInputObjectSchema } from './objects/SuperSetScalarWhereWithAggregatesInput.schema'
import { SuperSetScalarFieldEnumSchema } from './enums/SuperSetScalarFieldEnum.schema'

export const SuperSetGroupBySchema = z.object({
  where: SuperSetWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      SuperSetOrderByWithAggregationInputObjectSchema,
      SuperSetOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: SuperSetScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(SuperSetScalarFieldEnumSchema),
})
