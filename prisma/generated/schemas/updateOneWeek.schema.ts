import { z } from 'zod'
import { WeekIncludeObjectSchema } from './objects/WeekInclude.schema'
import { WeekUpdateInputObjectSchema } from './objects/WeekUpdateInput.schema'
import { WeekUncheckedUpdateInputObjectSchema } from './objects/WeekUncheckedUpdateInput.schema'
import { WeekWhereUniqueInputObjectSchema } from './objects/WeekWhereUniqueInput.schema'

export const WeekUpdateOneSchema = z.object({
  include: WeekIncludeObjectSchema.optional(),
  data: z.union([
    WeekUpdateInputObjectSchema,
    WeekUncheckedUpdateInputObjectSchema,
  ]),
  where: WeekWhereUniqueInputObjectSchema,
})
