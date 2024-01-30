import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanCreateManyInputSchema } from '../inputTypeSchemas/CompPlanCreateManyInputSchema'

export const CompPlanCreateManyArgsSchema: z.ZodType<Prisma.CompPlanCreateManyArgs> = z.object({
  data: z.union([ CompPlanCreateManyInputSchema,CompPlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default CompPlanCreateManyArgsSchema;
