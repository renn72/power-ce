import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientCreateManyRecipeInputSchema } from './IngredientCreateManyRecipeInputSchema';

export const IngredientCreateManyRecipeInputEnvelopeSchema: z.ZodType<Prisma.IngredientCreateManyRecipeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IngredientCreateManyRecipeInputSchema),z.lazy(() => IngredientCreateManyRecipeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default IngredientCreateManyRecipeInputEnvelopeSchema;
