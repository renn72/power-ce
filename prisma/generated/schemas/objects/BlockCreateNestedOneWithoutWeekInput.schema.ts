import { z } from 'zod'
import { BlockCreateWithoutWeekInputObjectSchema } from './BlockCreateWithoutWeekInput.schema'
import { BlockUncheckedCreateWithoutWeekInputObjectSchema } from './BlockUncheckedCreateWithoutWeekInput.schema'
import { BlockCreateOrConnectWithoutWeekInputObjectSchema } from './BlockCreateOrConnectWithoutWeekInput.schema'
import { BlockWhereUniqueInputObjectSchema } from './BlockWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockCreateNestedOneWithoutWeekInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => BlockCreateWithoutWeekInputObjectSchema),
        z.lazy(() => BlockUncheckedCreateWithoutWeekInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => BlockCreateOrConnectWithoutWeekInputObjectSchema)
      .optional(),
    connect: z.lazy(() => BlockWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const BlockCreateNestedOneWithoutWeekInputObjectSchema = Schema
