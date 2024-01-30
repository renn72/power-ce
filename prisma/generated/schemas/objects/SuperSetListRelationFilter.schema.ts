import { z } from 'zod'
import { SuperSetWhereInputObjectSchema } from './SuperSetWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetListRelationFilter> = z
  .object({
    every: z.lazy(() => SuperSetWhereInputObjectSchema).optional(),
    some: z.lazy(() => SuperSetWhereInputObjectSchema).optional(),
    none: z.lazy(() => SuperSetWhereInputObjectSchema).optional(),
  })
  .strict()

export const SuperSetListRelationFilterObjectSchema = Schema
