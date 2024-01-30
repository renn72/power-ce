import { z } from 'zod'
import { WeekIncludeObjectSchema } from './objects/WeekInclude.schema'
import { WeekWhereUniqueInputObjectSchema } from './objects/WeekWhereUniqueInput.schema'
import { WeekCreateInputObjectSchema } from './objects/WeekCreateInput.schema'
import { WeekUncheckedCreateInputObjectSchema } from './objects/WeekUncheckedCreateInput.schema'
import { WeekUpdateInputObjectSchema } from './objects/WeekUpdateInput.schema'
import { WeekUncheckedUpdateInputObjectSchema } from './objects/WeekUncheckedUpdateInput.schema'

export const WeekUpsertSchema = z.object({
  include: WeekIncludeObjectSchema.optional(),
  where: WeekWhereUniqueInputObjectSchema,
  create: z.union([
    WeekCreateInputObjectSchema,
    WeekUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    WeekUpdateInputObjectSchema,
    WeekUncheckedUpdateInputObjectSchema,
  ]),
})
