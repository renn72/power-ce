import { z } from 'zod'
import { DayCreateWithoutWeekInputObjectSchema } from './DayCreateWithoutWeekInput.schema'
import { DayUncheckedCreateWithoutWeekInputObjectSchema } from './DayUncheckedCreateWithoutWeekInput.schema'
import { DayCreateOrConnectWithoutWeekInputObjectSchema } from './DayCreateOrConnectWithoutWeekInput.schema'
import { DayUpsertWithWhereUniqueWithoutWeekInputObjectSchema } from './DayUpsertWithWhereUniqueWithoutWeekInput.schema'
import { DayCreateManyWeekInputEnvelopeObjectSchema } from './DayCreateManyWeekInputEnvelope.schema'
import { DayWhereUniqueInputObjectSchema } from './DayWhereUniqueInput.schema'
import { DayUpdateWithWhereUniqueWithoutWeekInputObjectSchema } from './DayUpdateWithWhereUniqueWithoutWeekInput.schema'
import { DayUpdateManyWithWhereWithoutWeekInputObjectSchema } from './DayUpdateManyWithWhereWithoutWeekInput.schema'
import { DayScalarWhereInputObjectSchema } from './DayScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayUpdateManyWithoutWeekNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => DayUpsertWithWhereUniqueWithoutWeekInputObjectSchema),
        z
          .lazy(() => DayUpsertWithWhereUniqueWithoutWeekInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DayCreateManyWeekInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => DayWhereUniqueInputObjectSchema),
        z.lazy(() => DayWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => DayWhereUniqueInputObjectSchema),
        z.lazy(() => DayWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => DayWhereUniqueInputObjectSchema),
        z.lazy(() => DayWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => DayWhereUniqueInputObjectSchema),
        z.lazy(() => DayWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => DayUpdateWithWhereUniqueWithoutWeekInputObjectSchema),
        z
          .lazy(() => DayUpdateWithWhereUniqueWithoutWeekInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => DayUpdateManyWithWhereWithoutWeekInputObjectSchema),
        z
          .lazy(() => DayUpdateManyWithWhereWithoutWeekInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => DayScalarWhereInputObjectSchema),
        z.lazy(() => DayScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const DayUpdateManyWithoutWeekNestedInputObjectSchema = Schema
