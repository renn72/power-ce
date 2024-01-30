import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { IngredientCountOrderByAggregateInputSchema } from './IngredientCountOrderByAggregateInputSchema';
import { IngredientAvgOrderByAggregateInputSchema } from './IngredientAvgOrderByAggregateInputSchema';
import { IngredientMaxOrderByAggregateInputSchema } from './IngredientMaxOrderByAggregateInputSchema';
import { IngredientMinOrderByAggregateInputSchema } from './IngredientMinOrderByAggregateInputSchema';
import { IngredientSumOrderByAggregateInputSchema } from './IngredientSumOrderByAggregateInputSchema';

export const IngredientOrderByWithAggregationInputSchema: z.ZodType<Prisma.IngredientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  baseIngredientId: z.lazy(() => SortOrderSchema).optional(),
  recipeId: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  isScalable: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => IngredientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IngredientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IngredientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IngredientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IngredientSumOrderByAggregateInputSchema).optional()
}).strict();

export default IngredientOrderByWithAggregationInputSchema;
