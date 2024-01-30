import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { DecimalWithAggregatesFilterSchema } from './DecimalWithAggregatesFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';

export const RPEIndexScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RPEIndexScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RPEIndexScalarWhereWithAggregatesInputSchema),z.lazy(() => RPEIndexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RPEIndexScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RPEIndexScalarWhereWithAggregatesInputSchema),z.lazy(() => RPEIndexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export default RPEIndexScalarWhereWithAggregatesInputSchema;
