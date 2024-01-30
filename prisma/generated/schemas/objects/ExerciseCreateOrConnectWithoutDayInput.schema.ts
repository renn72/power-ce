import { z } from 'zod'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseCreateWithoutDayInputObjectSchema } from './ExerciseCreateWithoutDayInput.schema'
import { ExerciseUncheckedCreateWithoutDayInputObjectSchema } from './ExerciseUncheckedCreateWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutDayInput> = z
  .object({
    where: z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ExerciseCreateWithoutDayInputObjectSchema),
      z.lazy(() => ExerciseUncheckedCreateWithoutDayInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseCreateOrConnectWithoutDayInputObjectSchema = Schema
