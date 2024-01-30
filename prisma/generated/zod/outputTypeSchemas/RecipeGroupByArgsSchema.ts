import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputSchema } from '../inputTypeSchemas/RecipeWhereInputSchema'
import { RecipeOrderByWithAggregationInputSchema } from '../inputTypeSchemas/RecipeOrderByWithAggregationInputSchema'
import { RecipeScalarFieldEnumSchema } from '../inputTypeSchemas/RecipeScalarFieldEnumSchema'
import { RecipeScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/RecipeScalarWhereWithAggregatesInputSchema'

export const RecipeGroupByArgsSchema: z.ZodType<Prisma.RecipeGroupByArgs> = z.object({
  where: RecipeWhereInputSchema.optional(),
  orderBy: z.union([ RecipeOrderByWithAggregationInputSchema.array(),RecipeOrderByWithAggregationInputSchema ]).optional(),
  by: RecipeScalarFieldEnumSchema.array(),
  having: RecipeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RecipeGroupByArgsSchema;
