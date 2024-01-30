import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientScalarWhereInputSchema } from './IngredientScalarWhereInputSchema';
import { IngredientUpdateManyMutationInputSchema } from './IngredientUpdateManyMutationInputSchema';
import { IngredientUncheckedUpdateManyWithoutBaseIngredientInputSchema } from './IngredientUncheckedUpdateManyWithoutBaseIngredientInputSchema';

export const IngredientUpdateManyWithWhereWithoutBaseIngredientInputSchema: z.ZodType<Prisma.IngredientUpdateManyWithWhereWithoutBaseIngredientInput> = z.object({
  where: z.lazy(() => IngredientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IngredientUpdateManyMutationInputSchema),z.lazy(() => IngredientUncheckedUpdateManyWithoutBaseIngredientInputSchema) ]),
}).strict();

export default IngredientUpdateManyWithWhereWithoutBaseIngredientInputSchema;
