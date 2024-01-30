import { z } from 'zod'
import { SetCreateWithoutExerciseInputObjectSchema } from './SetCreateWithoutExerciseInput.schema'
import { SetUncheckedCreateWithoutExerciseInputObjectSchema } from './SetUncheckedCreateWithoutExerciseInput.schema'
import { SetCreateOrConnectWithoutExerciseInputObjectSchema } from './SetCreateOrConnectWithoutExerciseInput.schema'
import { SetCreateManyExerciseInputEnvelopeObjectSchema } from './SetCreateManyExerciseInputEnvelope.schema'
import { SetWhereUniqueInputObjectSchema } from './SetWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetUncheckedCreateNestedManyWithoutExerciseInput> =
  z
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
      createMany: z
        .lazy(() => SetCreateManyExerciseInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SetWhereUniqueInputObjectSchema),
          z.lazy(() => SetWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const SetUncheckedCreateNestedManyWithoutExerciseInputObjectSchema =
  Schema
