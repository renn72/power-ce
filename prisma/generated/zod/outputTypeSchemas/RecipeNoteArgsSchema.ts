import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteSelectSchema } from '../inputTypeSchemas/RecipeNoteSelectSchema';
import { RecipeNoteIncludeSchema } from '../inputTypeSchemas/RecipeNoteIncludeSchema';

export const RecipeNoteArgsSchema: z.ZodType<Prisma.RecipeNoteDefaultArgs> = z.object({
  select: z.lazy(() => RecipeNoteSelectSchema).optional(),
  include: z.lazy(() => RecipeNoteIncludeSchema).optional(),
}).strict();

export default RecipeNoteArgsSchema;
