import { z } from 'zod'
import { BlockWhereInputObjectSchema } from './objects/BlockWhereInput.schema'

export const BlockDeleteManySchema = z.object({
  where: BlockWhereInputObjectSchema.optional(),
})
