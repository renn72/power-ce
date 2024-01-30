import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalSelectSchema } from '../inputTypeSchemas/GoalSelectSchema';
import { GoalIncludeSchema } from '../inputTypeSchemas/GoalIncludeSchema';

export const GoalArgsSchema: z.ZodType<Prisma.GoalDefaultArgs> = z.object({
  select: z.lazy(() => GoalSelectSchema).optional(),
  include: z.lazy(() => GoalIncludeSchema).optional(),
}).strict();

export default GoalArgsSchema;
