import { z } from 'zod'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'
import { WeekCreateWithoutDayInputObjectSchema } from './WeekCreateWithoutDayInput.schema'
import { WeekUncheckedCreateWithoutDayInputObjectSchema } from './WeekUncheckedCreateWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekCreateOrConnectWithoutDayInput> = z
  .object({
    where: z.lazy(() => WeekWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => WeekCreateWithoutDayInputObjectSchema),
      z.lazy(() => WeekUncheckedCreateWithoutDayInputObjectSchema),
    ]),
  })
  .strict()

export const WeekCreateOrConnectWithoutDayInputObjectSchema = Schema
