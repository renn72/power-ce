import { z } from 'zod'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'
import { DayUpdateWithoutWeekInputObjectSchema } from './DayUpdateWithoutWeekInput.schema'
import { DayUncheckedUpdateWithoutWeekInputObjectSchema } from './DayUncheckedUpdateWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUpdateWithWhereUniqueWithoutWeekInput> = z
  .object({
    where: z.lazy(() => DayWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => DayUpdateWithoutWeekInputObjectSchema),
      z.lazy(() => DayUncheckedUpdateWithoutWeekInputObjectSchema),
    ]),
  })
  .strict()

export const DayUpdateWithWhereUniqueWithoutWeekInputObjectSchema = Schema
