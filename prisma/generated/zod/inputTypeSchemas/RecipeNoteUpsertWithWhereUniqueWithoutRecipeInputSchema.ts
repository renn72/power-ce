import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteWhereUniqueInputSchema } from './RecipeNoteWhereUniqueInputSchema';
import { RecipeNoteUpdateWithoutRecipeInputSchema } from './RecipeNoteUpdateWithoutRecipeInputSchema';
import { RecipeNoteUncheckedUpdateWithoutRecipeInputSchema } from './RecipeNoteUncheckedUpdateWithoutRecipeInputSchema';
import { RecipeNoteCreateWithoutRecipeInputSchema } from './RecipeNoteCreateWithoutRecipeInputSchema';
import { RecipeNoteUncheckedCreateWithoutRecipeInputSchema } from './RecipeNoteUncheckedCreateWithoutRecipeInputSchema';

export const RecipeNoteUpsertWithWhereUniqueWithoutRecipeInputSchema: z.ZodType<Prisma.RecipeNoteUpsertWithWhereUniqueWithoutRecipeInput> = z.object({
  where: z.lazy(() => RecipeNoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecipeNoteUpdateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUncheckedUpdateWithoutRecipeInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeNoteCreateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUncheckedCreateWithoutRecipeInputSchema) ]),
}).strict();

export default RecipeNoteUpsertWithWhereUniqueWithoutRecipeInputSchema;
