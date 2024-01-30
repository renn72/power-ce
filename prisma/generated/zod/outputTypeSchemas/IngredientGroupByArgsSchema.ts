import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientWhereInputSchema } from '../inputTypeSchemas/IngredientWhereInputSchema'
import { IngredientOrderByWithAggregationInputSchema } from '../inputTypeSchemas/IngredientOrderByWithAggregationInputSchema'
import { IngredientScalarFieldEnumSchema } from '../inputTypeSchemas/IngredientScalarFieldEnumSchema'
import { IngredientScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/IngredientScalarWhereWithAggregatesInputSchema'

export const IngredientGroupByArgsSchema: z.ZodType<Prisma.IngredientGroupByArgs> = z.object({
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithAggregationInputSchema.array(),IngredientOrderByWithAggregationInputSchema ]).optional(),
  by: IngredientScalarFieldEnumSchema.array(),
  having: IngredientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default IngredientGroupByArgsSchema;
