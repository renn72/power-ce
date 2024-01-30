import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteWhereInputSchema } from './RecipeNoteWhereInputSchema';

export const RecipeNoteListRelationFilterSchema: z.ZodType<Prisma.RecipeNoteListRelationFilter> = z.object({
  every: z.lazy(() => RecipeNoteWhereInputSchema).optional(),
  some: z.lazy(() => RecipeNoteWhereInputSchema).optional(),
  none: z.lazy(() => RecipeNoteWhereInputSchema).optional()
}).strict();

export default RecipeNoteListRelationFilterSchema;
