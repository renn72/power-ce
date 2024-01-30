import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const RPEIndexWhereInputSchema: z.ZodType<Prisma.RPEIndexWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RPEIndexWhereInputSchema),z.lazy(() => RPEIndexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RPEIndexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RPEIndexWhereInputSchema),z.lazy(() => RPEIndexWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export default RPEIndexWhereInputSchema;
