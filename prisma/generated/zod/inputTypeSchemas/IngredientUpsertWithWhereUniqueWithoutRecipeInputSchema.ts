import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientUpdateWithoutRecipeInputSchema } from './IngredientUpdateWithoutRecipeInputSchema';
import { IngredientUncheckedUpdateWithoutRecipeInputSchema } from './IngredientUncheckedUpdateWithoutRecipeInputSchema';
import { IngredientCreateWithoutRecipeInputSchema } from './IngredientCreateWithoutRecipeInputSchema';
import { IngredientUncheckedCreateWithoutRecipeInputSchema } from './IngredientUncheckedCreateWithoutRecipeInputSchema';

export const IngredientUpsertWithWhereUniqueWithoutRecipeInputSchema: z.ZodType<Prisma.IngredientUpsertWithWhereUniqueWithoutRecipeInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IngredientUpdateWithoutRecipeInputSchema),z.lazy(() => IngredientUncheckedUpdateWithoutRecipeInputSchema) ]),
  create: z.union([ z.lazy(() => IngredientCreateWithoutRecipeInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutRecipeInputSchema) ]),
}).strict();

export default IngredientUpsertWithWhereUniqueWithoutRecipeInputSchema;
