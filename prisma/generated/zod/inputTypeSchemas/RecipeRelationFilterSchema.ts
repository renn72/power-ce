import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';

export const RecipeRelationFilterSchema: z.ZodType<Prisma.RecipeRelationFilter> = z.object({
  is: z.lazy(() => RecipeWhereInputSchema).optional(),
  isNot: z.lazy(() => RecipeWhereInputSchema).optional()
}).strict();

export default RecipeRelationFilterSchema;
