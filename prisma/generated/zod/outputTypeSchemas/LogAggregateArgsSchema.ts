import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogWhereInputSchema } from '../inputTypeSchemas/LogWhereInputSchema'
import { LogOrderByWithRelationInputSchema } from '../inputTypeSchemas/LogOrderByWithRelationInputSchema'
import { LogWhereUniqueInputSchema } from '../inputTypeSchemas/LogWhereUniqueInputSchema'

export const LogAggregateArgsSchema: z.ZodType<Prisma.LogAggregateArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default LogAggregateArgsSchema;
