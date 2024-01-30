import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteWhereUniqueInputSchema } from './RecipeNoteWhereUniqueInputSchema';
import { RecipeNoteUpdateWithoutRecipeInputSchema } from './RecipeNoteUpdateWithoutRecipeInputSchema';
import { RecipeNoteUncheckedUpdateWithoutRecipeInputSchema } from './RecipeNoteUncheckedUpdateWithoutRecipeInputSchema';

export const RecipeNoteUpdateWithWhereUniqueWithoutRecipeInputSchema: z.ZodType<Prisma.RecipeNoteUpdateWithWhereUniqueWithoutRecipeInput> = z.object({
  where: z.lazy(() => RecipeNoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecipeNoteUpdateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUncheckedUpdateWithoutRecipeInputSchema) ]),
}).strict();

export default RecipeNoteUpdateWithWhereUniqueWithoutRecipeInputSchema;
