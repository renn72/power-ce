import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUpdateManyMutationInputSchema } from '../inputTypeSchemas/RecipeUpdateManyMutationInputSchema'
import { RecipeUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RecipeUncheckedUpdateManyInputSchema'
import { RecipeWhereInputSchema } from '../inputTypeSchemas/RecipeWhereInputSchema'

export const RecipeUpdateManyArgsSchema: z.ZodType<Prisma.RecipeUpdateManyArgs> = z.object({
  data: z.union([ RecipeUpdateManyMutationInputSchema,RecipeUncheckedUpdateManyInputSchema ]),
  where: RecipeWhereInputSchema.optional(),
}).strict() ;

export default RecipeUpdateManyArgsSchema;
