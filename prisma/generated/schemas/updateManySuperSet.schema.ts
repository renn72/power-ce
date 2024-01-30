import { z } from 'zod'
import { SuperSetUpdateManyMutationInputObjectSchema } from './objects/SuperSetUpdateManyMutationInput.schema'
import { SuperSetWhereInputObjectSchema } from './objects/SuperSetWhereInput.schema'

export const SuperSetUpdateManySchema = z.object({
  data: SuperSetUpdateManyMutationInputObjectSchema,
  where: SuperSetWhereInputObjectSchema.optional(),
})
