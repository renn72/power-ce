import { z } from 'zod'
import { ExerciseIncludeObjectSchema } from './objects/ExerciseInclude.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './objects/ExerciseWhereUniqueInput.schema'

export const ExerciseDeleteOneSchema = z.object({
  include: ExerciseIncludeObjectSchema.optional(),
  where: ExerciseWhereUniqueInputObjectSchema,
})
