import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RecipeNoteCreateManyRecipeInputSchema: z.ZodType<Prisma.RecipeNoteCreateManyRecipeInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  note: z.string()
}).strict();

export default RecipeNoteCreateManyRecipeInputSchema;
