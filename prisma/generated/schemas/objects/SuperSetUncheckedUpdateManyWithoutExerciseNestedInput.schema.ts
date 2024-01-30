import { z } from 'zod'
import { SuperSetCreateWithoutExerciseInputObjectSchema } from './SuperSetCreateWithoutExerciseInput.schema'
import { SuperSetUncheckedCreateWithoutExerciseInputObjectSchema } from './SuperSetUncheckedCreateWithoutExerciseInput.schema'
import { SuperSetCreateOrConnectWithoutExerciseInputObjectSchema } from './SuperSetCreateOrConnectWithoutExerciseInput.schema'
import { SuperSetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema } from './SuperSetUpsertWithWhereUniqueWithoutExerciseInput.schema'
import { SuperSetCreateManyExerciseInputEnvelopeObjectSchema } from './SuperSetCreateManyExerciseInputEnvelope.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './SuperSetWhereUniqueInput.schema'
import { SuperSetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema } from './SuperSetUpdateWithWhereUniqueWithoutExerciseInput.schema'
import { SuperSetUpdateManyWithWhereWithoutExerciseInputObjectSchema } from './SuperSetUpdateManyWithWhereWithoutExerciseInput.schema'
import { SuperSetScalarWhereInputObjectSchema } from './SuperSetScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetUncheckedUpdateManyWithoutExerciseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SuperSetCreateWithoutExerciseInputObjectSchema),
          z.lazy(() => SuperSetCreateWithoutExerciseInputObjectSchema).array(),
          z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputObjectSchema),
          z
            .lazy(() => SuperSetUncheckedCreateWithoutExerciseInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SuperSetCreateOrConnectWithoutExerciseInputObjectSchema),
          z
            .lazy(() => SuperSetCreateOrConnectWithoutExerciseInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => SuperSetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                SuperSetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SuperSetCreateManyExerciseInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
          z.lazy(() => SuperSetWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => SuperSetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                SuperSetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => SuperSetUpdateManyWithWhereWithoutExerciseInputObjectSchema,
          ),
          z
            .lazy(
              () => SuperSetUpdateManyWithWhereWithoutExerciseInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SuperSetScalarWhereInputObjectSchema),
          z.lazy(() => SuperSetScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const SuperSetUncheckedUpdateManyWithoutExerciseNestedInputObjectSchema =
  Schema
