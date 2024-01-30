import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftWhereInputSchema } from '../inputTypeSchemas/LiftWhereInputSchema'
import { LiftOrderByWithAggregationInputSchema } from '../inputTypeSchemas/LiftOrderByWithAggregationInputSchema'
import { LiftScalarFieldEnumSchema } from '../inputTypeSchemas/LiftScalarFieldEnumSchema'
import { LiftScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/LiftScalarWhereWithAggregatesInputSchema'

export const LiftGroupByArgsSchema: z.ZodType<Prisma.LiftGroupByArgs> = z.object({
  where: LiftWhereInputSchema.optional(),
  orderBy: z.union([ LiftOrderByWithAggregationInputSchema.array(),LiftOrderByWithAggregationInputSchema ]).optional(),
  by: LiftScalarFieldEnumSchema.array(),
  having: LiftScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default LiftGroupByArgsSchema;
