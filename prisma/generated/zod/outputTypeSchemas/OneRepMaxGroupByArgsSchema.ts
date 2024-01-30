import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxWhereInputSchema } from '../inputTypeSchemas/OneRepMaxWhereInputSchema'
import { OneRepMaxOrderByWithAggregationInputSchema } from '../inputTypeSchemas/OneRepMaxOrderByWithAggregationInputSchema'
import { OneRepMaxScalarFieldEnumSchema } from '../inputTypeSchemas/OneRepMaxScalarFieldEnumSchema'
import { OneRepMaxScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/OneRepMaxScalarWhereWithAggregatesInputSchema'

export const OneRepMaxGroupByArgsSchema: z.ZodType<Prisma.OneRepMaxGroupByArgs> = z.object({
  where: OneRepMaxWhereInputSchema.optional(),
  orderBy: z.union([ OneRepMaxOrderByWithAggregationInputSchema.array(),OneRepMaxOrderByWithAggregationInputSchema ]).optional(),
  by: OneRepMaxScalarFieldEnumSchema.array(),
  having: OneRepMaxScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default OneRepMaxGroupByArgsSchema;
