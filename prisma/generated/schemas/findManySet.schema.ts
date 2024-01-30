import { z } from 'zod'
import { SetIncludeObjectSchema } from './objects/SetInclude.schema'
import { SetOrderByWithRelationInputObjectSchema } from './objects/SetOrderByWithRelationInput.schema'
import { SetWhereInputObjectSchema } from './objects/SetWhereInput.schema'
import { SetWhereUniqueInputObjectSchema } from './objects/SetWhereUniqueInput.schema'
import { SetScalarFieldEnumSchema } from './enums/SetScalarFieldEnum.schema'

export const SetFindManySchema = z.object({
  include: z.lazy(() => SetIncludeObjectSchema.optional()),
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
  distinct: z.array(SetScalarFieldEnumSchema).optional(),
})
