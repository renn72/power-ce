import { z } from 'zod'
import { SuperSetCreateManyInputObjectSchema } from './objects/SuperSetCreateManyInput.schema'

export const SuperSetCreateManySchema = z.object({
  data: z.union([
    SuperSetCreateManyInputObjectSchema,
    z.array(SuperSetCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
