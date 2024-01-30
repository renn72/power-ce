import { z } from 'zod'
import { DayWhereInputObjectSchema } from './objects/DayWhereInput.schema'

export const DayDeleteManySchema = z.object({
  where: DayWhereInputObjectSchema.optional(),
})
