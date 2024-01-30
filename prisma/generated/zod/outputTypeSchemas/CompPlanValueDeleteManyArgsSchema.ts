import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueWhereInputSchema } from '../inputTypeSchemas/CompPlanValueWhereInputSchema'

export const CompPlanValueDeleteManyArgsSchema: z.ZodType<Prisma.CompPlanValueDeleteManyArgs> = z.object({
  where: CompPlanValueWhereInputSchema.optional(),
}).strict() ;

export default CompPlanValueDeleteManyArgsSchema;
