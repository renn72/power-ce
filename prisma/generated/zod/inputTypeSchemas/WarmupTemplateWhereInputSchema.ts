import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { WarmupListRelationFilterSchema } from './WarmupListRelationFilterSchema';

export const WarmupTemplateWhereInputSchema: z.ZodType<Prisma.WarmupTemplateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WarmupTemplateWhereInputSchema),z.lazy(() => WarmupTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WarmupTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WarmupTemplateWhereInputSchema),z.lazy(() => WarmupTemplateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  warmups: z.lazy(() => WarmupListRelationFilterSchema).optional()
}).strict();

export default WarmupTemplateWhereInputSchema;
