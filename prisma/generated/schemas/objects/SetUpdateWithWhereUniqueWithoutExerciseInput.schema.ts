import { z } from 'zod'
import { SetWhereUniqueInputObjectSchema } from './SetWhereUniqueInput.schema'
import { SetUpdateWithoutExerciseInputObjectSchema } from './SetUpdateWithoutExerciseInput.schema'
import { SetUncheckedUpdateWithoutExerciseInputObjectSchema } from './SetUncheckedUpdateWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetUpdateWithWhereUniqueWithoutExerciseInput> = z
  .object({
    where: z.lazy(() => SetWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => SetUpdateWithoutExerciseInputObjectSchema),
      z.lazy(() => SetUncheckedUpdateWithoutExerciseInputObjectSchema),
    ]),
  })
  .strict()

export const SetUpdateWithWhereUniqueWithoutExerciseInputObjectSchema = Schema
