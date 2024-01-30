import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeCreateWithoutIngredientsInputSchema } from './RecipeCreateWithoutIngredientsInputSchema';
import { RecipeUncheckedCreateWithoutIngredientsInputSchema } from './RecipeUncheckedCreateWithoutIngredientsInputSchema';
import { RecipeCreateOrConnectWithoutIngredientsInputSchema } from './RecipeCreateOrConnectWithoutIngredientsInputSchema';
import { RecipeUpsertWithoutIngredientsInputSchema } from './RecipeUpsertWithoutIngredientsInputSchema';
import { RecipeWhereUniqueInputSchema } from './RecipeWhereUniqueInputSchema';
import { RecipeUpdateToOneWithWhereWithoutIngredientsInputSchema } from './RecipeUpdateToOneWithWhereWithoutIngredientsInputSchema';
import { RecipeUpdateWithoutIngredientsInputSchema } from './RecipeUpdateWithoutIngredientsInputSchema';
import { RecipeUncheckedUpdateWithoutIngredientsInputSchema } from './RecipeUncheckedUpdateWithoutIngredientsInputSchema';

export const RecipeUpdateOneRequiredWithoutIngredientsNestedInputSchema: z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutIngredientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutIngredientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipeCreateOrConnectWithoutIngredientsInputSchema).optional(),
  upsert: z.lazy(() => RecipeUpsertWithoutIngredientsInputSchema).optional(),
  connect: z.lazy(() => RecipeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RecipeUpdateToOneWithWhereWithoutIngredientsInputSchema),z.lazy(() => RecipeUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipeUncheckedUpdateWithoutIngredientsInputSchema) ]).optional(),
}).strict();

export default RecipeUpdateOneRequiredWithoutIngredientsNestedInputSchema;
