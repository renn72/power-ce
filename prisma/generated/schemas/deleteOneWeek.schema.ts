import { z } from 'zod'
import { WeekIncludeObjectSchema } from './objects/WeekInclude.schema'
import { WeekWhereUniqueInputObjectSchema } from './objects/WeekWhereUniqueInput.schema'

export const WeekDeleteOneSchema = z.object({
  include: WeekIncludeObjectSchema.optional(),
  where: WeekWhereUniqueInputObjectSchema,
})
