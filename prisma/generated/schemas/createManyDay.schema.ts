import { z } from 'zod'
import { DayCreateManyInputObjectSchema } from './objects/DayCreateManyInput.schema'

export const DayCreateManySchema = z.object({
  data: z.union([
    DayCreateManyInputObjectSchema,
    z.array(DayCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
