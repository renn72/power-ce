import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupWhereInputSchema } from '../inputTypeSchemas/WarmupWhereInputSchema'
import { WarmupOrderByWithRelationInputSchema } from '../inputTypeSchemas/WarmupOrderByWithRelationInputSchema'
import { WarmupWhereUniqueInputSchema } from '../inputTypeSchemas/WarmupWhereUniqueInputSchema'

export const WarmupAggregateArgsSchema: z.ZodType<Prisma.WarmupAggregateArgs> = z.object({
  where: WarmupWhereInputSchema.optional(),
  orderBy: z.union([ WarmupOrderByWithRelationInputSchema.array(),WarmupOrderByWithRelationInputSchema ]).optional(),
  cursor: WarmupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WarmupAggregateArgsSchema;
