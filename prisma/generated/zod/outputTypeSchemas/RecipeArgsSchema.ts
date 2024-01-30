import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeSelectSchema } from '../inputTypeSchemas/RecipeSelectSchema';
import { RecipeIncludeSchema } from '../inputTypeSchemas/RecipeIncludeSchema';

export const RecipeArgsSchema: z.ZodType<Prisma.RecipeDefaultArgs> = z.object({
  select: z.lazy(() => RecipeSelectSchema).optional(),
  include: z.lazy(() => RecipeIncludeSchema).optional(),
}).strict();

export default RecipeArgsSchema;
