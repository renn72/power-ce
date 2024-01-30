import { z } from 'zod'
import { DayIncludeObjectSchema } from './objects/DayInclude.schema'
import { DayUpdateInputObjectSchema } from './objects/DayUpdateInput.schema'
import { DayUncheckedUpdateInputObjectSchema } from './objects/DayUncheckedUpdateInput.schema'
import { DayWhereUniqueInputObjectSchema } from './objects/DayWhereUniqueInput.schema'

export const DayUpdateOneSchema = z.object({
  include: DayIncludeObjectSchema.optional(),
  data: z.union([
    DayUpdateInputObjectSchema,
    DayUncheckedUpdateInputObjectSchema,
  ]),
  where: DayWhereUniqueInputObjectSchema,
})
