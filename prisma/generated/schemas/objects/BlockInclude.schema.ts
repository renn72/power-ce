import { z } from 'zod'
import { WeekFindManySchema } from '../findManyWeek.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockInclude> = z
  .object({
    week: z.union([z.boolean(), z.lazy(() => WeekFindManySchema)]).optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const BlockIncludeObjectSchema = Schema
