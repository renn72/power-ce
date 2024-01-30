import { z } from 'zod'
import { ExerciseCreateWithoutSsInputObjectSchema } from './ExerciseCreateWithoutSsInput.schema'
import { ExerciseUncheckedCreateWithoutSsInputObjectSchema } from './ExerciseUncheckedCreateWithoutSsInput.schema'
import { ExerciseCreateOrConnectWithoutSsInputObjectSchema } from './ExerciseCreateOrConnectWithoutSsInput.schema'
import { ExerciseUpsertWithoutSsInputObjectSchema } from './ExerciseUpsertWithoutSsInput.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseUpdateWithoutSsInputObjectSchema } from './ExerciseUpdateWithoutSsInput.schema'
import { ExerciseUncheckedUpdateWithoutSsInputObjectSchema } from './ExerciseUncheckedUpdateWithoutSsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUpdateOneWithoutSsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ExerciseCreateWithoutSsInputObjectSchema),
        z.lazy(() => ExerciseUncheckedCreateWithoutSsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ExerciseCreateOrConnectWithoutSsInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => ExerciseUpsertWithoutSsInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ExerciseWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ExerciseUpdateWithoutSsInputObjectSchema),
        z.lazy(() => ExerciseUncheckedUpdateWithoutSsInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const ExerciseUpdateOneWithoutSsNestedInputObjectSchema = Schema
