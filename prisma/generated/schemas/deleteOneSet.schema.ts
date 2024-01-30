import { z } from 'zod'
import { SetIncludeObjectSchema } from './objects/SetInclude.schema'
import { SetWhereUniqueInputObjectSchema } from './objects/SetWhereUniqueInput.schema'

export const SetDeleteOneSchema = z.object({
  include: SetIncludeObjectSchema.optional(),
  where: SetWhereUniqueInputObjectSchema,
})
