import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeWhereUniqueInputSchema } from './RecipeWhereUniqueInputSchema';
import { RecipeCreateWithoutIngredientsInputSchema } from './RecipeCreateWithoutIngredientsInputSchema';
import { RecipeUncheckedCreateWithoutIngredientsInputSchema } from './RecipeUncheckedCreateWithoutIngredientsInputSchema';

export const RecipeCreateOrConnectWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutIngredientsInputSchema) ]),
}).strict();

export default RecipeCreateOrConnectWithoutIngredientsInputSchema;
