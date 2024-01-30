import { z } from 'zod'
import { SuperSetIncludeObjectSchema } from './objects/SuperSetInclude.schema'
import { SuperSetCreateInputObjectSchema } from './objects/SuperSetCreateInput.schema'
import { SuperSetUncheckedCreateInputObjectSchema } from './objects/SuperSetUncheckedCreateInput.schema'

export const SuperSetCreateOneSchema = z.object({
  include: SuperSetIncludeObjectSchema.optional(),
  data: z.union([
    SuperSetCreateInputObjectSchema,
    SuperSetUncheckedCreateInputObjectSchema,
  ]),
})
