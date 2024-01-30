import { z } from 'zod'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseCreateWithoutSetInputObjectSchema } from './ExerciseCreateWithoutSetInput.schema'
import { ExerciseUncheckedCreateWithoutSetInputObjectSchema } from './ExerciseUncheckedCreateWithoutSetInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutSetInput> = z
  .object({
    where: z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ExerciseCreateWithoutSetInputObjectSchema),
      z.lazy(() => ExerciseUncheckedCreateWithoutSetInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseCreateOrConnectWithoutSetInputObjectSchema = Schema
