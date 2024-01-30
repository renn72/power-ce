import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockWhereInputSchema } from '../inputTypeSchemas/BlockWhereInputSchema'
import { BlockOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BlockOrderByWithAggregationInputSchema'
import { BlockScalarFieldEnumSchema } from '../inputTypeSchemas/BlockScalarFieldEnumSchema'
import { BlockScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BlockScalarWhereWithAggregatesInputSchema'

export const BlockGroupByArgsSchema: z.ZodType<Prisma.BlockGroupByArgs> = z.object({
  where: BlockWhereInputSchema.optional(),
  orderBy: z.union([ BlockOrderByWithAggregationInputSchema.array(),BlockOrderByWithAggregationInputSchema ]).optional(),
  by: BlockScalarFieldEnumSchema.array(),
  having: BlockScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BlockGroupByArgsSchema;
