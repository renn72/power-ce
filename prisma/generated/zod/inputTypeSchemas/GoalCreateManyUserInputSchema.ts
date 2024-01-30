import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const GoalCreateManyUserInputSchema: z.ZodType<Prisma.GoalCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  goal: z.string(),
  date: z.coerce.date(),
  isComplete: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default GoalCreateManyUserInputSchema;
