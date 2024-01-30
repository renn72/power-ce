import { z } from 'zod'
import { ExerciseCreateNestedOneWithoutSetInputObjectSchema } from './ExerciseCreateNestedOneWithoutSetInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    rep: z.number(),
    rpe: z.number().optional().nullable(),
    weight: z.number().optional().nullable(),
    isComplete: z.boolean(),
    name: z.string().optional().nullable(),
    lift: z.string().optional().nullable(),
    userId: z.string().optional().nullable(),
    trainerId: z.string().optional().nullable(),
    actualReps: z.number().optional().nullable(),
    estiamtedOnerm: z.number().optional().nullable(),
    flield1: z.string().optional().nullable(),
    flield2: z.string().optional().nullable(),
    flield3: z.string().optional().nullable(),
    flield4: z.string().optional().nullable(),
    flield5: z.string().optional().nullable(),
    exercise: z
      .lazy(() => ExerciseCreateNestedOneWithoutSetInputObjectSchema)
      .optional(),
  })
  .strict()

export const SetCreateInputObjectSchema = Schema
