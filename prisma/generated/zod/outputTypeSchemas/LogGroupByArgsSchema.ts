import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogWhereInputSchema } from '../inputTypeSchemas/LogWhereInputSchema'
import { LogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/LogOrderByWithAggregationInputSchema'
import { LogScalarFieldEnumSchema } from '../inputTypeSchemas/LogScalarFieldEnumSchema'
import { LogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/LogScalarWhereWithAggregatesInputSchema'

export const LogGroupByArgsSchema: z.ZodType<Prisma.LogGroupByArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithAggregationInputSchema.array(),LogOrderByWithAggregationInputSchema ]).optional(),
  by: LogScalarFieldEnumSchema.array(),
  having: LogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default LogGroupByArgsSchema;
