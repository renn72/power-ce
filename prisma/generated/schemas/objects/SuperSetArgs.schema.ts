import { z } from 'zod'
import { SuperSetIncludeObjectSchema } from './SuperSetInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetArgs> = z
  .object({
    include: z.lazy(() => SuperSetIncludeObjectSchema).optional(),
  })
  .strict()

export const SuperSetArgsObjectSchema = Schema
