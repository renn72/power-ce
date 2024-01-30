import { z } from 'zod'
import { BlockIncludeObjectSchema } from './objects/BlockInclude.schema'
import { BlockCreateInputObjectSchema } from './objects/BlockCreateInput.schema'
import { BlockUncheckedCreateInputObjectSchema } from './objects/BlockUncheckedCreateInput.schema'

export const BlockCreateOneSchema = z.object({
  include: BlockIncludeObjectSchema.optional(),
  data: z.union([
    BlockCreateInputObjectSchema,
    BlockUncheckedCreateInputObjectSchema,
  ]),
})
