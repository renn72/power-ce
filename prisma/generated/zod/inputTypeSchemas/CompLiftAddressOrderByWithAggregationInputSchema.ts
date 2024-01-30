import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { CompLiftAddressCountOrderByAggregateInputSchema } from './CompLiftAddressCountOrderByAggregateInputSchema';
import { CompLiftAddressMaxOrderByAggregateInputSchema } from './CompLiftAddressMaxOrderByAggregateInputSchema';
import { CompLiftAddressMinOrderByAggregateInputSchema } from './CompLiftAddressMinOrderByAggregateInputSchema';

export const CompLiftAddressOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompLiftAddressOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield4: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield5: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CompLiftAddressCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompLiftAddressMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompLiftAddressMinOrderByAggregateInputSchema).optional()
}).strict();

export default CompLiftAddressOrderByWithAggregationInputSchema;
