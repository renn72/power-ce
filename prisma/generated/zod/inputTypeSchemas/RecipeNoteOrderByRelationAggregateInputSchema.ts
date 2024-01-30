import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecipeNoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RecipeNoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecipeNoteOrderByRelationAggregateInputSchema;
