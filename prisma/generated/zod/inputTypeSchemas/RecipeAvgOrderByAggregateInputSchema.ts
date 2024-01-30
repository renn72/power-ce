import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecipeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeAvgOrderByAggregateInput> = z.object({
  calories: z.lazy(() => SortOrderSchema).optional(),
  fat: z.lazy(() => SortOrderSchema).optional(),
  carbs: z.lazy(() => SortOrderSchema).optional(),
  protein: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecipeAvgOrderByAggregateInputSchema;
