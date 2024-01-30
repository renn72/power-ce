import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const RecipeNoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecipeNoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeNoteScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipeNoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeNoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeNoteScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipeNoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  recipeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  note: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default RecipeNoteScalarWhereWithAggregatesInputSchema;
