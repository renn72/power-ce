import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientCreateManyBaseIngredientInputSchema } from './IngredientCreateManyBaseIngredientInputSchema';

export const IngredientCreateManyBaseIngredientInputEnvelopeSchema: z.ZodType<Prisma.IngredientCreateManyBaseIngredientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IngredientCreateManyBaseIngredientInputSchema),z.lazy(() => IngredientCreateManyBaseIngredientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default IngredientCreateManyBaseIngredientInputEnvelopeSchema;
