import { z } from 'zod'
import { WeekWhereInputObjectSchema } from './WeekWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekListRelationFilter> = z
  .object({
    every: z.lazy(() => WeekWhereInputObjectSchema).optional(),
    some: z.lazy(() => WeekWhereInputObjectSchema).optional(),
    none: z.lazy(() => WeekWhereInputObjectSchema).optional(),
  })
  .strict()

export const WeekListRelationFilterObjectSchema = Schema
