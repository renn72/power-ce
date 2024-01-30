import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereInputSchema } from './IngredientWhereInputSchema';

export const IngredientListRelationFilterSchema: z.ZodType<Prisma.IngredientListRelationFilter> = z.object({
  every: z.lazy(() => IngredientWhereInputSchema).optional(),
  some: z.lazy(() => IngredientWhereInputSchema).optional(),
  none: z.lazy(() => IngredientWhereInputSchema).optional()
}).strict();

export default IngredientListRelationFilterSchema;
