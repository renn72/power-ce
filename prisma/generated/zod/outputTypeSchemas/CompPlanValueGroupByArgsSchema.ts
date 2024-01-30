import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueWhereInputSchema } from '../inputTypeSchemas/CompPlanValueWhereInputSchema'
import { CompPlanValueOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CompPlanValueOrderByWithAggregationInputSchema'
import { CompPlanValueScalarFieldEnumSchema } from '../inputTypeSchemas/CompPlanValueScalarFieldEnumSchema'
import { CompPlanValueScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CompPlanValueScalarWhereWithAggregatesInputSchema'

export const CompPlanValueGroupByArgsSchema: z.ZodType<Prisma.CompPlanValueGroupByArgs> = z.object({
  where: CompPlanValueWhereInputSchema.optional(),
  orderBy: z.union([ CompPlanValueOrderByWithAggregationInputSchema.array(),CompPlanValueOrderByWithAggregationInputSchema ]).optional(),
  by: CompPlanValueScalarFieldEnumSchema.array(),
  having: CompPlanValueScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompPlanValueGroupByArgsSchema;
