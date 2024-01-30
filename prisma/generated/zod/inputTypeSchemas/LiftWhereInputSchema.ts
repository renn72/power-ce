import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { LiftsRelationFilterSchema } from './LiftsRelationFilterSchema';
import { LiftsWhereInputSchema } from './LiftsWhereInputSchema';

export const LiftWhereInputSchema: z.ZodType<Prisma.LiftWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LiftWhereInputSchema),z.lazy(() => LiftWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LiftWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LiftWhereInputSchema),z.lazy(() => LiftWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAtUser: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  trainerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  liftId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  weight: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  liftName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lift: z.union([ z.lazy(() => LiftsRelationFilterSchema),z.lazy(() => LiftsWhereInputSchema) ]).optional(),
}).strict();

export default LiftWhereInputSchema;
