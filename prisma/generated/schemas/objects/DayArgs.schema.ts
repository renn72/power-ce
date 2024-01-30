import { z } from 'zod'
import { DayIncludeObjectSchema } from './DayInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayArgs> = z
  .object({
    include: z.lazy(() => DayIncludeObjectSchema).optional(),
  })
  .strict()

export const DayArgsObjectSchema = Schema
