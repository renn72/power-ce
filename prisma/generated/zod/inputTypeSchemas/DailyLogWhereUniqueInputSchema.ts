import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { DailyLogWhereInputSchema } from './DailyLogWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DecimalNullableFilterSchema } from './DecimalNullableFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { UserProfileRelationFilterSchema } from './UserProfileRelationFilterSchema';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';

export const DailyLogWhereUniqueInputSchema: z.ZodType<Prisma.DailyLogWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DailyLogWhereInputSchema),z.lazy(() => DailyLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyLogWhereInputSchema),z.lazy(() => DailyLogWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  fat: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  carbs: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  protein: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  calories: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  steps: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  motivation: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sleepHrs: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  sleepQuality: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  recovery: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  stress: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  energy: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  restingHeartRate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  vo2Max: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  UserProfile: z.union([ z.lazy(() => UserProfileRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
}).strict());

export default DailyLogWhereUniqueInputSchema;
