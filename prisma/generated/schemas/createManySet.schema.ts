import { z } from 'zod'
import { SetCreateManyInputObjectSchema } from './objects/SetCreateManyInput.schema'

export const SetCreateManySchema = z.object({
  data: z.union([
    SetCreateManyInputObjectSchema,
    z.array(SetCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
