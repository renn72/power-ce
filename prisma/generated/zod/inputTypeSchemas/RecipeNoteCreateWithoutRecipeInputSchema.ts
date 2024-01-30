import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RecipeNoteCreateWithoutRecipeInputSchema: z.ZodType<Prisma.RecipeNoteCreateWithoutRecipeInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  note: z.string()
}).strict();

export default RecipeNoteCreateWithoutRecipeInputSchema;
