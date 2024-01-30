import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetWhereInputSchema } from '../inputTypeSchemas/SuperSetWhereInputSchema'
import { SuperSetOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SuperSetOrderByWithAggregationInputSchema'
import { SuperSetScalarFieldEnumSchema } from '../inputTypeSchemas/SuperSetScalarFieldEnumSchema'
import { SuperSetScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SuperSetScalarWhereWithAggregatesInputSchema'

export const SuperSetGroupByArgsSchema: z.ZodType<Prisma.SuperSetGroupByArgs> = z.object({
  where: SuperSetWhereInputSchema.optional(),
  orderBy: z.union([ SuperSetOrderByWithAggregationInputSchema.array(),SuperSetOrderByWithAggregationInputSchema ]).optional(),
  by: SuperSetScalarFieldEnumSchema.array(),
  having: SuperSetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SuperSetGroupByArgsSchema;
