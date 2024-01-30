import { z } from 'zod'
import { WeekUpdateManyMutationInputObjectSchema } from './objects/WeekUpdateManyMutationInput.schema'
import { WeekWhereInputObjectSchema } from './objects/WeekWhereInput.schema'

export const WeekUpdateManySchema = z.object({
  data: WeekUpdateManyMutationInputObjectSchema,
  where: WeekWhereInputObjectSchema.optional(),
})
