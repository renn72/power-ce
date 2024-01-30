import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';
import { RecipeUpdateWithoutNotesInputSchema } from './RecipeUpdateWithoutNotesInputSchema';
import { RecipeUncheckedUpdateWithoutNotesInputSchema } from './RecipeUncheckedUpdateWithoutNotesInputSchema';

export const RecipeUpdateToOneWithWhereWithoutNotesInputSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutNotesInput> = z.object({
  where: z.lazy(() => RecipeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RecipeUpdateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedUpdateWithoutNotesInputSchema) ]),
}).strict();

export default RecipeUpdateToOneWithWhereWithoutNotesInputSchema;
