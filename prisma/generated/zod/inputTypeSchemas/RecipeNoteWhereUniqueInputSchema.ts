import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteWhereInputSchema } from './RecipeNoteWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { RecipeRelationFilterSchema } from './RecipeRelationFilterSchema';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';

export const RecipeNoteWhereUniqueInputSchema: z.ZodType<Prisma.RecipeNoteWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RecipeNoteWhereInputSchema),z.lazy(() => RecipeNoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeNoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeNoteWhereInputSchema),z.lazy(() => RecipeNoteWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recipeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipe: z.union([ z.lazy(() => RecipeRelationFilterSchema),z.lazy(() => RecipeWhereInputSchema) ]).optional(),
}).strict());

export default RecipeNoteWhereUniqueInputSchema;
