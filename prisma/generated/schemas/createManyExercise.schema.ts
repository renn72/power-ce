import { z } from 'zod'
import { ExerciseCreateManyInputObjectSchema } from './objects/ExerciseCreateManyInput.schema'

export const ExerciseCreateManySchema = z.object({
  data: z.union([
    ExerciseCreateManyInputObjectSchema,
    z.array(ExerciseCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
