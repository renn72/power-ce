import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { OneRepMaxUserIdLiftCompoundUniqueInputSchema } from './OneRepMaxUserIdLiftCompoundUniqueInputSchema';
import { OneRepMaxWhereInputSchema } from './OneRepMaxWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const OneRepMaxWhereUniqueInputSchema: z.ZodType<Prisma.OneRepMaxWhereUniqueInput> = z.object({
  userId_lift: z.lazy(() => OneRepMaxUserIdLiftCompoundUniqueInputSchema)
})
.and(z.object({
  userId_lift: z.lazy(() => OneRepMaxUserIdLiftCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => OneRepMaxWhereInputSchema),z.lazy(() => OneRepMaxWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OneRepMaxWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OneRepMaxWhereInputSchema),z.lazy(() => OneRepMaxWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lift: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default OneRepMaxWhereUniqueInputSchema;
