import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RecipeNoteUncheckedCreateInputSchema: z.ZodType<Prisma.RecipeNoteUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  recipeId: z.string(),
  note: z.string()
}).strict();

export default RecipeNoteUncheckedCreateInputSchema;
