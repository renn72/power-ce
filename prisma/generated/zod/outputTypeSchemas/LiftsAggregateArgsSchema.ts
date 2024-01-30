import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsWhereInputSchema } from '../inputTypeSchemas/LiftsWhereInputSchema'
import { LiftsOrderByWithRelationInputSchema } from '../inputTypeSchemas/LiftsOrderByWithRelationInputSchema'
import { LiftsWhereUniqueInputSchema } from '../inputTypeSchemas/LiftsWhereUniqueInputSchema'

export const LiftsAggregateArgsSchema: z.ZodType<Prisma.LiftsAggregateArgs> = z.object({
  where: LiftsWhereInputSchema.optional(),
  orderBy: z.union([ LiftsOrderByWithRelationInputSchema.array(),LiftsOrderByWithRelationInputSchema ]).optional(),
  cursor: LiftsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default LiftsAggregateArgsSchema;
