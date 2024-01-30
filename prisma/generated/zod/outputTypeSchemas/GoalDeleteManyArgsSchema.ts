import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalWhereInputSchema } from '../inputTypeSchemas/GoalWhereInputSchema'

export const GoalDeleteManyArgsSchema: z.ZodType<Prisma.GoalDeleteManyArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
}).strict() ;

export default GoalDeleteManyArgsSchema;
