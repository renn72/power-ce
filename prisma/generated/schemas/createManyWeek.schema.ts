import { z } from 'zod'
import { WeekCreateManyInputObjectSchema } from './objects/WeekCreateManyInput.schema'

export const WeekCreateManySchema = z.object({
  data: z.union([
    WeekCreateManyInputObjectSchema,
    z.array(WeekCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
