import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IngredientSumOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IngredientSumOrderByAggregateInputSchema;
