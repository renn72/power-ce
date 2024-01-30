import { z } from 'zod'
import { DayCreateWithoutExerciseInputObjectSchema } from './DayCreateWithoutExerciseInput.schema'
import { DayUncheckedCreateWithoutExerciseInputObjectSchema } from './DayUncheckedCreateWithoutExerciseInput.schema'
import { DayCreateOrConnectWithoutExerciseInputObjectSchema } from './DayCreateOrConnectWithoutExerciseInput.schema'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayCreateNestedOneWithoutExerciseInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DayCreateWithoutExerciseInputObjectSchema),
        z.lazy(() => DayUncheckedCreateWithoutExerciseInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DayCreateOrConnectWithoutExerciseInputObjectSchema)
      .optional(),
    connect: z.lazy(() => DayWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const DayCreateNestedOneWithoutExerciseInputObjectSchema = Schema
