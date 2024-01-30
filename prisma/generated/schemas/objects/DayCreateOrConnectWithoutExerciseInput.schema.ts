import { z } from 'zod'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'
import { DayCreateWithoutExerciseInputObjectSchema } from './DayCreateWithoutExerciseInput.schema'
import { DayUncheckedCreateWithoutExerciseInputObjectSchema } from './DayUncheckedCreateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayCreateOrConnectWithoutExerciseInput> = z
  .object({
    where: z.lazy(() => DayWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DayCreateWithoutExerciseInputObjectSchema),
      z.lazy(() => DayUncheckedCreateWithoutExerciseInputObjectSchema),
    ]),
  })
  .strict()

export const DayCreateOrConnectWithoutExerciseInputObjectSchema = Schema
