import { z } from 'zod'
import { SetCreateNestedManyWithoutExerciseInputObjectSchema } from './SetCreateNestedManyWithoutExerciseInput.schema'
import { DayCreateNestedOneWithoutExerciseInputObjectSchema } from './DayCreateNestedOneWithoutExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateWithoutSsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    name: z.string().optional().nullable(),
    lift: z.string().optional().nullable(),
    sets: z.number().optional().nullable(),
    reps: z.number().optional().nullable(),
    userId: z.string().optional().nullable(),
    trainerId: z.string().optional().nullable(),
    isTemplate: z.boolean().optional().nullable(),
    repUnit: z.string().optional().nullable(),
    weightType: z.string().optional().nullable(),
    onerm: z.number().optional().nullable(),
    onermTop: z.number().optional().nullable(),
    weightTop: z.number().optional().nullable(),
    weightBottom: z.number().optional().nullable(),
    targetRpe: z.number().optional().nullable(),
    targetRpeHigh: z.number().optional().nullable(),
    restTime: z.number().optional().nullable(),
    restUnit: z.string().optional().nullable(),
    setWieght: z.number().optional().nullable(),
    setTopWeight: z.number().optional().nullable(),
    isEstimatedOnerm: z.boolean().optional().nullable(),
    estimatedOnermIndex: z.number().optional().nullable(),
    tempoDown: z.number().optional().nullable(),
    tempoPause: z.number().optional().nullable(),
    tempoUp: z.number().optional().nullable(),
    actualSets: z.number().optional().nullable(),
    actualReps: z.number().optional().nullable(),
    isComplete: z.boolean().optional(),
    rpe: z.number().optional().nullable(),
    weight: z.number().optional().nullable(),
    isSS: z.boolean().optional().nullable(),
    notes: z.string().optional().nullable(),
    htmlLink: z.string().optional().nullable(),
    flield1: z.string().optional().nullable(),
    flield2: z.string().optional().nullable(),
    flield3: z.string().optional().nullable(),
    flield4: z.string().optional().nullable(),
    flield5: z.string().optional().nullable(),
    set: z
      .lazy(() => SetCreateNestedManyWithoutExerciseInputObjectSchema)
      .optional(),
    day: z
      .lazy(() => DayCreateNestedOneWithoutExerciseInputObjectSchema)
      .optional(),
  })
  .strict()

export const ExerciseCreateWithoutSsInputObjectSchema = Schema
