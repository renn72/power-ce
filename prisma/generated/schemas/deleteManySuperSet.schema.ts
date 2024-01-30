import { z } from 'zod'
import { SuperSetWhereInputObjectSchema } from './objects/SuperSetWhereInput.schema'

export const SuperSetDeleteManySchema = z.object({
  where: SuperSetWhereInputObjectSchema.optional(),
})
