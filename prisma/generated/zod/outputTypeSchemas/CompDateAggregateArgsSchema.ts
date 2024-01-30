import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateWhereInputSchema } from '../inputTypeSchemas/CompDateWhereInputSchema'
import { CompDateOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompDateOrderByWithRelationInputSchema'
import { CompDateWhereUniqueInputSchema } from '../inputTypeSchemas/CompDateWhereUniqueInputSchema'

export const CompDateAggregateArgsSchema: z.ZodType<Prisma.CompDateAggregateArgs> = z.object({
  where: CompDateWhereInputSchema.optional(),
  orderBy: z.union([ CompDateOrderByWithRelationInputSchema.array(),CompDateOrderByWithRelationInputSchema ]).optional(),
  cursor: CompDateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompDateAggregateArgsSchema;
