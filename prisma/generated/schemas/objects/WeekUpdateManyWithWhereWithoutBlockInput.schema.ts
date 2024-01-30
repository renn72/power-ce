import { z } from 'zod'
import { WeekScalarWhereInputObjectSchema } from './WeekScalarWhereInput.schema'
import { WeekUpdateManyMutationInputObjectSchema } from './WeekUpdateManyMutationInput.schema'
import { WeekUncheckedUpdateManyWithoutWeekInputObjectSchema } from './WeekUncheckedUpdateManyWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUpdateManyWithWhereWithoutBlockInput> = z
  .object({
    where: z.lazy(() => WeekScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => WeekUpdateManyMutationInputObjectSchema),
      z.lazy(() => WeekUncheckedUpdateManyWithoutWeekInputObjectSchema),
    ]),
  })
  .strict()

export const WeekUpdateManyWithWhereWithoutBlockInputObjectSchema = Schema
