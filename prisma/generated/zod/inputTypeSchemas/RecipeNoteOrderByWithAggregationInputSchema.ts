import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { RecipeNoteCountOrderByAggregateInputSchema } from './RecipeNoteCountOrderByAggregateInputSchema';
import { RecipeNoteMaxOrderByAggregateInputSchema } from './RecipeNoteMaxOrderByAggregateInputSchema';
import { RecipeNoteMinOrderByAggregateInputSchema } from './RecipeNoteMinOrderByAggregateInputSchema';

export const RecipeNoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecipeNoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  recipeId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecipeNoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecipeNoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecipeNoteMinOrderByAggregateInputSchema).optional()
}).strict();

export default RecipeNoteOrderByWithAggregationInputSchema;
