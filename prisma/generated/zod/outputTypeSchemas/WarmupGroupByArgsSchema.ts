import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupWhereInputSchema } from '../inputTypeSchemas/WarmupWhereInputSchema'
import { WarmupOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WarmupOrderByWithAggregationInputSchema'
import { WarmupScalarFieldEnumSchema } from '../inputTypeSchemas/WarmupScalarFieldEnumSchema'
import { WarmupScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WarmupScalarWhereWithAggregatesInputSchema'

export const WarmupGroupByArgsSchema: z.ZodType<Prisma.WarmupGroupByArgs> = z.object({
  where: WarmupWhereInputSchema.optional(),
  orderBy: z.union([ WarmupOrderByWithAggregationInputSchema.array(),WarmupOrderByWithAggregationInputSchema ]).optional(),
  by: WarmupScalarFieldEnumSchema.array(),
  having: WarmupScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WarmupGroupByArgsSchema;
