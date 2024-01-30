import { z } from 'zod'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'
import { WeekUpdateWithoutBlockInputObjectSchema } from './WeekUpdateWithoutBlockInput.schema'
import { WeekUncheckedUpdateWithoutBlockInputObjectSchema } from './WeekUncheckedUpdateWithoutBlockInput.schema'
import { WeekCreateWithoutBlockInputObjectSchema } from './WeekCreateWithoutBlockInput.schema'
import { WeekUncheckedCreateWithoutBlockInputObjectSchema } from './WeekUncheckedCreateWithoutBlockInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUpsertWithWhereUniqueWithoutBlockInput> = z
  .object({
    where: z.lazy(() => WeekWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => WeekUpdateWithoutBlockInputObjectSchema),
      z.lazy(() => WeekUncheckedUpdateWithoutBlockInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => WeekCreateWithoutBlockInputObjectSchema),
      z.lazy(() => WeekUncheckedCreateWithoutBlockInputObjectSchema),
    ]),
  })
  .strict()

export const WeekUpsertWithWhereUniqueWithoutBlockInputObjectSchema = Schema
