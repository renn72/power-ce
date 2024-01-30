import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalWhereInputSchema } from '../inputTypeSchemas/GoalWhereInputSchema'
import { GoalOrderByWithAggregationInputSchema } from '../inputTypeSchemas/GoalOrderByWithAggregationInputSchema'
import { GoalScalarFieldEnumSchema } from '../inputTypeSchemas/GoalScalarFieldEnumSchema'
import { GoalScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/GoalScalarWhereWithAggregatesInputSchema'

export const GoalGroupByArgsSchema: z.ZodType<Prisma.GoalGroupByArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithAggregationInputSchema.array(),GoalOrderByWithAggregationInputSchema ]).optional(),
  by: GoalScalarFieldEnumSchema.array(),
  having: GoalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default GoalGroupByArgsSchema;
