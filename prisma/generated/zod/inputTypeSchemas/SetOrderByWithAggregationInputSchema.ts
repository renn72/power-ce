import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { SetCountOrderByAggregateInputSchema } from './SetCountOrderByAggregateInputSchema';
import { SetAvgOrderByAggregateInputSchema } from './SetAvgOrderByAggregateInputSchema';
import { SetMaxOrderByAggregateInputSchema } from './SetMaxOrderByAggregateInputSchema';
import { SetMinOrderByAggregateInputSchema } from './SetMinOrderByAggregateInputSchema';
import { SetSumOrderByAggregateInputSchema } from './SetSumOrderByAggregateInputSchema';

export const SetOrderByWithAggregationInputSchema: z.ZodType<Prisma.SetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  rep: z.lazy(() => SortOrderSchema).optional(),
  rpe: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lift: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  trainerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  actualReps: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  estiamtedOnerm: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  exerciseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield4: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield5: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SetSumOrderByAggregateInputSchema).optional()
}).strict();

export default SetOrderByWithAggregationInputSchema;
