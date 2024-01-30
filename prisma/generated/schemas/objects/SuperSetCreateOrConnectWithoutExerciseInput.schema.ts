import { z } from 'zod'
import { SuperSetWhereUniqueInputObjectSchema } from './SuperSetWhereUniqueInput.schema'
import { SuperSetCreateWithoutExerciseInputObjectSchema } from './SuperSetCreateWithoutExerciseInput.schema'
import { SuperSetUncheckedCreateWithoutExerciseInputObjectSchema } from './SuperSetUncheckedCreateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetCreateOrConnectWithoutExerciseInput> = z
  .object({
    where: z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => SuperSetCreateWithoutExerciseInputObjectSchema),
      z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputObjectSchema),
    ]),
  })
  .strict()

export const SuperSetCreateOrConnectWithoutExerciseInputObjectSchema = Schema
