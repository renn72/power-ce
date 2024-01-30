import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientUpdateWithoutBaseIngredientInputSchema } from './IngredientUpdateWithoutBaseIngredientInputSchema';
import { IngredientUncheckedUpdateWithoutBaseIngredientInputSchema } from './IngredientUncheckedUpdateWithoutBaseIngredientInputSchema';

export const IngredientUpdateWithWhereUniqueWithoutBaseIngredientInputSchema: z.ZodType<Prisma.IngredientUpdateWithWhereUniqueWithoutBaseIngredientInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IngredientUpdateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUncheckedUpdateWithoutBaseIngredientInputSchema) ]),
}).strict();

export default IngredientUpdateWithWhereUniqueWithoutBaseIngredientInputSchema;
