import { z } from 'zod'
import { WeekCreateWithoutDayInputObjectSchema } from './WeekCreateWithoutDayInput.schema'
import { WeekUncheckedCreateWithoutDayInputObjectSchema } from './WeekUncheckedCreateWithoutDayInput.schema'
import { WeekCreateOrConnectWithoutDayInputObjectSchema } from './WeekCreateOrConnectWithoutDayInput.schema'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekCreateNestedOneWithoutDayInput> = z
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
    connect: z.lazy(() => WeekWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const WeekCreateNestedOneWithoutDayInputObjectSchema = Schema
