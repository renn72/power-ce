import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxWhereInputSchema } from '../inputTypeSchemas/OneRepMaxWhereInputSchema'
import { OneRepMaxOrderByWithRelationInputSchema } from '../inputTypeSchemas/OneRepMaxOrderByWithRelationInputSchema'
import { OneRepMaxWhereUniqueInputSchema } from '../inputTypeSchemas/OneRepMaxWhereUniqueInputSchema'

export const OneRepMaxAggregateArgsSchema: z.ZodType<Prisma.OneRepMaxAggregateArgs> = z.object({
  where: OneRepMaxWhereInputSchema.optional(),
  orderBy: z.union([ OneRepMaxOrderByWithRelationInputSchema.array(),OneRepMaxOrderByWithRelationInputSchema ]).optional(),
  cursor: OneRepMaxWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default OneRepMaxAggregateArgsSchema;
