import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsWhereInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereInputSchema'
import { PrimaryLiftsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/PrimaryLiftsOrderByWithAggregationInputSchema'
import { PrimaryLiftsScalarFieldEnumSchema } from '../inputTypeSchemas/PrimaryLiftsScalarFieldEnumSchema'
import { PrimaryLiftsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/PrimaryLiftsScalarWhereWithAggregatesInputSchema'

export const PrimaryLiftsGroupByArgsSchema: z.ZodType<Prisma.PrimaryLiftsGroupByArgs> = z.object({
  where: PrimaryLiftsWhereInputSchema.optional(),
  orderBy: z.union([ PrimaryLiftsOrderByWithAggregationInputSchema.array(),PrimaryLiftsOrderByWithAggregationInputSchema ]).optional(),
  by: PrimaryLiftsScalarFieldEnumSchema.array(),
  having: PrimaryLiftsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default PrimaryLiftsGroupByArgsSchema;
