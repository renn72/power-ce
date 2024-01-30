import { z } from 'zod'
import { ExerciseUpdateManyMutationInputObjectSchema } from './objects/ExerciseUpdateManyMutationInput.schema'
import { ExerciseWhereInputObjectSchema } from './objects/ExerciseWhereInput.schema'

export const ExerciseUpdateManySchema = z.object({
  data: ExerciseUpdateManyMutationInputObjectSchema,
  where: ExerciseWhereInputObjectSchema.optional(),
})
