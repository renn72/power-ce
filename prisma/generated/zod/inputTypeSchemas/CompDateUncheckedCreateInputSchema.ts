import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CompDateUncheckedCreateInputSchema: z.ZodType<Prisma.CompDateUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable()
}).strict();

export default CompDateUncheckedCreateInputSchema;
