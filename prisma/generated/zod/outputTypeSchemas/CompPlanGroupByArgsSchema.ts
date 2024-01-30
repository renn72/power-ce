import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanWhereInputSchema } from '../inputTypeSchemas/CompPlanWhereInputSchema'
import { CompPlanOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CompPlanOrderByWithAggregationInputSchema'
import { CompPlanScalarFieldEnumSchema } from '../inputTypeSchemas/CompPlanScalarFieldEnumSchema'
import { CompPlanScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CompPlanScalarWhereWithAggregatesInputSchema'

export const CompPlanGroupByArgsSchema: z.ZodType<Prisma.CompPlanGroupByArgs> = z.object({
  where: CompPlanWhereInputSchema.optional(),
  orderBy: z.union([ CompPlanOrderByWithAggregationInputSchema.array(),CompPlanOrderByWithAggregationInputSchema ]).optional(),
  by: CompPlanScalarFieldEnumSchema.array(),
  having: CompPlanScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompPlanGroupByArgsSchema;
