import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientWhereInputSchema } from '../inputTypeSchemas/IngredientWhereInputSchema'
import { IngredientOrderByWithRelationInputSchema } from '../inputTypeSchemas/IngredientOrderByWithRelationInputSchema'
import { IngredientWhereUniqueInputSchema } from '../inputTypeSchemas/IngredientWhereUniqueInputSchema'

export const IngredientAggregateArgsSchema: z.ZodType<Prisma.IngredientAggregateArgs> = z.object({
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithRelationInputSchema.array(),IngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default IngredientAggregateArgsSchema;
