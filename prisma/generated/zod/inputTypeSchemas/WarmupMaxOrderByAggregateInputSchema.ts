import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WarmupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WarmupMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  warmupTemplateId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WarmupMaxOrderByAggregateInputSchema;
