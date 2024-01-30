import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { RPEIndexUserId_nameCompoundUniqueInputSchema } from './RPEIndexUserId_nameCompoundUniqueInputSchema';
import { RPEIndexWhereInputSchema } from './RPEIndexWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const RPEIndexWhereUniqueInputSchema: z.ZodType<Prisma.RPEIndexWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_name: z.lazy(() => RPEIndexUserId_nameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_name: z.lazy(() => RPEIndexUserId_nameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_name: z.lazy(() => RPEIndexUserId_nameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RPEIndexWhereInputSchema),z.lazy(() => RPEIndexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RPEIndexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RPEIndexWhereInputSchema),z.lazy(() => RPEIndexWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict());

export default RPEIndexWhereUniqueInputSchema;
