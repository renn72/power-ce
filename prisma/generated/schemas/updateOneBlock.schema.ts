import { z } from 'zod'
import { BlockIncludeObjectSchema } from './objects/BlockInclude.schema'
import { BlockUpdateInputObjectSchema } from './objects/BlockUpdateInput.schema'
import { BlockUncheckedUpdateInputObjectSchema } from './objects/BlockUncheckedUpdateInput.schema'
import { BlockWhereUniqueInputObjectSchema } from './objects/BlockWhereUniqueInput.schema'

export const BlockUpdateOneSchema = z.object({
  include: BlockIncludeObjectSchema.optional(),
  data: z.union([
    BlockUpdateInputObjectSchema,
    BlockUncheckedUpdateInputObjectSchema,
  ]),
  where: BlockWhereUniqueInputObjectSchema,
})
