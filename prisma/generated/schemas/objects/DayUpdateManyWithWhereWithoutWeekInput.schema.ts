import { z } from 'zod'
import { DayScalarWhereInputObjectSchema } from './DayScalarWhereInput.schema'
import { DayUpdateManyMutationInputObjectSchema } from './DayUpdateManyMutationInput.schema'
import { DayUncheckedUpdateManyWithoutDayInputObjectSchema } from './DayUncheckedUpdateManyWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUpdateManyWithWhereWithoutWeekInput> = z
  .object({
    where: z.lazy(() => DayScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => DayUpdateManyMutationInputObjectSchema),
      z.lazy(() => DayUncheckedUpdateManyWithoutDayInputObjectSchema),
    ]),
  })
  .strict()

export const DayUpdateManyWithWhereWithoutWeekInputObjectSchema = Schema
