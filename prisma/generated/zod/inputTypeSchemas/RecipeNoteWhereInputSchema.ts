import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { RecipeRelationFilterSchema } from './RecipeRelationFilterSchema';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';

export const RecipeNoteWhereInputSchema: z.ZodType<Prisma.RecipeNoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeNoteWhereInputSchema),z.lazy(() => RecipeNoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeNoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeNoteWhereInputSchema),z.lazy(() => RecipeNoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recipeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipe: z.union([ z.lazy(() => RecipeRelationFilterSchema),z.lazy(() => RecipeWhereInputSchema) ]).optional(),
}).strict();

export default RecipeNoteWhereInputSchema;
