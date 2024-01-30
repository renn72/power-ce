import { z } from 'zod'
import { ExerciseCreateWithoutSsInputObjectSchema } from './ExerciseCreateWithoutSsInput.schema'
import { ExerciseUncheckedCreateWithoutSsInputObjectSchema } from './ExerciseUncheckedCreateWithoutSsInput.schema'
import { ExerciseCreateOrConnectWithoutSsInputObjectSchema } from './ExerciseCreateOrConnectWithoutSsInput.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutSsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ExerciseCreateWithoutSsInputObjectSchema),
        z.lazy(() => ExerciseUncheckedCreateWithoutSsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ExerciseCreateOrConnectWithoutSsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ExerciseWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ExerciseCreateNestedOneWithoutSsInputObjectSchema = Schema
