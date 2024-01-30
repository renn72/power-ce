import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientCreateWithoutBaseIngredientInputSchema } from './IngredientCreateWithoutBaseIngredientInputSchema';
import { IngredientUncheckedCreateWithoutBaseIngredientInputSchema } from './IngredientUncheckedCreateWithoutBaseIngredientInputSchema';

export const IngredientCreateOrConnectWithoutBaseIngredientInputSchema: z.ZodType<Prisma.IngredientCreateOrConnectWithoutBaseIngredientInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IngredientCreateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutBaseIngredientInputSchema) ]),
}).strict();

export default IngredientCreateOrConnectWithoutBaseIngredientInputSchema;
