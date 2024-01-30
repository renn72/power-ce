import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeUpdateWithoutIngredientsInputSchema } from './RecipeUpdateWithoutIngredientsInputSchema';
import { RecipeUncheckedUpdateWithoutIngredientsInputSchema } from './RecipeUncheckedUpdateWithoutIngredientsInputSchema';
import { RecipeCreateWithoutIngredientsInputSchema } from './RecipeCreateWithoutIngredientsInputSchema';
import { RecipeUncheckedCreateWithoutIngredientsInputSchema } from './RecipeUncheckedCreateWithoutIngredientsInputSchema';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';

export const RecipeUpsertWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeUpsertWithoutIngredientsInput> = z.object({
  update: z.union([ z.lazy(() => RecipeUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedUpdateWithoutIngredientsInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutIngredientsInputSchema) ]),
  where: z.lazy(() => RecipeWhereInputSchema).optional()
}).strict();

export default RecipeUpsertWithoutIngredientsInputSchema;
