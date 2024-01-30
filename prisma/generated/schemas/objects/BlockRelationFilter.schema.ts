import { z } from 'zod'
import { BlockWhereInputObjectSchema } from './BlockWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockRelationFilter> = z
  .object({
    is: z
      .lazy(() => BlockWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => BlockWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const BlockRelationFilterObjectSchema = Schema
