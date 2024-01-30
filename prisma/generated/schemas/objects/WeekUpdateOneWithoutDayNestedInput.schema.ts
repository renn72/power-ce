import { z } from 'zod'
import { WeekCreateWithoutDayInputObjectSchema } from './WeekCreateWithoutDayInput.schema'
import { WeekUncheckedCreateWithoutDayInputObjectSchema } from './WeekUncheckedCreateWithoutDayInput.schema'
import { WeekCreateOrConnectWithoutDayInputObjectSchema } from './WeekCreateOrConnectWithoutDayInput.schema'
import { WeekUpsertWithoutDayInputObjectSchema } from './WeekUpsertWithoutDayInput.schema'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'
import { WeekUpdateWithoutDayInputObjectSchema } from './WeekUpdateWithoutDayInput.schema'
import { WeekUncheckedUpdateWithoutDayInputObjectSchema } from './WeekUncheckedUpdateWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUpdateOneWithoutDayNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => WeekCreateWithoutDayInputObjectSchema),
        z.lazy(() => WeekUncheckedCreateWithoutDayInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => WeekCreateOrConnectWithoutDayInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => WeekUpsertWithoutDayInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => WeekWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => WeekUpdateWithoutDayInputObjectSchema),
        z.lazy(() => WeekUncheckedUpdateWithoutDayInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const WeekUpdateOneWithoutDayNestedInputObjectSchema = Schema
