import { z } from 'zod'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseUpdateWithoutDayInputObjectSchema } from './ExerciseUpdateWithoutDayInput.schema'
import { ExerciseUncheckedUpdateWithoutDayInputObjectSchema } from './ExerciseUncheckedUpdateWithoutDayInput.schema'
import { ExerciseCreateWithoutDayInputObjectSchema } from './ExerciseCreateWithoutDayInput.schema'
import { ExerciseUncheckedCreateWithoutDayInputObjectSchema } from './ExerciseUncheckedCreateWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUpsertWithWhereUniqueWithoutDayInput> = z
  .object({
    where: z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ExerciseUpdateWithoutDayInputObjectSchema),
      z.lazy(() => ExerciseUncheckedUpdateWithoutDayInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ExerciseCreateWithoutDayInputObjectSchema),
      z.lazy(() => ExerciseUncheckedCreateWithoutDayInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseUpsertWithWhereUniqueWithoutDayInputObjectSchema = Schema
