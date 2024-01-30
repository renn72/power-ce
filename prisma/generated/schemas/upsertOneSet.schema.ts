import { z } from 'zod'
import { SetIncludeObjectSchema } from './objects/SetInclude.schema'
import { SetWhereUniqueInputObjectSchema } from './objects/SetWhereUniqueInput.schema'
import { SetCreateInputObjectSchema } from './objects/SetCreateInput.schema'
import { SetUncheckedCreateInputObjectSchema } from './objects/SetUncheckedCreateInput.schema'
import { SetUpdateInputObjectSchema } from './objects/SetUpdateInput.schema'
import { SetUncheckedUpdateInputObjectSchema } from './objects/SetUncheckedUpdateInput.schema'

export const SetUpsertSchema = z.object({
  include: SetIncludeObjectSchema.optional(),
  where: SetWhereUniqueInputObjectSchema,
  create: z.union([
    SetCreateInputObjectSchema,
    SetUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    SetUpdateInputObjectSchema,
    SetUncheckedUpdateInputObjectSchema,
  ]),
})
