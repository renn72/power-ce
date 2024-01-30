import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetWhereInputSchema } from '../inputTypeSchemas/SetWhereInputSchema'
import { SetOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SetOrderByWithAggregationInputSchema'
import { SetScalarFieldEnumSchema } from '../inputTypeSchemas/SetScalarFieldEnumSchema'
import { SetScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SetScalarWhereWithAggregatesInputSchema'

export const SetGroupByArgsSchema: z.ZodType<Prisma.SetGroupByArgs> = z.object({
  where: SetWhereInputSchema.optional(),
  orderBy: z.union([ SetOrderByWithAggregationInputSchema.array(),SetOrderByWithAggregationInputSchema ]).optional(),
  by: SetScalarFieldEnumSchema.array(),
  having: SetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SetGroupByArgsSchema;
