import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const RecipeNoteScalarWhereInputSchema: z.ZodType<Prisma.RecipeNoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeNoteScalarWhereInputSchema),z.lazy(() => RecipeNoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeNoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeNoteScalarWhereInputSchema),z.lazy(() => RecipeNoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recipeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  note: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default RecipeNoteScalarWhereInputSchema;
