import { z } from 'zod'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'
import { DayUpdateWithoutWeekInputObjectSchema } from './DayUpdateWithoutWeekInput.schema'
import { DayUncheckedUpdateWithoutWeekInputObjectSchema } from './DayUncheckedUpdateWithoutWeekInput.schema'
import { DayCreateWithoutWeekInputObjectSchema } from './DayCreateWithoutWeekInput.schema'
import { DayUncheckedCreateWithoutWeekInputObjectSchema } from './DayUncheckedCreateWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUpsertWithWhereUniqueWithoutWeekInput> = z
  .object({
    where: z.lazy(() => DayWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => DayUpdateWithoutWeekInputObjectSchema),
      z.lazy(() => DayUncheckedUpdateWithoutWeekInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DayCreateWithoutWeekInputObjectSchema),
      z.lazy(() => DayUncheckedCreateWithoutWeekInputObjectSchema),
    ]),
  })
  .strict()

export const DayUpsertWithWhereUniqueWithoutWeekInputObjectSchema = Schema
