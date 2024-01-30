import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteWhereUniqueInputSchema } from './RecipeNoteWhereUniqueInputSchema';
import { RecipeNoteCreateWithoutRecipeInputSchema } from './RecipeNoteCreateWithoutRecipeInputSchema';
import { RecipeNoteUncheckedCreateWithoutRecipeInputSchema } from './RecipeNoteUncheckedCreateWithoutRecipeInputSchema';

export const RecipeNoteCreateOrConnectWithoutRecipeInputSchema: z.ZodType<Prisma.RecipeNoteCreateOrConnectWithoutRecipeInput> = z.object({
  where: z.lazy(() => RecipeNoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeNoteCreateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUncheckedCreateWithoutRecipeInputSchema) ]),
}).strict();

export default RecipeNoteCreateOrConnectWithoutRecipeInputSchema;
