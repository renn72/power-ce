import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalCreateManyInputSchema } from '../inputTypeSchemas/GoalCreateManyInputSchema'

export const GoalCreateManyArgsSchema: z.ZodType<Prisma.GoalCreateManyArgs> = z.object({
  data: z.union([ GoalCreateManyInputSchema,GoalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default GoalCreateManyArgsSchema;
