import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputSchema } from '../inputTypeSchemas/RecipeWhereInputSchema'

export const RecipeDeleteManyArgsSchema: z.ZodType<Prisma.RecipeDeleteManyArgs> = z.object({
  where: RecipeWhereInputSchema.optional(),
}).strict() ;

export default RecipeDeleteManyArgsSchema;
