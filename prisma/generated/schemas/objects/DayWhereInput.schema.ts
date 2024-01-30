import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { ExerciseListRelationFilterObjectSchema } from './ExerciseListRelationFilter.schema'
import { WeekRelationFilterObjectSchema } from './WeekRelationFilter.schema'
import { WeekWhereInputObjectSchema } from './WeekWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DayWhereInputObjectSchema),
        z.lazy(() => DayWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DayWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DayWhereInputObjectSchema),
        z.lazy(() => DayWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    name: z
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
    isTemplate: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    isRestDay: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    weekId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    warmupTemplateId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    energyRating: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    isComplete: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
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
    exercise: z.lazy(() => ExerciseListRelationFilterObjectSchema).optional(),
    week: z
      .union([
        z.lazy(() => WeekRelationFilterObjectSchema),
        z.lazy(() => WeekWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const DayWhereInputObjectSchema = Schema
