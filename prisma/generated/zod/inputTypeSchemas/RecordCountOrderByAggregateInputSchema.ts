import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  lift: z.lazy(() => SortOrderSchema).optional(),
  wc: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecordCountOrderByAggregateInputSchema;
