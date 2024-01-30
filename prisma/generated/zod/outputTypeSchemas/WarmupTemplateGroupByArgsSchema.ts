import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateWhereInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereInputSchema'
import { WarmupTemplateOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WarmupTemplateOrderByWithAggregationInputSchema'
import { WarmupTemplateScalarFieldEnumSchema } from '../inputTypeSchemas/WarmupTemplateScalarFieldEnumSchema'
import { WarmupTemplateScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WarmupTemplateScalarWhereWithAggregatesInputSchema'

export const WarmupTemplateGroupByArgsSchema: z.ZodType<Prisma.WarmupTemplateGroupByArgs> = z.object({
  where: WarmupTemplateWhereInputSchema.optional(),
  orderBy: z.union([ WarmupTemplateOrderByWithAggregationInputSchema.array(),WarmupTemplateOrderByWithAggregationInputSchema ]).optional(),
  by: WarmupTemplateScalarFieldEnumSchema.array(),
  having: WarmupTemplateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WarmupTemplateGroupByArgsSchema;
