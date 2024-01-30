import { z } from 'zod'
import { SuperSetWhereUniqueInputObjectSchema } from './SuperSetWhereUniqueInput.schema'
import { SuperSetUpdateWithoutExerciseInputObjectSchema } from './SuperSetUpdateWithoutExerciseInput.schema'
import { SuperSetUncheckedUpdateWithoutExerciseInputObjectSchema } from './SuperSetUncheckedUpdateWithoutExerciseInput.schema'
import { SuperSetCreateWithoutExerciseInputObjectSchema } from './SuperSetCreateWithoutExerciseInput.schema'
import { SuperSetUncheckedCreateWithoutExerciseInputObjectSchema } from './SuperSetUncheckedCreateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetUpsertWithWhereUniqueWithoutExerciseInput> =
  z
    .object({
      where: z.lazy(() => SuperSetWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => SuperSetUpdateWithoutExerciseInputObjectSchema),
        z.lazy(() => SuperSetUncheckedUpdateWithoutExerciseInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => SuperSetCreateWithoutExerciseInputObjectSchema),
        z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputObjectSchema),
      ]),
    })
    .strict()

export const SuperSetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema =
  Schema
