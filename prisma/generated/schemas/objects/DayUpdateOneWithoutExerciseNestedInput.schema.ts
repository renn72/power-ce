import { z } from 'zod'
import { DayCreateWithoutExerciseInputObjectSchema } from './DayCreateWithoutExerciseInput.schema'
import { DayUncheckedCreateWithoutExerciseInputObjectSchema } from './DayUncheckedCreateWithoutExerciseInput.schema'
import { DayCreateOrConnectWithoutExerciseInputObjectSchema } from './DayCreateOrConnectWithoutExerciseInput.schema'
import { DayUpsertWithoutExerciseInputObjectSchema } from './DayUpsertWithoutExerciseInput.schema'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'
import { DayUpdateWithoutExerciseInputObjectSchema } from './DayUpdateWithoutExerciseInput.schema'
import { DayUncheckedUpdateWithoutExerciseInputObjectSchema } from './DayUncheckedUpdateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUpdateOneWithoutExerciseNestedInput> = z
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
    upsert: z.lazy(() => DayUpsertWithoutExerciseInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => DayWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => DayUpdateWithoutExerciseInputObjectSchema),
        z.lazy(() => DayUncheckedUpdateWithoutExerciseInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const DayUpdateOneWithoutExerciseNestedInputObjectSchema = Schema
