import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeCreateWithoutIngredientsInputSchema } from './RecipeCreateWithoutIngredientsInputSchema';
import { RecipeUncheckedCreateWithoutIngredientsInputSchema } from './RecipeUncheckedCreateWithoutIngredientsInputSchema';
import { RecipeCreateOrConnectWithoutIngredientsInputSchema } from './RecipeCreateOrConnectWithoutIngredientsInputSchema';
import { RecipeWhereUniqueInputSchema } from './RecipeWhereUniqueInputSchema';

export const RecipeCreateNestedOneWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutIngredientsInput> = z.object({
  create: z.union([ z.lazy(() => RecipeCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutIngredientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipeCreateOrConnectWithoutIngredientsInputSchema).optional(),
  connect: z.lazy(() => RecipeWhereUniqueInputSchema).optional()
}).strict();

export default RecipeCreateNestedOneWithoutIngredientsInputSchema;
