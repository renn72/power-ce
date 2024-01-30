import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeArgsSchema } from "../outputTypeSchemas/RecipeArgsSchema"

export const RecipeNoteIncludeSchema: z.ZodType<Prisma.RecipeNoteInclude> = z.object({
  recipe: z.union([z.boolean(),z.lazy(() => RecipeArgsSchema)]).optional(),
}).strict()

export default RecipeNoteIncludeSchema;
