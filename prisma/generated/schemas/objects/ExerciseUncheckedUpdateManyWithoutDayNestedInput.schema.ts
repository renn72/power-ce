import { z } from 'zod'
import { ExerciseCreateWithoutDayInputObjectSchema } from './ExerciseCreateWithoutDayInput.schema'
import { ExerciseUncheckedCreateWithoutDayInputObjectSchema } from './ExerciseUncheckedCreateWithoutDayInput.schema'
import { ExerciseCreateOrConnectWithoutDayInputObjectSchema } from './ExerciseCreateOrConnectWithoutDayInput.schema'
import { ExerciseUpsertWithWhereUniqueWithoutDayInputObjectSchema } from './ExerciseUpsertWithWhereUniqueWithoutDayInput.schema'
import { ExerciseCreateManyDayInputEnvelopeObjectSchema } from './ExerciseCreateManyDayInputEnvelope.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseUpdateWithWhereUniqueWithoutDayInputObjectSchema } from './ExerciseUpdateWithWhereUniqueWithoutDayInput.schema'
import { ExerciseUpdateManyWithWhereWithoutDayInputObjectSchema } from './ExerciseUpdateManyWithWhereWithoutDayInput.schema'
import { ExerciseScalarWhereInputObjectSchema } from './ExerciseScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyWithoutDayNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () => ExerciseUpsertWithWhereUniqueWithoutDayInputObjectSchema,
          ),
          z
            .lazy(
              () => ExerciseUpsertWithWhereUniqueWithoutDayInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExerciseCreateManyDayInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
          z.lazy(() => ExerciseWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ExerciseUpdateWithWhereUniqueWithoutDayInputObjectSchema,
          ),
          z
            .lazy(
              () => ExerciseUpdateWithWhereUniqueWithoutDayInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ExerciseUpdateManyWithWhereWithoutDayInputObjectSchema),
          z
            .lazy(() => ExerciseUpdateManyWithWhereWithoutDayInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ExerciseScalarWhereInputObjectSchema),
          z.lazy(() => ExerciseScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ExerciseUncheckedUpdateManyWithoutDayNestedInputObjectSchema =
  Schema
