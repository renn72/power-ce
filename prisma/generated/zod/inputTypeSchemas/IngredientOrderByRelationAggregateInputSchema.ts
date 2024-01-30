import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IngredientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IngredientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IngredientOrderByRelationAggregateInputSchema;
