import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalUpdateManyMutationInputSchema } from '../inputTypeSchemas/GoalUpdateManyMutationInputSchema'
import { GoalUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/GoalUncheckedUpdateManyInputSchema'
import { GoalWhereInputSchema } from '../inputTypeSchemas/GoalWhereInputSchema'

export const GoalUpdateManyArgsSchema: z.ZodType<Prisma.GoalUpdateManyArgs> = z.object({
  data: z.union([ GoalUpdateManyMutationInputSchema,GoalUncheckedUpdateManyInputSchema ]),
  where: GoalWhereInputSchema.optional(),
}).strict() ;

export default GoalUpdateManyArgsSchema;
