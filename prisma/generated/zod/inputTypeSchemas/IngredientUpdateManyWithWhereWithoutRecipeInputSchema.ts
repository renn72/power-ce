import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientScalarWhereInputSchema } from './IngredientScalarWhereInputSchema';
import { IngredientUpdateManyMutationInputSchema } from './IngredientUpdateManyMutationInputSchema';
import { IngredientUncheckedUpdateManyWithoutRecipeInputSchema } from './IngredientUncheckedUpdateManyWithoutRecipeInputSchema';

export const IngredientUpdateManyWithWhereWithoutRecipeInputSchema: z.ZodType<Prisma.IngredientUpdateManyWithWhereWithoutRecipeInput> = z.object({
  where: z.lazy(() => IngredientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IngredientUpdateManyMutationInputSchema),z.lazy(() => IngredientUncheckedUpdateManyWithoutRecipeInputSchema) ]),
}).strict();

export default IngredientUpdateManyWithWhereWithoutRecipeInputSchema;
