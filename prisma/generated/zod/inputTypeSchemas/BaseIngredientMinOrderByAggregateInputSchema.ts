import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BaseIngredientMinOrderByAggregateInputSchema: z.ZodType<Prisma.BaseIngredientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  calories: z.lazy(() => SortOrderSchema).optional(),
  fat: z.lazy(() => SortOrderSchema).optional(),
  carbs: z.lazy(() => SortOrderSchema).optional(),
  protein: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  isScalable: z.lazy(() => SortOrderSchema).optional(),
  isGluetenFree: z.lazy(() => SortOrderSchema).optional(),
  isVegan: z.lazy(() => SortOrderSchema).optional(),
  isVegetarian: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BaseIngredientMinOrderByAggregateInputSchema;
