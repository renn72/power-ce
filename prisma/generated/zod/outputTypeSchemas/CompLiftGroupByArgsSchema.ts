import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftWhereInputSchema } from '../inputTypeSchemas/CompLiftWhereInputSchema'
import { CompLiftOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CompLiftOrderByWithAggregationInputSchema'
import { CompLiftScalarFieldEnumSchema } from '../inputTypeSchemas/CompLiftScalarFieldEnumSchema'
import { CompLiftScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CompLiftScalarWhereWithAggregatesInputSchema'

export const CompLiftGroupByArgsSchema: z.ZodType<Prisma.CompLiftGroupByArgs> = z.object({
  where: CompLiftWhereInputSchema.optional(),
  orderBy: z.union([ CompLiftOrderByWithAggregationInputSchema.array(),CompLiftOrderByWithAggregationInputSchema ]).optional(),
  by: CompLiftScalarFieldEnumSchema.array(),
  having: CompLiftScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompLiftGroupByArgsSchema;
