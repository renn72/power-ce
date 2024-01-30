import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientUpdateWithoutRecipeInputSchema } from './IngredientUpdateWithoutRecipeInputSchema';
import { IngredientUncheckedUpdateWithoutRecipeInputSchema } from './IngredientUncheckedUpdateWithoutRecipeInputSchema';

export const IngredientUpdateWithWhereUniqueWithoutRecipeInputSchema: z.ZodType<Prisma.IngredientUpdateWithWhereUniqueWithoutRecipeInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IngredientUpdateWithoutRecipeInputSchema),z.lazy(() => IngredientUncheckedUpdateWithoutRecipeInputSchema) ]),
}).strict();

export default IngredientUpdateWithWhereUniqueWithoutRecipeInputSchema;
