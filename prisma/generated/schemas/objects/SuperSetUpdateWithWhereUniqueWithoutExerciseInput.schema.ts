import { z } from 'zod'
import { SuperSetWhereUniqueInputObjectSchema } from './SuperSetWhereUniqueInput.schema'
import { SuperSetUpdateWithoutExerciseInputObjectSchema } from './SuperSetUpdateWithoutExerciseInput.schema'
import { SuperSetUncheckedUpdateWithoutExerciseInputObjectSchema } from './SuperSetUncheckedUpdateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetUpdateWithWhereUniqueWithoutExerciseInput> =
  z
    .object({
      where: z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => SuperSetUpdateWithoutExerciseInputObjectSchema),
        z.lazy(() => SuperSetUncheckedUpdateWithoutExerciseInputObjectSchema),
      ]),
    })
    .strict()

export const SuperSetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema =
  Schema
