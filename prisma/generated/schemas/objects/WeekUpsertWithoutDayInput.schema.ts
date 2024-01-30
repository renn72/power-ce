import { z } from 'zod'
import { WeekUpdateWithoutDayInputObjectSchema } from './WeekUpdateWithoutDayInput.schema'
import { WeekUncheckedUpdateWithoutDayInputObjectSchema } from './WeekUncheckedUpdateWithoutDayInput.schema'
import { WeekCreateWithoutDayInputObjectSchema } from './WeekCreateWithoutDayInput.schema'
import { WeekUncheckedCreateWithoutDayInputObjectSchema } from './WeekUncheckedCreateWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUpsertWithoutDayInput> = z
  .object({
    update: z.union([
      z.lazy(() => WeekUpdateWithoutDayInputObjectSchema),
      z.lazy(() => WeekUncheckedUpdateWithoutDayInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => WeekCreateWithoutDayInputObjectSchema),
      z.lazy(() => WeekUncheckedCreateWithoutDayInputObjectSchema),
    ]),
  })
  .strict()

export const WeekUpsertWithoutDayInputObjectSchema = Schema
