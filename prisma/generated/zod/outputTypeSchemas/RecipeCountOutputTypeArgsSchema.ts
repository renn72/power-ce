import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCountOutputTypeSelectSchema } from './RecipeCountOutputTypeSelectSchema';

export const RecipeCountOutputTypeArgsSchema: z.ZodType<Prisma.RecipeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RecipeCountOutputTypeSelectSchema).nullish(),
}).strict();

export default RecipeCountOutputTypeSelectSchema;
