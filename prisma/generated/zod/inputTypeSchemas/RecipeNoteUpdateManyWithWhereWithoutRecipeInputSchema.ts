import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteScalarWhereInputSchema } from './RecipeNoteScalarWhereInputSchema';
import { RecipeNoteUpdateManyMutationInputSchema } from './RecipeNoteUpdateManyMutationInputSchema';
import { RecipeNoteUncheckedUpdateManyWithoutRecipeInputSchema } from './RecipeNoteUncheckedUpdateManyWithoutRecipeInputSchema';

export const RecipeNoteUpdateManyWithWhereWithoutRecipeInputSchema: z.ZodType<Prisma.RecipeNoteUpdateManyWithWhereWithoutRecipeInput> = z.object({
  where: z.lazy(() => RecipeNoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecipeNoteUpdateManyMutationInputSchema),z.lazy(() => RecipeNoteUncheckedUpdateManyWithoutRecipeInputSchema) ]),
}).strict();

export default RecipeNoteUpdateManyWithWhereWithoutRecipeInputSchema;
