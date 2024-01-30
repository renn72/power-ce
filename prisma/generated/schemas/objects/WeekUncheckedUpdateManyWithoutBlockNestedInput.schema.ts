import { z } from 'zod'
import { WeekCreateWithoutBlockInputObjectSchema } from './WeekCreateWithoutBlockInput.schema'
import { WeekUncheckedCreateWithoutBlockInputObjectSchema } from './WeekUncheckedCreateWithoutBlockInput.schema'
import { WeekCreateOrConnectWithoutBlockInputObjectSchema } from './WeekCreateOrConnectWithoutBlockInput.schema'
import { WeekUpsertWithWhereUniqueWithoutBlockInputObjectSchema } from './WeekUpsertWithWhereUniqueWithoutBlockInput.schema'
import { WeekCreateManyBlockInputEnvelopeObjectSchema } from './WeekCreateManyBlockInputEnvelope.schema'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'
import { WeekUpdateWithWhereUniqueWithoutBlockInputObjectSchema } from './WeekUpdateWithWhereUniqueWithoutBlockInput.schema'
import { WeekUpdateManyWithWhereWithoutBlockInputObjectSchema } from './WeekUpdateManyWithWhereWithoutBlockInput.schema'
import { WeekScalarWhereInputObjectSchema } from './WeekScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUncheckedUpdateManyWithoutBlockNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WeekCreateWithoutBlockInputObjectSchema),
          z.lazy(() => WeekCreateWithoutBlockInputObjectSchema).array(),
          z.lazy(() => WeekUncheckedCreateWithoutBlockInputObjectSchema),
          z
            .lazy(() => WeekUncheckedCreateWithoutBlockInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => WeekCreateOrConnectWithoutBlockInputObjectSchema),
          z
            .lazy(() => WeekCreateOrConnectWithoutBlockInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => WeekUpsertWithWhereUniqueWithoutBlockInputObjectSchema),
          z
            .lazy(() => WeekUpsertWithWhereUniqueWithoutBlockInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => WeekCreateManyBlockInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => WeekWhereUniqueInputObjectSchema),
          z.lazy(() => WeekWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => WeekWhereUniqueInputObjectSchema),
          z.lazy(() => WeekWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => WeekWhereUniqueInputObjectSchema),
          z.lazy(() => WeekWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => WeekWhereUniqueInputObjectSchema),
          z.lazy(() => WeekWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => WeekUpdateWithWhereUniqueWithoutBlockInputObjectSchema),
          z
            .lazy(() => WeekUpdateWithWhereUniqueWithoutBlockInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => WeekUpdateManyWithWhereWithoutBlockInputObjectSchema),
          z
            .lazy(() => WeekUpdateManyWithWhereWithoutBlockInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => WeekScalarWhereInputObjectSchema),
          z.lazy(() => WeekScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const WeekUncheckedUpdateManyWithoutBlockNestedInputObjectSchema = Schema
