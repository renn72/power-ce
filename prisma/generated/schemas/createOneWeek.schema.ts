import { z } from 'zod'
import { WeekIncludeObjectSchema } from './objects/WeekInclude.schema'
import { WeekCreateInputObjectSchema } from './objects/WeekCreateInput.schema'
import { WeekUncheckedCreateInputObjectSchema } from './objects/WeekUncheckedCreateInput.schema'

export const WeekCreateOneSchema = z.object({
  include: WeekIncludeObjectSchema.optional(),
  data: z.union([
    WeekCreateInputObjectSchema,
    WeekUncheckedCreateInputObjectSchema,
  ]),
})
