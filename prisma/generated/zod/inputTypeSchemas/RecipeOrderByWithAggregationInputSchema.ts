import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RecipeCountOrderByAggregateInputSchema } from './RecipeCountOrderByAggregateInputSchema';
import { RecipeAvgOrderByAggregateInputSchema } from './RecipeAvgOrderByAggregateInputSchema';
import { RecipeMaxOrderByAggregateInputSchema } from './RecipeMaxOrderByAggregateInputSchema';
import { RecipeMinOrderByAggregateInputSchema } from './RecipeMinOrderByAggregateInputSchema';
import { RecipeSumOrderByAggregateInputSchema } from './RecipeSumOrderByAggregateInputSchema';

export const RecipeOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecipeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  calories: z.lazy(() => SortOrderSchema).optional(),
  fat: z.lazy(() => SortOrderSchema).optional(),
  carbs: z.lazy(() => SortOrderSchema).optional(),
  protein: z.lazy(() => SortOrderSchema).optional(),
  isGluetenFree: z.lazy(() => SortOrderSchema).optional(),
  isVegan: z.lazy(() => SortOrderSchema).optional(),
  isVegetarian: z.lazy(() => SortOrderSchema).optional(),
  isScalable: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RecipeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecipeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecipeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecipeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecipeSumOrderByAggregateInputSchema).optional()
}).strict();

export default RecipeOrderByWithAggregationInputSchema;
