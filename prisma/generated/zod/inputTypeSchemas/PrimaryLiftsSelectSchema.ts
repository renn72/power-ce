import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const PrimaryLiftsSelectSchema: z.ZodType<Prisma.PrimaryLiftsSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  creadedBy: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
}).strict()

export default PrimaryLiftsSelectSchema;
