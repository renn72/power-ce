import { z } from 'zod'
import { BlockIncludeObjectSchema } from './objects/BlockInclude.schema'
import { BlockWhereUniqueInputObjectSchema } from './objects/BlockWhereUniqueInput.schema'
import { BlockCreateInputObjectSchema } from './objects/BlockCreateInput.schema'
import { BlockUncheckedCreateInputObjectSchema } from './objects/BlockUncheckedCreateInput.schema'
import { BlockUpdateInputObjectSchema } from './objects/BlockUpdateInput.schema'
import { BlockUncheckedUpdateInputObjectSchema } from './objects/BlockUncheckedUpdateInput.schema'

export const BlockUpsertSchema = z.object({
  include: BlockIncludeObjectSchema.optional(),
  where: BlockWhereUniqueInputObjectSchema,
  create: z.union([
    BlockCreateInputObjectSchema,
    BlockUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    BlockUpdateInputObjectSchema,
    BlockUncheckedUpdateInputObjectSchema,
  ]),
})
