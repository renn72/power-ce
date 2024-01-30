import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { RecordCountOrderByAggregateInputSchema } from './RecordCountOrderByAggregateInputSchema';
import { RecordAvgOrderByAggregateInputSchema } from './RecordAvgOrderByAggregateInputSchema';
import { RecordMaxOrderByAggregateInputSchema } from './RecordMaxOrderByAggregateInputSchema';
import { RecordMinOrderByAggregateInputSchema } from './RecordMinOrderByAggregateInputSchema';
import { RecordSumOrderByAggregateInputSchema } from './RecordSumOrderByAggregateInputSchema';

export const RecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  lift: z.lazy(() => SortOrderSchema).optional(),
  wc: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecordSumOrderByAggregateInputSchema).optional()
}).strict();

export default RecordOrderByWithAggregationInputSchema;
