import { z } from 'zod'
import { DayIncludeObjectSchema } from './objects/DayInclude.schema'
import { DayWhereUniqueInputObjectSchema } from './objects/DayWhereUniqueInput.schema'
import { DayCreateInputObjectSchema } from './objects/DayCreateInput.schema'
import { DayUncheckedCreateInputObjectSchema } from './objects/DayUncheckedCreateInput.schema'
import { DayUpdateInputObjectSchema } from './objects/DayUpdateInput.schema'
import { DayUncheckedUpdateInputObjectSchema } from './objects/DayUncheckedUpdateInput.schema'

export const DayUpsertSchema = z.object({
  include: DayIncludeObjectSchema.optional(),
  where: DayWhereUniqueInputObjectSchema,
  create: z.union([
    DayCreateInputObjectSchema,
    DayUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    DayUpdateInputObjectSchema,
    DayUncheckedUpdateInputObjectSchema,
  ]),
})
