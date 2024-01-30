import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftWhereInputSchema } from '../inputTypeSchemas/CompLiftWhereInputSchema'
import { CompLiftOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompLiftOrderByWithRelationInputSchema'
import { CompLiftWhereUniqueInputSchema } from '../inputTypeSchemas/CompLiftWhereUniqueInputSchema'

export const CompLiftAggregateArgsSchema: z.ZodType<Prisma.CompLiftAggregateArgs> = z.object({
  where: CompLiftWhereInputSchema.optional(),
  orderBy: z.union([ CompLiftOrderByWithRelationInputSchema.array(),CompLiftOrderByWithRelationInputSchema ]).optional(),
  cursor: CompLiftWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompLiftAggregateArgsSchema;
