import { z } from 'zod'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'
import { WeekUpdateWithoutBlockInputObjectSchema } from './WeekUpdateWithoutBlockInput.schema'
import { WeekUncheckedUpdateWithoutBlockInputObjectSchema } from './WeekUncheckedUpdateWithoutBlockInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUpdateWithWhereUniqueWithoutBlockInput> = z
  .object({
    where: z.lazy(() => WeekWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => WeekUpdateWithoutBlockInputObjectSchema),
      z.lazy(() => WeekUncheckedUpdateWithoutBlockInputObjectSchema),
    ]),
  })
  .strict()

export const WeekUpdateWithWhereUniqueWithoutBlockInputObjectSchema = Schema
