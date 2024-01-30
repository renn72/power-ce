import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WarmupTemplateOrderByWithRelationInputSchema } from './WarmupTemplateOrderByWithRelationInputSchema';

export const WarmupOrderByWithRelationInputSchema: z.ZodType<Prisma.WarmupOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  warmupTemplateId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  warmupTemplate: z.lazy(() => WarmupTemplateOrderByWithRelationInputSchema).optional()
}).strict();

export default WarmupOrderByWithRelationInputSchema;
