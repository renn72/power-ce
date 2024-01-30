import { z } from 'zod'
import { DayIncludeObjectSchema } from './objects/DayInclude.schema'
import { DayWhereUniqueInputObjectSchema } from './objects/DayWhereUniqueInput.schema'

export const DayFindUniqueSchema = z.object({
  include: DayIncludeObjectSchema.optional(),
  where: DayWhereUniqueInputObjectSchema,
})
