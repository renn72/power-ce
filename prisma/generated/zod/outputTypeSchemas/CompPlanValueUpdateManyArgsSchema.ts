import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueUpdateManyMutationInputSchema } from '../inputTypeSchemas/CompPlanValueUpdateManyMutationInputSchema'
import { CompPlanValueUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CompPlanValueUncheckedUpdateManyInputSchema'
import { CompPlanValueWhereInputSchema } from '../inputTypeSchemas/CompPlanValueWhereInputSchema'

export const CompPlanValueUpdateManyArgsSchema: z.ZodType<Prisma.CompPlanValueUpdateManyArgs> = z.object({
  data: z.union([ CompPlanValueUpdateManyMutationInputSchema,CompPlanValueUncheckedUpdateManyInputSchema ]),
  where: CompPlanValueWhereInputSchema.optional(),
}).strict() ;

export default CompPlanValueUpdateManyArgsSchema;
