import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeCreateNestedOneWithoutNotesInputSchema } from './RecipeCreateNestedOneWithoutNotesInputSchema';

export const RecipeNoteCreateInputSchema: z.ZodType<Prisma.RecipeNoteCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  note: z.string(),
  recipe: z.lazy(() => RecipeCreateNestedOneWithoutNotesInputSchema)
}).strict();

export default RecipeNoteCreateInputSchema;
