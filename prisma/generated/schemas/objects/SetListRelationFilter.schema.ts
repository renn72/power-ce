import { z } from 'zod'
import { SetWhereInputObjectSchema } from './SetWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetListRelationFilter> = z
  .object({
    every: z.lazy(() => SetWhereInputObjectSchema).optional(),
    some: z.lazy(() => SetWhereInputObjectSchema).optional(),
    none: z.lazy(() => SetWhereInputObjectSchema).optional(),
  })
  .strict()

export const SetListRelationFilterObjectSchema = Schema
