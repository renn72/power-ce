import { z } from 'zod'
import { WeekCreateWithoutBlockInputObjectSchema } from './WeekCreateWithoutBlockInput.schema'
import { WeekUncheckedCreateWithoutBlockInputObjectSchema } from './WeekUncheckedCreateWithoutBlockInput.schema'
import { WeekCreateOrConnectWithoutBlockInputObjectSchema } from './WeekCreateOrConnectWithoutBlockInput.schema'
import { WeekCreateManyBlockInputEnvelopeObjectSchema } from './WeekCreateManyBlockInputEnvelope.schema'
import { WeekWhereUniqueInputObjectSchema } from './WeekWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekUncheckedCreateNestedManyWithoutBlockInput> =
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
      createMany: z
        .lazy(() => WeekCreateManyBlockInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => WeekWhereUniqueInputObjectSchema),
          z.lazy(() => WeekWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const WeekUncheckedCreateNestedManyWithoutBlockInputObjectSchema = Schema
