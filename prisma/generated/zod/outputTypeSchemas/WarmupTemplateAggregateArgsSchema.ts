import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateWhereInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereInputSchema'
import { WarmupTemplateOrderByWithRelationInputSchema } from '../inputTypeSchemas/WarmupTemplateOrderByWithRelationInputSchema'
import { WarmupTemplateWhereUniqueInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereUniqueInputSchema'

export const WarmupTemplateAggregateArgsSchema: z.ZodType<Prisma.WarmupTemplateAggregateArgs> = z.object({
  where: WarmupTemplateWhereInputSchema.optional(),
  orderBy: z.union([ WarmupTemplateOrderByWithRelationInputSchema.array(),WarmupTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: WarmupTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WarmupTemplateAggregateArgsSchema;
