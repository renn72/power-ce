import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecipeNoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeNoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  recipeId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecipeNoteCountOrderByAggregateInputSchema;
