import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueWhereInputSchema } from '../inputTypeSchemas/CompPlanValueWhereInputSchema'
import { CompPlanValueOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompPlanValueOrderByWithRelationInputSchema'
import { CompPlanValueWhereUniqueInputSchema } from '../inputTypeSchemas/CompPlanValueWhereUniqueInputSchema'

export const CompPlanValueAggregateArgsSchema: z.ZodType<Prisma.CompPlanValueAggregateArgs> = z.object({
  where: CompPlanValueWhereInputSchema.optional(),
  orderBy: z.union([ CompPlanValueOrderByWithRelationInputSchema.array(),CompPlanValueOrderByWithRelationInputSchema ]).optional(),
  cursor: CompPlanValueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompPlanValueAggregateArgsSchema;
