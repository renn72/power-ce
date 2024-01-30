import { z } from 'zod'
import { ExerciseUpdateWithoutSsInputObjectSchema } from './ExerciseUpdateWithoutSsInput.schema'
import { ExerciseUncheckedUpdateWithoutSsInputObjectSchema } from './ExerciseUncheckedUpdateWithoutSsInput.schema'
import { ExerciseCreateWithoutSsInputObjectSchema } from './ExerciseCreateWithoutSsInput.schema'
import { ExerciseUncheckedCreateWithoutSsInputObjectSchema } from './ExerciseUncheckedCreateWithoutSsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUpsertWithoutSsInput> = z
  .object({
    update: z.union([
      z.lazy(() => ExerciseUpdateWithoutSsInputObjectSchema),
      z.lazy(() => ExerciseUncheckedUpdateWithoutSsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ExerciseCreateWithoutSsInputObjectSchema),
      z.lazy(() => ExerciseUncheckedCreateWithoutSsInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseUpsertWithoutSsInputObjectSchema = Schema
