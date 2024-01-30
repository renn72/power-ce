import { z } from 'zod'
import { BlockIncludeObjectSchema } from './objects/BlockInclude.schema'
import { BlockWhereUniqueInputObjectSchema } from './objects/BlockWhereUniqueInput.schema'

export const BlockDeleteOneSchema = z.object({
  include: BlockIncludeObjectSchema.optional(),
  where: BlockWhereUniqueInputObjectSchema,
})
