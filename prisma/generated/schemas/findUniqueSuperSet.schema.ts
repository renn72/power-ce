import { z } from 'zod'
import { SuperSetIncludeObjectSchema } from './objects/SuperSetInclude.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './objects/SuperSetWhereUniqueInput.schema'

export const SuperSetFindUniqueSchema = z.object({
  include: SuperSetIncludeObjectSchema.optional(),
  where: SuperSetWhereUniqueInputObjectSchema,
})
