import { z } from 'zod'
import { BlockWhereUniqueInputObjectSchema } from './BlockWhereUniqueInput.schema'
import { BlockCreateWithoutWeekInputObjectSchema } from './BlockCreateWithoutWeekInput.schema'
import { BlockUncheckedCreateWithoutWeekInputObjectSchema } from './BlockUncheckedCreateWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockCreateOrConnectWithoutWeekInput> = z
  .object({
    where: z.lazy(() => BlockWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => BlockCreateWithoutWeekInputObjectSchema),
      z.lazy(() => BlockUncheckedCreateWithoutWeekInputObjectSchema),
    ]),
  })
  .strict()

export const BlockCreateOrConnectWithoutWeekInputObjectSchema = Schema
