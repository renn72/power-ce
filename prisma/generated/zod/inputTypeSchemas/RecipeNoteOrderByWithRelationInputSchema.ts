import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { RecipeOrderByWithRelationInputSchema } from './RecipeOrderByWithRelationInputSchema';

export const RecipeNoteOrderByWithRelationInputSchema: z.ZodType<Prisma.RecipeNoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  recipeId: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  recipe: z.lazy(() => RecipeOrderByWithRelationInputSchema).optional()
}).strict();

export default RecipeNoteOrderByWithRelationInputSchema;
