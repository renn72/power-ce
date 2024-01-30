import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressWhereInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereInputSchema'
import { CompLiftAddressOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CompLiftAddressOrderByWithAggregationInputSchema'
import { CompLiftAddressScalarFieldEnumSchema } from '../inputTypeSchemas/CompLiftAddressScalarFieldEnumSchema'
import { CompLiftAddressScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CompLiftAddressScalarWhereWithAggregatesInputSchema'

export const CompLiftAddressGroupByArgsSchema: z.ZodType<Prisma.CompLiftAddressGroupByArgs> = z.object({
  where: CompLiftAddressWhereInputSchema.optional(),
  orderBy: z.union([ CompLiftAddressOrderByWithAggregationInputSchema.array(),CompLiftAddressOrderByWithAggregationInputSchema ]).optional(),
  by: CompLiftAddressScalarFieldEnumSchema.array(),
  having: CompLiftAddressScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompLiftAddressGroupByArgsSchema;
