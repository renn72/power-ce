import { z } from 'zod'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseUpdateWithoutDayInputObjectSchema } from './ExerciseUpdateWithoutDayInput.schema'
import { ExerciseUncheckedUpdateWithoutDayInputObjectSchema } from './ExerciseUncheckedUpdateWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUpdateWithWhereUniqueWithoutDayInput> = z
  .object({
    where: z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ExerciseUpdateWithoutDayInputObjectSchema),
      z.lazy(() => ExerciseUncheckedUpdateWithoutDayInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseUpdateWithWhereUniqueWithoutDayInputObjectSchema = Schema
