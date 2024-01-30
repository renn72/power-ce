import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueCreateManyInputSchema } from '../inputTypeSchemas/CompPlanValueCreateManyInputSchema'

export const CompPlanValueCreateManyArgsSchema: z.ZodType<Prisma.CompPlanValueCreateManyArgs> = z.object({
  data: z.union([ CompPlanValueCreateManyInputSchema,CompPlanValueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default CompPlanValueCreateManyArgsSchema;
