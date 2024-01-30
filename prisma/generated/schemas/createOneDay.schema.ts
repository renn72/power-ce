import { z } from 'zod'
import { DayIncludeObjectSchema } from './objects/DayInclude.schema'
import { DayCreateInputObjectSchema } from './objects/DayCreateInput.schema'
import { DayUncheckedCreateInputObjectSchema } from './objects/DayUncheckedCreateInput.schema'

export const DayCreateOneSchema = z.object({
  include: DayIncludeObjectSchema.optional(),
  data: z.union([
    DayCreateInputObjectSchema,
    DayUncheckedCreateInputObjectSchema,
  ]),
})
