import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { DayListRelationFilterObjectSchema } from './DayListRelationFilter.schema'
import { BlockRelationFilterObjectSchema } from './BlockRelationFilter.schema'
import { BlockWhereInputObjectSchema } from './BlockWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => WeekWhereInputObjectSchema),
        z.lazy(() => WeekWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => WeekWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => WeekWhereInputObjectSchema),
        z.lazy(() => WeekWhereInputObjectSchema).array(),
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
    isTemplate: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    isDeleted: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    trainerId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    blockId: z
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
    day: z.lazy(() => DayListRelationFilterObjectSchema).optional(),
    block: z
      .union([
        z.lazy(() => BlockRelationFilterObjectSchema),
        z.lazy(() => BlockWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const WeekWhereInputObjectSchema = Schema
