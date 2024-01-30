import { z } from 'zod'
import { SuperSetIncludeObjectSchema } from './objects/SuperSetInclude.schema'
import { SuperSetUpdateInputObjectSchema } from './objects/SuperSetUpdateInput.schema'
import { SuperSetUncheckedUpdateInputObjectSchema } from './objects/SuperSetUncheckedUpdateInput.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './objects/SuperSetWhereUniqueInput.schema'

export const SuperSetUpdateOneSchema = z.object({
  include: SuperSetIncludeObjectSchema.optional(),
  data: z.union([
    SuperSetUpdateInputObjectSchema,
    SuperSetUncheckedUpdateInputObjectSchema,
  ]),
  where: SuperSetWhereUniqueInputObjectSchema,
})
