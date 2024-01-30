import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsWhereInputSchema } from '../inputTypeSchemas/LiftsWhereInputSchema'
import { LiftsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/LiftsOrderByWithAggregationInputSchema'
import { LiftsScalarFieldEnumSchema } from '../inputTypeSchemas/LiftsScalarFieldEnumSchema'
import { LiftsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/LiftsScalarWhereWithAggregatesInputSchema'

export const LiftsGroupByArgsSchema: z.ZodType<Prisma.LiftsGroupByArgs> = z.object({
  where: LiftsWhereInputSchema.optional(),
  orderBy: z.union([ LiftsOrderByWithAggregationInputSchema.array(),LiftsOrderByWithAggregationInputSchema ]).optional(),
  by: LiftsScalarFieldEnumSchema.array(),
  having: LiftsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default LiftsGroupByArgsSchema;
