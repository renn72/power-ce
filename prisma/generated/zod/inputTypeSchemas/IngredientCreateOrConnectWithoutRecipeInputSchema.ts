import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientCreateWithoutRecipeInputSchema } from './IngredientCreateWithoutRecipeInputSchema';
import { IngredientUncheckedCreateWithoutRecipeInputSchema } from './IngredientUncheckedCreateWithoutRecipeInputSchema';

export const IngredientCreateOrConnectWithoutRecipeInputSchema: z.ZodType<Prisma.IngredientCreateOrConnectWithoutRecipeInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IngredientCreateWithoutRecipeInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutRecipeInputSchema) ]),
}).strict();

export default IngredientCreateOrConnectWithoutRecipeInputSchema;
