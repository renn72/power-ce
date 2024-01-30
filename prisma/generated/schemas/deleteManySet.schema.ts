import { z } from 'zod'
import { SetWhereInputObjectSchema } from './objects/SetWhereInput.schema'

export const SetDeleteManySchema = z.object({
  where: SetWhereInputObjectSchema.optional(),
})
