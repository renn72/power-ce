import { z } from 'zod'
import { DayCreateManyWeekInputObjectSchema } from './DayCreateManyWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayCreateManyWeekInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => DayCreateManyWeekInputObjectSchema),
      z.lazy(() => DayCreateManyWeekInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const DayCreateManyWeekInputEnvelopeObjectSchema = Schema
