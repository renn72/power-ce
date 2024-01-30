import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeArgsSchema } from "../outputTypeSchemas/RecipeArgsSchema"

export const RecipeNoteSelectSchema: z.ZodType<Prisma.RecipeNoteSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  recipeId: z.boolean().optional(),
  note: z.boolean().optional(),
  recipe: z.union([z.boolean(),z.lazy(() => RecipeArgsSchema)]).optional(),
}).strict()

export default RecipeNoteSelectSchema;
