import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanWhereInputSchema } from '../inputTypeSchemas/CompPlanWhereInputSchema'

export const CompPlanDeleteManyArgsSchema: z.ZodType<Prisma.CompPlanDeleteManyArgs> = z.object({
  where: CompPlanWhereInputSchema.optional(),
}).strict() ;

export default CompPlanDeleteManyArgsSchema;
