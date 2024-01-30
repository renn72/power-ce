import { z } from 'zod'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'
import { WeekCreateWithoutBlockInputObjectSchema } from './WeekCreateWithoutBlockInput.schema'
import { WeekUncheckedCreateWithoutBlockInputObjectSchema } from './WeekUncheckedCreateWithoutBlockInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekCreateOrConnectWithoutBlockInput> = z
  .object({
    where: z.lazy(() => WeekWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => WeekCreateWithoutBlockInputObjectSchema),
      z.lazy(() => WeekUncheckedCreateWithoutBlockInputObjectSchema),
    ]),
  })
  .strict()

export const WeekCreateOrConnectWithoutBlockInputObjectSchema = Schema
