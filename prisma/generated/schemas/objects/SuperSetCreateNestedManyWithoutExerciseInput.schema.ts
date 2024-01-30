import { z } from 'zod'
import { SuperSetCreateWithoutExerciseInputObjectSchema } from './SuperSetCreateWithoutExerciseInput.schema'
import { SuperSetUncheckedCreateWithoutExerciseInputObjectSchema } from './SuperSetUncheckedCreateWithoutExerciseInput.schema'
import { SuperSetCreateOrConnectWithoutExerciseInputObjectSchema } from './SuperSetCreateOrConnectWithoutExerciseInput.schema'
import { SuperSetCreateManyExerciseInputEnvelopeObjectSchema } from './SuperSetCreateManyExerciseInputEnvelope.schema'
import { SuperSetWhereUniqueInputObjectSchema } from './SuperSetWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetCreateNestedManyWithoutExerciseInput> = z
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
    createMany: z
      .lazy(() => SuperSetCreateManyExerciseInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
        z.lazy(() => SuperSetWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const SuperSetCreateNestedManyWithoutExerciseInputObjectSchema = Schema
