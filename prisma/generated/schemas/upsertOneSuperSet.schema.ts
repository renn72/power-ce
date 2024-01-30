import { z } from 'zod'
import { SuperSetIncludeObjectSchema } from './objects/SuperSetInclude.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './objects/SuperSetWhereUniqueInput.schema'
import { SuperSetCreateInputObjectSchema } from './objects/SuperSetCreateInput.schema'
import { SuperSetUncheckedCreateInputObjectSchema } from './objects/SuperSetUncheckedCreateInput.schema'
import { SuperSetUpdateInputObjectSchema } from './objects/SuperSetUpdateInput.schema'
import { SuperSetUncheckedUpdateInputObjectSchema } from './objects/SuperSetUncheckedUpdateInput.schema'

export const SuperSetUpsertSchema = z.object({
  include: SuperSetIncludeObjectSchema.optional(),
  where: SuperSetWhereUniqueInputObjectSchema,
  create: z.union([
    SuperSetCreateInputObjectSchema,
    SuperSetUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    SuperSetUpdateInputObjectSchema,
    SuperSetUncheckedUpdateInputObjectSchema,
  ]),
})
