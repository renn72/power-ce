import { z } from 'zod'
import { SetIncludeObjectSchema } from './objects/SetInclude.schema'
import { SetCreateInputObjectSchema } from './objects/SetCreateInput.schema'
import { SetUncheckedCreateInputObjectSchema } from './objects/SetUncheckedCreateInput.schema'

export const SetCreateOneSchema = z.object({
  include: SetIncludeObjectSchema.optional(),
  data: z.union([
    SetCreateInputObjectSchema,
    SetUncheckedCreateInputObjectSchema,
  ]),
})
