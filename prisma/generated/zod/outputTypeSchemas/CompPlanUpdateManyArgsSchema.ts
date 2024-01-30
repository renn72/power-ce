import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanUpdateManyMutationInputSchema } from '../inputTypeSchemas/CompPlanUpdateManyMutationInputSchema'
import { CompPlanUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CompPlanUncheckedUpdateManyInputSchema'
import { CompPlanWhereInputSchema } from '../inputTypeSchemas/CompPlanWhereInputSchema'

export const CompPlanUpdateManyArgsSchema: z.ZodType<Prisma.CompPlanUpdateManyArgs> = z.object({
  data: z.union([ CompPlanUpdateManyMutationInputSchema,CompPlanUncheckedUpdateManyInputSchema ]),
  where: CompPlanWhereInputSchema.optional(),
}).strict() ;

export default CompPlanUpdateManyArgsSchema;
