import { z } from 'zod'
import { ExerciseWhereInputObjectSchema } from './objects/ExerciseWhereInput.schema'

export const ExerciseDeleteManySchema = z.object({
  where: ExerciseWhereInputObjectSchema.optional(),
})
