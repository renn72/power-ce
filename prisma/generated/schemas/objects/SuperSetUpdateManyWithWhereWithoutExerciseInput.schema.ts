import { z } from 'zod'
import { SuperSetScalarWhereInputObjectSchema } from './SuperSetScalarWhereInput.schema'
import { SuperSetUpdateManyMutationInputObjectSchema } from './SuperSetUpdateManyMutationInput.schema'
import { SuperSetUncheckedUpdateManyWithoutSsInputObjectSchema } from './SuperSetUncheckedUpdateManyWithoutSsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetUpdateManyWithWhereWithoutExerciseInput> =
  z
    .object({
      where: z.lazy(() => SuperSetScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => SuperSetUpdateManyMutationInputObjectSchema),
        z.lazy(() => SuperSetUncheckedUpdateManyWithoutSsInputObjectSchema),
      ]),
    })
    .strict()

export const SuperSetUpdateManyWithWhereWithoutExerciseInputObjectSchema =
  Schema
