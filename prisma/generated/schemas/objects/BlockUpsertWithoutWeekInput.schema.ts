import { z } from 'zod'
import { BlockUpdateWithoutWeekInputObjectSchema } from './BlockUpdateWithoutWeekInput.schema'
import { BlockUncheckedUpdateWithoutWeekInputObjectSchema } from './BlockUncheckedUpdateWithoutWeekInput.schema'
import { BlockCreateWithoutWeekInputObjectSchema } from './BlockCreateWithoutWeekInput.schema'
import { BlockUncheckedCreateWithoutWeekInputObjectSchema } from './BlockUncheckedCreateWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockUpsertWithoutWeekInput> = z
  .object({
    update: z.union([
      z.lazy(() => BlockUpdateWithoutWeekInputObjectSchema),
      z.lazy(() => BlockUncheckedUpdateWithoutWeekInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => BlockCreateWithoutWeekInputObjectSchema),
      z.lazy(() => BlockUncheckedCreateWithoutWeekInputObjectSchema),
    ]),
  })
  .strict()

export const BlockUpsertWithoutWeekInputObjectSchema = Schema
