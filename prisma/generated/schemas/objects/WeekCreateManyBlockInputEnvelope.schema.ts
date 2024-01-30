import { z } from 'zod'
import { WeekCreateManyBlockInputObjectSchema } from './WeekCreateManyBlockInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekCreateManyBlockInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => WeekCreateManyBlockInputObjectSchema),
      z.lazy(() => WeekCreateManyBlockInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const WeekCreateManyBlockInputEnvelopeObjectSchema = Schema
