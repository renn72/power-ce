import { z } from 'zod'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'
import { DayCreateWithoutWeekInputObjectSchema } from './DayCreateWithoutWeekInput.schema'
import { DayUncheckedCreateWithoutWeekInputObjectSchema } from './DayUncheckedCreateWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayCreateOrConnectWithoutWeekInput> = z
  .object({
    where: z.lazy(() => DayWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DayCreateWithoutWeekInputObjectSchema),
      z.lazy(() => DayUncheckedCreateWithoutWeekInputObjectSchema),
    ]),
  })
  .strict()

export const DayCreateOrConnectWithoutWeekInputObjectSchema = Schema
