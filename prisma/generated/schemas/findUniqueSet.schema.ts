import { z } from 'zod'
import { SetIncludeObjectSchema } from './objects/SetInclude.schema'
import { SetWhereUniqueInputObjectSchema } from './objects/SetWhereUniqueInput.schema'

export const SetFindUniqueSchema = z.object({
  include: SetIncludeObjectSchema.optional(),
  where: SetWhereUniqueInputObjectSchema,
})
