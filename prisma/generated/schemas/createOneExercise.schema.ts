import { z } from 'zod'
import { ExerciseIncludeObjectSchema } from './objects/ExerciseInclude.schema'
import { ExerciseCreateInputObjectSchema } from './objects/ExerciseCreateInput.schema'
import { ExerciseUncheckedCreateInputObjectSchema } from './objects/ExerciseUncheckedCreateInput.schema'

export const ExerciseCreateOneSchema = z.object({
  include: ExerciseIncludeObjectSchema.optional(),
  data: z.union([
    ExerciseCreateInputObjectSchema,
    ExerciseUncheckedCreateInputObjectSchema,
  ]),
})
