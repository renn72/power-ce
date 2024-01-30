import { z } from 'zod'
import { WeekWhereInputObjectSchema } from './objects/WeekWhereInput.schema'

export const WeekDeleteManySchema = z.object({
  where: WeekWhereInputObjectSchema.optional(),
})
