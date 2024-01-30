import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const RecordSelectSchema: z.ZodType<Prisma.RecordSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  date: z.boolean().optional(),
  lift: z.boolean().optional(),
  wc: z.boolean().optional(),
  gender: z.boolean().optional(),
  name: z.boolean().optional(),
  weight: z.boolean().optional(),
  userId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}).strict()

export default RecordSelectSchema;
