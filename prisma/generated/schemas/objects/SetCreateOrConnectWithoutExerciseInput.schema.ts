import { z } from 'zod'
import { SetWhereUniqueInputObjectSchema } from './SetWhereUniqueInput.schema'
import { SetCreateWithoutExerciseInputObjectSchema } from './SetCreateWithoutExerciseInput.schema'
import { SetUncheckedCreateWithoutExerciseInputObjectSchema } from './SetUncheckedCreateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetCreateOrConnectWithoutExerciseInput> = z
  .object({
    where: z.lazy(() => SetWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => SetCreateWithoutExerciseInputObjectSchema),
      z.lazy(() => SetUncheckedCreateWithoutExerciseInputObjectSchema),
    ]),
  })
  .strict()

export const SetCreateOrConnectWithoutExerciseInputObjectSchema = Schema
