import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { BaseIngredientOrderByWithRelationInputSchema } from './BaseIngredientOrderByWithRelationInputSchema';
import { RecipeOrderByWithRelationInputSchema } from './RecipeOrderByWithRelationInputSchema';

export const IngredientOrderByWithRelationInputSchema: z.ZodType<Prisma.IngredientOrderByWithRelationInput> = z.object({
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
  baseIngredient: z.lazy(() => BaseIngredientOrderByWithRelationInputSchema).optional(),
  recipe: z.lazy(() => RecipeOrderByWithRelationInputSchema).optional()
}).strict();

export default IngredientOrderByWithRelationInputSchema;
