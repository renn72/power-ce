import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TrainerToClientSelectSchema: z.ZodType<Prisma.TrainerToClientSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  clientId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
}).strict()

export default TrainerToClientSelectSchema;
