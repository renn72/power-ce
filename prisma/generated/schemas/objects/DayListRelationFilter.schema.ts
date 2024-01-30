import { z } from 'zod'
import { DayWhereInputObjectSchema } from './DayWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayListRelationFilter> = z
  .object({
    every: z.lazy(() => DayWhereInputObjectSchema).optional(),
    some: z.lazy(() => DayWhereInputObjectSchema).optional(),
    none: z.lazy(() => DayWhereInputObjectSchema).optional(),
  })
  .strict()

export const DayListRelationFilterObjectSchema = Schema
