import { z } from 'zod'
import { SetIncludeObjectSchema } from './objects/SetInclude.schema'
import { SetUpdateInputObjectSchema } from './objects/SetUpdateInput.schema'
import { SetUncheckedUpdateInputObjectSchema } from './objects/SetUncheckedUpdateInput.schema'
import { SetWhereUniqueInputObjectSchema } from './objects/SetWhereUniqueInput.schema'

export const SetUpdateOneSchema = z.object({
  include: SetIncludeObjectSchema.optional(),
  data: z.union([
    SetUpdateInputObjectSchema,
    SetUncheckedUpdateInputObjectSchema,
  ]),
  where: SetWhereUniqueInputObjectSchema,
})
