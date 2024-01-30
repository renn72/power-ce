import { z } from 'zod'
import { ExerciseCreateWithoutSetInputObjectSchema } from './ExerciseCreateWithoutSetInput.schema'
import { ExerciseUncheckedCreateWithoutSetInputObjectSchema } from './ExerciseUncheckedCreateWithoutSetInput.schema'
import { ExerciseCreateOrConnectWithoutSetInputObjectSchema } from './ExerciseCreateOrConnectWithoutSetInput.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutSetInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ExerciseCreateWithoutSetInputObjectSchema),
        z.lazy(() => ExerciseUncheckedCreateWithoutSetInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ExerciseCreateOrConnectWithoutSetInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ExerciseWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ExerciseCreateNestedOneWithoutSetInputObjectSchema = Schema
