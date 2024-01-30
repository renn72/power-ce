import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputSchema } from '../inputTypeSchemas/RecipeWhereInputSchema'
import { RecipeOrderByWithRelationInputSchema } from '../inputTypeSchemas/RecipeOrderByWithRelationInputSchema'
import { RecipeWhereUniqueInputSchema } from '../inputTypeSchemas/RecipeWhereUniqueInputSchema'

export const RecipeAggregateArgsSchema: z.ZodType<Prisma.RecipeAggregateArgs> = z.object({
  where: RecipeWhereInputSchema.optional(),
  orderBy: z.union([ RecipeOrderByWithRelationInputSchema.array(),RecipeOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RecipeAggregateArgsSchema;
