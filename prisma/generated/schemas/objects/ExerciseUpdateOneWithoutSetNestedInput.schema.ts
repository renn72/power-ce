import { z } from 'zod'
import { ExerciseCreateWithoutSetInputObjectSchema } from './ExerciseCreateWithoutSetInput.schema'
import { ExerciseUncheckedCreateWithoutSetInputObjectSchema } from './ExerciseUncheckedCreateWithoutSetInput.schema'
import { ExerciseCreateOrConnectWithoutSetInputObjectSchema } from './ExerciseCreateOrConnectWithoutSetInput.schema'
import { ExerciseUpsertWithoutSetInputObjectSchema } from './ExerciseUpsertWithoutSetInput.schema'
import { ExerciseWhereUniqueInputObjectSchema } from './ExerciseWhereUniqueInput.schema'
import { ExerciseUpdateWithoutSetInputObjectSchema } from './ExerciseUpdateWithoutSetInput.schema'
import { ExerciseUncheckedUpdateWithoutSetInputObjectSchema } from './ExerciseUncheckedUpdateWithoutSetInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseUpdateOneWithoutSetNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ExerciseCreateWithoutSetInputObjectSchema),
        z.lazy(() => ExerciseUncheckedCreateWithoutSetInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ExerciseCreateOrConnectWithoutSetInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => ExerciseUpsertWithoutSetInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ExerciseWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ExerciseUpdateWithoutSetInputObjectSchema),
        z.lazy(() => ExerciseUncheckedUpdateWithoutSetInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const ExerciseUpdateOneWithoutSetNestedInputObjectSchema = Schema
