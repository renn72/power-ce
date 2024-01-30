import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DailyLogWhereInputSchema } from '../inputTypeSchemas/DailyLogWhereInputSchema'
import { DailyLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/DailyLogOrderByWithRelationInputSchema'
import { DailyLogWhereUniqueInputSchema } from '../inputTypeSchemas/DailyLogWhereUniqueInputSchema'

export const DailyLogAggregateArgsSchema: z.ZodType<Prisma.DailyLogAggregateArgs> = z.object({
  where: DailyLogWhereInputSchema.optional(),
  orderBy: z.union([ DailyLogOrderByWithRelationInputSchema.array(),DailyLogOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default DailyLogAggregateArgsSchema;
