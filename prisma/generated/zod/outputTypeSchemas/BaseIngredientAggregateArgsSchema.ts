import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientWhereInputSchema } from '../inputTypeSchemas/BaseIngredientWhereInputSchema'
import { BaseIngredientOrderByWithRelationInputSchema } from '../inputTypeSchemas/BaseIngredientOrderByWithRelationInputSchema'
import { BaseIngredientWhereUniqueInputSchema } from '../inputTypeSchemas/BaseIngredientWhereUniqueInputSchema'

export const BaseIngredientAggregateArgsSchema: z.ZodType<Prisma.BaseIngredientAggregateArgs> = z.object({
  where: BaseIngredientWhereInputSchema.optional(),
  orderBy: z.union([ BaseIngredientOrderByWithRelationInputSchema.array(),BaseIngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: BaseIngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BaseIngredientAggregateArgsSchema;
