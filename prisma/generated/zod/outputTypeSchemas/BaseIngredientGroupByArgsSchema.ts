import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientWhereInputSchema } from '../inputTypeSchemas/BaseIngredientWhereInputSchema'
import { BaseIngredientOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BaseIngredientOrderByWithAggregationInputSchema'
import { BaseIngredientScalarFieldEnumSchema } from '../inputTypeSchemas/BaseIngredientScalarFieldEnumSchema'
import { BaseIngredientScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BaseIngredientScalarWhereWithAggregatesInputSchema'

export const BaseIngredientGroupByArgsSchema: z.ZodType<Prisma.BaseIngredientGroupByArgs> = z.object({
  where: BaseIngredientWhereInputSchema.optional(),
  orderBy: z.union([ BaseIngredientOrderByWithAggregationInputSchema.array(),BaseIngredientOrderByWithAggregationInputSchema ]).optional(),
  by: BaseIngredientScalarFieldEnumSchema.array(),
  having: BaseIngredientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BaseIngredientGroupByArgsSchema;
