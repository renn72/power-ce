import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsWhereInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereInputSchema'
import { PrimaryLiftsOrderByWithRelationInputSchema } from '../inputTypeSchemas/PrimaryLiftsOrderByWithRelationInputSchema'
import { PrimaryLiftsWhereUniqueInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereUniqueInputSchema'

export const PrimaryLiftsAggregateArgsSchema: z.ZodType<Prisma.PrimaryLiftsAggregateArgs> = z.object({
  where: PrimaryLiftsWhereInputSchema.optional(),
  orderBy: z.union([ PrimaryLiftsOrderByWithRelationInputSchema.array(),PrimaryLiftsOrderByWithRelationInputSchema ]).optional(),
  cursor: PrimaryLiftsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default PrimaryLiftsAggregateArgsSchema;
