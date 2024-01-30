import { z } from 'zod'
import { BlockIncludeObjectSchema } from './BlockInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockArgs> = z
  .object({
    include: z.lazy(() => BlockIncludeObjectSchema).optional(),
  })
  .strict()

export const BlockArgsObjectSchema = Schema
