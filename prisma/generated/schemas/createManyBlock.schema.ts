import { z } from 'zod'
import { BlockCreateManyInputObjectSchema } from './objects/BlockCreateManyInput.schema'

export const BlockCreateManySchema = z.object({
  data: z.union([
    BlockCreateManyInputObjectSchema,
    z.array(BlockCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
