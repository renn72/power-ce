import { z } from 'zod'
import { DayCreateWithoutWeekInputObjectSchema } from './DayCreateWithoutWeekInput.schema'
import { DayUncheckedCreateWithoutWeekInputObjectSchema } from './DayUncheckedCreateWithoutWeekInput.schema'
import { DayCreateOrConnectWithoutWeekInputObjectSchema } from './DayCreateOrConnectWithoutWeekInput.schema'
import { DayCreateManyWeekInputEnvelopeObjectSchema } from './DayCreateManyWeekInputEnvelope.schema'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUncheckedCreateNestedManyWithoutWeekInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DayCreateWithoutWeekInputObjectSchema),
        z.lazy(() => DayCreateWithoutWeekInputObjectSchema).array(),
        z.lazy(() => DayUncheckedCreateWithoutWeekInputObjectSchema),
        z.lazy(() => DayUncheckedCreateWithoutWeekInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DayCreateOrConnectWithoutWeekInputObjectSchema),
        z.lazy(() => DayCreateOrConnectWithoutWeekInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DayCreateManyWeekInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => DayWhereUniqueInputObjectSchema),
        z.lazy(() => DayWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const DayUncheckedCreateNestedManyWithoutWeekInputObjectSchema = Schema
