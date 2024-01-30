import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const GoalUncheckedCreateInputSchema: z.ZodType<Prisma.GoalUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  goal: z.string(),
  date: z.coerce.date(),
  isComplete: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default GoalUncheckedCreateInputSchema;
