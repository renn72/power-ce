import { z } from 'zod'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseCreateWithoutSsInputObjectSchema } from './ExerciseCreateWithoutSsInput.schema'
import { ExerciseUncheckedCreateWithoutSsInputObjectSchema } from './ExerciseUncheckedCreateWithoutSsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutSsInput> = z
  .object({
    where: z.lazy(() => ExerciseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ExerciseCreateWithoutSsInputObjectSchema),
      z.lazy(() => ExerciseUncheckedCreateWithoutSsInputObjectSchema),
    ]),
  })
  .strict()

export const ExerciseCreateOrConnectWithoutSsInputObjectSchema = Schema
