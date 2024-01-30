import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalWhereInputSchema } from '../inputTypeSchemas/GoalWhereInputSchema'
import { GoalOrderByWithRelationInputSchema } from '../inputTypeSchemas/GoalOrderByWithRelationInputSchema'
import { GoalWhereUniqueInputSchema } from '../inputTypeSchemas/GoalWhereUniqueInputSchema'

export const GoalAggregateArgsSchema: z.ZodType<Prisma.GoalAggregateArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default GoalAggregateArgsSchema;
