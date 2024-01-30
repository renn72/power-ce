import { z } from 'zod'
import { SetWhereUniqueInputObjectSchema } from './SetWhereUniqueInput.schema'
import { SetUpdateWithoutExerciseInputObjectSchema } from './SetUpdateWithoutExerciseInput.schema'
import { SetUncheckedUpdateWithoutExerciseInputObjectSchema } from './SetUncheckedUpdateWithoutExerciseInput.schema'
import { SetCreateWithoutExerciseInputObjectSchema } from './SetCreateWithoutExerciseInput.schema'
import { SetUncheckedCreateWithoutExerciseInputObjectSchema } from './SetUncheckedCreateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetUpsertWithWhereUniqueWithoutExerciseInput> = z
  .object({
    where: z.lazy(() => SetWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => SetUpdateWithoutExerciseInputObjectSchema),
      z.lazy(() => SetUncheckedUpdateWithoutExerciseInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => SetCreateWithoutExerciseInputObjectSchema),
      z.lazy(() => SetUncheckedCreateWithoutExerciseInputObjectSchema),
    ]),
  })
  .strict()

export const SetUpsertWithWhereUniqueWithoutExerciseInputObjectSchema = Schema
