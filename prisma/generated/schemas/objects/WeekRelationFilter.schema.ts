import { z } from 'zod'
import { WeekWhereInputObjectSchema } from './WeekWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekRelationFilter> = z
  .object({
    is: z
      .lazy(() => WeekWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => WeekWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const WeekRelationFilterObjectSchema = Schema
