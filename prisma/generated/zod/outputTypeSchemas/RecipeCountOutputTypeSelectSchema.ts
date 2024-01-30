import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const RecipeCountOutputTypeSelectSchema: z.ZodType<Prisma.RecipeCountOutputTypeSelect> = z.object({
  ingredients: z.boolean().optional(),
  notes: z.boolean().optional(),
}).strict();

export default RecipeCountOutputTypeSelectSchema;
