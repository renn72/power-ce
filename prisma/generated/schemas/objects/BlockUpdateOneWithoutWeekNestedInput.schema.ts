import { z } from 'zod'
import { BlockCreateWithoutWeekInputObjectSchema } from './BlockCreateWithoutWeekInput.schema'
import { BlockUncheckedCreateWithoutWeekInputObjectSchema } from './BlockUncheckedCreateWithoutWeekInput.schema'
import { BlockCreateOrConnectWithoutWeekInputObjectSchema } from './BlockCreateOrConnectWithoutWeekInput.schema'
import { BlockUpsertWithoutWeekInputObjectSchema } from './BlockUpsertWithoutWeekInput.schema'
import { BlockWhereUniqueInputObjectSchema } from './BlockWhereUniqueInput.schema'
import { BlockUpdateWithoutWeekInputObjectSchema } from './BlockUpdateWithoutWeekInput.schema'
import { BlockUncheckedUpdateWithoutWeekInputObjectSchema } from './BlockUncheckedUpdateWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockUpdateOneWithoutWeekNestedInput> = z
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
    upsert: z.lazy(() => BlockUpsertWithoutWeekInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => BlockWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => BlockUpdateWithoutWeekInputObjectSchema),
        z.lazy(() => BlockUncheckedUpdateWithoutWeekInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const BlockUpdateOneWithoutWeekNestedInputObjectSchema = Schema
