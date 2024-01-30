import { z } from 'zod'
import { ExerciseUpdateWithoutSetInputObjectSchema } from './ExerciseUpdateWithoutSetInput.schema'
import { ExerciseUncheckedUpdateWithoutSetInputObjectSchema } from './ExerciseUncheckedUpdateWithoutSetInput.schema'
import { ExerciseCreateWithoutSetInputObjectSchema } from './ExerciseCreateWithoutSetInput.schema'
import { ExerciseUncheckedCreateWithoutSetInputObjectSchema } from './ExerciseUncheckedCreateWithoutSetInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUpsertWithoutSetInput> = z
  .object({
    update: z.union([
      z.lazy(() => ExerciseUpdateWithoutSetInputObjectSchema),
      z.lazy(() => ExerciseUncheckedUpdateWithoutSetInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ExerciseCreateWithoutSetInputObjectSchema),
      z.lazy(() => ExerciseUncheckedCreateWithoutSetInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseUpsertWithoutSetInputObjectSchema = Schema
