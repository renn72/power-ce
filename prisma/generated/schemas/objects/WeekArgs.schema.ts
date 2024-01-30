import { z } from 'zod'
import { WeekIncludeObjectSchema } from './WeekInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekArgs> = z
  .object({
    include: z.lazy(() => WeekIncludeObjectSchema).optional(),
  })
  .strict()

export const WeekArgsObjectSchema = Schema
