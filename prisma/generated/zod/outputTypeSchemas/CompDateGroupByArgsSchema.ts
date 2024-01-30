import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateWhereInputSchema } from '../inputTypeSchemas/CompDateWhereInputSchema'
import { CompDateOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CompDateOrderByWithAggregationInputSchema'
import { CompDateScalarFieldEnumSchema } from '../inputTypeSchemas/CompDateScalarFieldEnumSchema'
import { CompDateScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CompDateScalarWhereWithAggregatesInputSchema'

export const CompDateGroupByArgsSchema: z.ZodType<Prisma.CompDateGroupByArgs> = z.object({
  where: CompDateWhereInputSchema.optional(),
  orderBy: z.union([ CompDateOrderByWithAggregationInputSchema.array(),CompDateOrderByWithAggregationInputSchema ]).optional(),
  by: CompDateScalarFieldEnumSchema.array(),
  having: CompDateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompDateGroupByArgsSchema;
