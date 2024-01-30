import { z } from 'zod'
import { DayUpdateManyMutationInputObjectSchema } from './objects/DayUpdateManyMutationInput.schema'
import { DayWhereInputObjectSchema } from './objects/DayWhereInput.schema'

export const DayUpdateManySchema = z.object({
  data: DayUpdateManyMutationInputObjectSchema,
  where: DayWhereInputObjectSchema.optional(),
})
