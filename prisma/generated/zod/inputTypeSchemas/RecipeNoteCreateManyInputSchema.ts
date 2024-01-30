import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RecipeNoteCreateManyInputSchema: z.ZodType<Prisma.RecipeNoteCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  recipeId: z.string(),
  note: z.string()
}).strict();

export default RecipeNoteCreateManyInputSchema;
