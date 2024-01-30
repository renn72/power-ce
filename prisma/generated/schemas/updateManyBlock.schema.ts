import { z } from 'zod'
import { BlockUpdateManyMutationInputObjectSchema } from './objects/BlockUpdateManyMutationInput.schema'
import { BlockWhereInputObjectSchema } from './objects/BlockWhereInput.schema'

export const BlockUpdateManySchema = z.object({
  data: BlockUpdateManyMutationInputObjectSchema,
  where: BlockWhereInputObjectSchema.optional(),
})
