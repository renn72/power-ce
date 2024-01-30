import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateWhereInputSchema } from './WarmupTemplateWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { WarmupListRelationFilterSchema } from './WarmupListRelationFilterSchema';

export const WarmupTemplateWhereUniqueInputSchema: z.ZodType<Prisma.WarmupTemplateWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WarmupTemplateWhereInputSchema),z.lazy(() => WarmupTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WarmupTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WarmupTemplateWhereInputSchema),z.lazy(() => WarmupTemplateWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  warmups: z.lazy(() => WarmupListRelationFilterSchema).optional()
}).strict());

export default WarmupTemplateWhereUniqueInputSchema;
