import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BaseIngredientWhereInputSchema } from './BaseIngredientWhereInputSchema';

export const BaseIngredientRelationFilterSchema: z.ZodType<Prisma.BaseIngredientRelationFilter> = z.object({
  is: z.lazy(() => BaseIngredientWhereInputSchema).optional(),
  isNot: z.lazy(() => BaseIngredientWhereInputSchema).optional()
}).strict();

export default BaseIngredientRelationFilterSchema;
