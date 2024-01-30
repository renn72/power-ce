import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecipeSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeSumOrderByAggregateInput> = z.object({
  calories: z.lazy(() => SortOrderSchema).optional(),
  fat: z.lazy(() => SortOrderSchema).optional(),
  carbs: z.lazy(() => SortOrderSchema).optional(),
  protein: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecipeSumOrderByAggregateInputSchema;
