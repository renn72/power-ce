import { z } from 'zod'
import { DayUpdateWithoutExerciseInputObjectSchema } from './DayUpdateWithoutExerciseInput.schema'
import { DayUncheckedUpdateWithoutExerciseInputObjectSchema } from './DayUncheckedUpdateWithoutExerciseInput.schema'
import { DayCreateWithoutExerciseInputObjectSchema } from './DayCreateWithoutExerciseInput.schema'
import { DayUncheckedCreateWithoutExerciseInputObjectSchema } from './DayUncheckedCreateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUpsertWithoutExerciseInput> = z
  .object({
    update: z.union([
      z.lazy(() => DayUpdateWithoutExerciseInputObjectSchema),
      z.lazy(() => DayUncheckedUpdateWithoutExerciseInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DayCreateWithoutExerciseInputObjectSchema),
      z.lazy(() => DayUncheckedCreateWithoutExerciseInputObjectSchema),
    ]),
  })
  .strict()

export const DayUpsertWithoutExerciseInputObjectSchema = Schema
