import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IngredientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  baseIngredientId: z.lazy(() => SortOrderSchema).optional(),
  recipeId: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  isScalable: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IngredientMaxOrderByAggregateInputSchema;
