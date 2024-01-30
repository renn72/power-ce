import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeUpdateWithoutNotesInputSchema } from './RecipeUpdateWithoutNotesInputSchema';
import { RecipeUncheckedUpdateWithoutNotesInputSchema } from './RecipeUncheckedUpdateWithoutNotesInputSchema';
import { RecipeCreateWithoutNotesInputSchema } from './RecipeCreateWithoutNotesInputSchema';
import { RecipeUncheckedCreateWithoutNotesInputSchema } from './RecipeUncheckedCreateWithoutNotesInputSchema';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';

export const RecipeUpsertWithoutNotesInputSchema: z.ZodType<Prisma.RecipeUpsertWithoutNotesInput> = z.object({
  update: z.union([ z.lazy(() => RecipeUpdateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedUpdateWithoutNotesInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeCreateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutNotesInputSchema) ]),
  where: z.lazy(() => RecipeWhereInputSchema).optional()
}).strict();

export default RecipeUpsertWithoutNotesInputSchema;
