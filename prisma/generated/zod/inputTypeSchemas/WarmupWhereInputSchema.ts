import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { WarmupTemplateRelationFilterSchema } from './WarmupTemplateRelationFilterSchema';
import { WarmupTemplateWhereInputSchema } from './WarmupTemplateWhereInputSchema';

export const WarmupWhereInputSchema: z.ZodType<Prisma.WarmupWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WarmupWhereInputSchema),z.lazy(() => WarmupWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WarmupWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WarmupWhereInputSchema),z.lazy(() => WarmupWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  warmupTemplateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  warmupTemplate: z.union([ z.lazy(() => WarmupTemplateRelationFilterSchema),z.lazy(() => WarmupTemplateWhereInputSchema) ]).optional(),
}).strict();

export default WarmupWhereInputSchema;
