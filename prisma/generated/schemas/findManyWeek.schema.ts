import { z } from 'zod'
import { WeekIncludeObjectSchema } from './objects/WeekInclude.schema'
import { WeekOrderByWithRelationInputObjectSchema } from './objects/WeekOrderByWithRelationInput.schema'
import { WeekWhereInputObjectSchema } from './objects/WeekWhereInput.schema'
import { WeekWhereUniqueInputObjectSchema } from './objects/WeekWhereUniqueInput.schema'
import { WeekScalarFieldEnumSchema } from './enums/WeekScalarFieldEnum.schema'

export const WeekFindManySchema = z.object({
  include: z.lazy(() => WeekIncludeObjectSchema.optional()),
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
  distinct: z.array(WeekScalarFieldEnumSchema).optional(),
})
