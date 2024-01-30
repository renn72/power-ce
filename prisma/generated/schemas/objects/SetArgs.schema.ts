import { z } from 'zod'
import { SetIncludeObjectSchema } from './SetInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetArgs> = z
  .object({
    include: z.lazy(() => SetIncludeObjectSchema).optional(),
  })
  .strict()

export const SetArgsObjectSchema = Schema
