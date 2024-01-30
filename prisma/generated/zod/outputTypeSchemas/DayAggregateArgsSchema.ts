import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayWhereInputSchema } from '../inputTypeSchemas/DayWhereInputSchema'
import { DayOrderByWithRelationInputSchema } from '../inputTypeSchemas/DayOrderByWithRelationInputSchema'
import { DayWhereUniqueInputSchema } from '../inputTypeSchemas/DayWhereUniqueInputSchema'

export const DayAggregateArgsSchema: z.ZodType<Prisma.DayAggregateArgs> = z.object({
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithRelationInputSchema.array(),DayOrderByWithRelationInputSchema ]).optional(),
  cursor: DayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default DayAggregateArgsSchema;
