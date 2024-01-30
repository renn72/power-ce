import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayWhereInputSchema } from '../inputTypeSchemas/DayWhereInputSchema'
import { DayOrderByWithAggregationInputSchema } from '../inputTypeSchemas/DayOrderByWithAggregationInputSchema'
import { DayScalarFieldEnumSchema } from '../inputTypeSchemas/DayScalarFieldEnumSchema'
import { DayScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/DayScalarWhereWithAggregatesInputSchema'

export const DayGroupByArgsSchema: z.ZodType<Prisma.DayGroupByArgs> = z.object({
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithAggregationInputSchema.array(),DayOrderByWithAggregationInputSchema ]).optional(),
  by: DayScalarFieldEnumSchema.array(),
  having: DayScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default DayGroupByArgsSchema;
