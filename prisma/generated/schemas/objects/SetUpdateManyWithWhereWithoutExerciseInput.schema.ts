import { z } from 'zod'
import { SetScalarWhereInputObjectSchema } from './SetScalarWhereInput.schema'
import { SetUpdateManyMutationInputObjectSchema } from './SetUpdateManyMutationInput.schema'
import { SetUncheckedUpdateManyWithoutSetInputObjectSchema } from './SetUncheckedUpdateManyWithoutSetInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetUpdateManyWithWhereWithoutExerciseInput> = z
  .object({
    where: z.lazy(() => SetScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => SetUpdateManyMutationInputObjectSchema),
      z.lazy(() => SetUncheckedUpdateManyWithoutSetInputObjectSchema),
    ]),
  })
  .strict()

export const SetUpdateManyWithWhereWithoutExerciseInputObjectSchema = Schema
