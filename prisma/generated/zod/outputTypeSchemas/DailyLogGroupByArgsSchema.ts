import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DailyLogWhereInputSchema } from '../inputTypeSchemas/DailyLogWhereInputSchema'
import { DailyLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/DailyLogOrderByWithAggregationInputSchema'
import { DailyLogScalarFieldEnumSchema } from '../inputTypeSchemas/DailyLogScalarFieldEnumSchema'
import { DailyLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/DailyLogScalarWhereWithAggregatesInputSchema'

export const DailyLogGroupByArgsSchema: z.ZodType<Prisma.DailyLogGroupByArgs> = z.object({
  where: DailyLogWhereInputSchema.optional(),
  orderBy: z.union([ DailyLogOrderByWithAggregationInputSchema.array(),DailyLogOrderByWithAggregationInputSchema ]).optional(),
  by: DailyLogScalarFieldEnumSchema.array(),
  having: DailyLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default DailyLogGroupByArgsSchema;
