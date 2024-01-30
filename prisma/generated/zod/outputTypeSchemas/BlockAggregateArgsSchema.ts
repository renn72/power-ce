import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockWhereInputSchema } from '../inputTypeSchemas/BlockWhereInputSchema'
import { BlockOrderByWithRelationInputSchema } from '../inputTypeSchemas/BlockOrderByWithRelationInputSchema'
import { BlockWhereUniqueInputSchema } from '../inputTypeSchemas/BlockWhereUniqueInputSchema'

export const BlockAggregateArgsSchema: z.ZodType<Prisma.BlockAggregateArgs> = z.object({
  where: BlockWhereInputSchema.optional(),
  orderBy: z.union([ BlockOrderByWithRelationInputSchema.array(),BlockOrderByWithRelationInputSchema ]).optional(),
  cursor: BlockWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BlockAggregateArgsSchema;
