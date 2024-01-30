import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanWhereInputSchema } from '../inputTypeSchemas/CompPlanWhereInputSchema'
import { CompPlanOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompPlanOrderByWithRelationInputSchema'
import { CompPlanWhereUniqueInputSchema } from '../inputTypeSchemas/CompPlanWhereUniqueInputSchema'

export const CompPlanAggregateArgsSchema: z.ZodType<Prisma.CompPlanAggregateArgs> = z.object({
  where: CompPlanWhereInputSchema.optional(),
  orderBy: z.union([ CompPlanOrderByWithRelationInputSchema.array(),CompPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: CompPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompPlanAggregateArgsSchema;
