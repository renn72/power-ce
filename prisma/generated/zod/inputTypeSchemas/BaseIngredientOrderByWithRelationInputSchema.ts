import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { IngredientOrderByRelationAggregateInputSchema } from './IngredientOrderByRelationAggregateInputSchema';

export const BaseIngredientOrderByWithRelationInputSchema: z.ZodType<Prisma.BaseIngredientOrderByWithRelationInput> = z.object({
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
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ingredient: z.lazy(() => IngredientOrderByRelationAggregateInputSchema).optional()
}).strict();

export default BaseIngredientOrderByWithRelationInputSchema;
