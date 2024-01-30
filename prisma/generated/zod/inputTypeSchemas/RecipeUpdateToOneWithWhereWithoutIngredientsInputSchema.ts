import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';
import { RecipeUpdateWithoutIngredientsInputSchema } from './RecipeUpdateWithoutIngredientsInputSchema';
import { RecipeUncheckedUpdateWithoutIngredientsInputSchema } from './RecipeUncheckedUpdateWithoutIngredientsInputSchema';

export const RecipeUpdateToOneWithWhereWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RecipeUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedUpdateWithoutIngredientsInputSchema) ]),
}).strict();

export default RecipeUpdateToOneWithWhereWithoutIngredientsInputSchema;
