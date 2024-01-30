import { z } from 'zod'
import { DayIncludeObjectSchema } from './objects/DayInclude.schema'
import { DayOrderByWithRelationInputObjectSchema } from './objects/DayOrderByWithRelationInput.schema'
import { DayWhereInputObjectSchema } from './objects/DayWhereInput.schema'
import { DayWhereUniqueInputObjectSchema } from './objects/DayWhereUniqueInput.schema'
import { DayScalarFieldEnumSchema } from './enums/DayScalarFieldEnum.schema'

export const DayFindManySchema = z.object({
  include: z.lazy(() => DayIncludeObjectSchema.optional()),
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
  distinct: z.array(DayScalarFieldEnumSchema).optional(),
})
