import { z } from 'zod'
import { DayWhereInputObjectSchema } from './DayWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayRelationFilter> = z
  .object({
    is: z
      .lazy(() => DayWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => DayWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const DayRelationFilterObjectSchema = Schema
