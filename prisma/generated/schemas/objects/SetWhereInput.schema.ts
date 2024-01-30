import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema'
import { ExerciseRelationFilterObjectSchema } from './ExerciseRelationFilter.schema'
import { ExerciseWhereInputObjectSchema } from './ExerciseWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SetWhereInputObjectSchema),
        z.lazy(() => SetWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SetWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SetWhereInputObjectSchema),
        z.lazy(() => SetWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    rep: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    rpe: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    weight: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    isComplete: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    lift: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    trainerId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    actualReps: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    estiamtedOnerm: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    exerciseId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    flield1: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    flield2: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    flield3: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    flield4: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    flield5: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    exercise: z
      .union([
        z.lazy(() => ExerciseRelationFilterObjectSchema),
        z.lazy(() => ExerciseWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const SetWhereInputObjectSchema = Schema
