import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';

export const OneRepMaxOrderByWithRelationInputSchema: z.ZodType<Prisma.OneRepMaxOrderByWithRelationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lift: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export default OneRepMaxOrderByWithRelationInputSchema;
