import { z } from 'zod'
import { SetCreateWithoutExerciseInputObjectSchema } from './SetCreateWithoutExerciseInput.schema'
import { SetUncheckedCreateWithoutExerciseInputObjectSchema } from './SetUncheckedCreateWithoutExerciseInput.schema'
import { SetCreateOrConnectWithoutExerciseInputObjectSchema } from './SetCreateOrConnectWithoutExerciseInput.schema'
import { SetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema } from './SetUpsertWithWhereUniqueWithoutExerciseInput.schema'
import { SetCreateManyExerciseInputEnvelopeObjectSchema } from './SetCreateManyExerciseInputEnvelope.schema'
import { SetWhereUniqueInputObjectSchema } from './SetWhereUniqueInput.schema'
import { SetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema } from './SetUpdateWithWhereUniqueWithoutExerciseInput.schema'
import { SetUpdateManyWithWhereWithoutExerciseInputObjectSchema } from './SetUpdateManyWithWhereWithoutExerciseInput.schema'
import { SetScalarWhereInputObjectSchema } from './SetScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetUpdateManyWithoutExerciseNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => SetCreateWithoutExerciseInputObjectSchema),
        z.lazy(() => SetCreateWithoutExerciseInputObjectSchema).array(),
        z.lazy(() => SetUncheckedCreateWithoutExerciseInputObjectSchema),
        z
          .lazy(() => SetUncheckedCreateWithoutExerciseInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SetCreateOrConnectWithoutExerciseInputObjectSchema),
        z
          .lazy(() => SetCreateOrConnectWithoutExerciseInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => SetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema),
        z
          .lazy(() => SetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SetCreateManyExerciseInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => SetWhereUniqueInputObjectSchema),
        z.lazy(() => SetWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => SetWhereUniqueInputObjectSchema),
        z.lazy(() => SetWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => SetWhereUniqueInputObjectSchema),
        z.lazy(() => SetWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => SetWhereUniqueInputObjectSchema),
        z.lazy(() => SetWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => SetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema),
        z
          .lazy(() => SetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => SetUpdateManyWithWhereWithoutExerciseInputObjectSchema),
        z
          .lazy(() => SetUpdateManyWithWhereWithoutExerciseInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => SetScalarWhereInputObjectSchema),
        z.lazy(() => SetScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const SetUpdateManyWithoutExerciseNestedInputObjectSchema = Schema
