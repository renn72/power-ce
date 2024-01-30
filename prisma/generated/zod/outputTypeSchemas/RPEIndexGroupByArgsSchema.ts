import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexWhereInputSchema } from '../inputTypeSchemas/RPEIndexWhereInputSchema'
import { RPEIndexOrderByWithAggregationInputSchema } from '../inputTypeSchemas/RPEIndexOrderByWithAggregationInputSchema'
import { RPEIndexScalarFieldEnumSchema } from '../inputTypeSchemas/RPEIndexScalarFieldEnumSchema'
import { RPEIndexScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/RPEIndexScalarWhereWithAggregatesInputSchema'

export const RPEIndexGroupByArgsSchema: z.ZodType<Prisma.RPEIndexGroupByArgs> = z.object({
  where: RPEIndexWhereInputSchema.optional(),
  orderBy: z.union([ RPEIndexOrderByWithAggregationInputSchema.array(),RPEIndexOrderByWithAggregationInputSchema ]).optional(),
  by: RPEIndexScalarFieldEnumSchema.array(),
  having: RPEIndexScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RPEIndexGroupByArgsSchema;
