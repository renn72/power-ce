import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexWhereInputSchema } from '../inputTypeSchemas/RPEIndexWhereInputSchema'
import { RPEIndexOrderByWithRelationInputSchema } from '../inputTypeSchemas/RPEIndexOrderByWithRelationInputSchema'
import { RPEIndexWhereUniqueInputSchema } from '../inputTypeSchemas/RPEIndexWhereUniqueInputSchema'

export const RPEIndexAggregateArgsSchema: z.ZodType<Prisma.RPEIndexAggregateArgs> = z.object({
  where: RPEIndexWhereInputSchema.optional(),
  orderBy: z.union([ RPEIndexOrderByWithRelationInputSchema.array(),RPEIndexOrderByWithRelationInputSchema ]).optional(),
  cursor: RPEIndexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RPEIndexAggregateArgsSchema;
