import { z } from 'zod'
import { SetUpdateManyMutationInputObjectSchema } from './objects/SetUpdateManyMutationInput.schema'
import { SetWhereInputObjectSchema } from './objects/SetWhereInput.schema'

export const SetUpdateManySchema = z.object({
  data: SetUpdateManyMutationInputObjectSchema,
  where: SetWhereInputObjectSchema.optional(),
})
