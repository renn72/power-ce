import { z } from 'zod'
import { DayFindManySchema } from '../findManyDay.schema'
import { BlockArgsObjectSchema } from './BlockArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekInclude> = z
  .object({
    day: z.union([z.boolean(), z.lazy(() => DayFindManySchema)]).optional(),
    block: z
      .union([z.boolean(), z.lazy(() => BlockArgsObjectSchema)])
      .optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const WeekIncludeObjectSchema = Schema
