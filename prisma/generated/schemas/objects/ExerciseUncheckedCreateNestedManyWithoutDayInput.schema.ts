import { z } from 'zod'
import { ExerciseCreateWithoutDayInputObjectSchema } from './ExerciseCreateWithoutDayInput.schema'
import { ExerciseUncheckedCreateWithoutDayInputObjectSchema } from './ExerciseUncheckedCreateWithoutDayInput.schema'
import { ExerciseCreateOrConnectWithoutDayInputObjectSchema } from './ExerciseCreateOrConnectWithoutDayInput.schema'
import { ExerciseCreateManyDayInputEnvelopeObjectSchema } from './ExerciseCreateManyDayInputEnvelope.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUncheckedCreateNestedManyWithoutDayInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ExerciseCreateWithoutDayInputObjectSchema),
          z.lazy(() => ExerciseCreateWithoutDayInputObjectSchema).array(),
          z.lazy(() => ExerciseUncheckedCreateWithoutDayInputObjectSchema),
          z
            .lazy(() => ExerciseUncheckedCreateWithoutDayInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ExerciseCreateOrConnectWithoutDayInputObjectSchema),
          z
            .lazy(() => ExerciseCreateOrConnectWithoutDayInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExerciseCreateManyDayInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ExerciseUncheckedCreateNestedManyWithoutDayInputObjectSchema =
  Schema
