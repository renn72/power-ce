import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const LiftsCreateWithoutLiftInputSchema: z.ZodType<Prisma.LiftsCreateWithoutLiftInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default LiftsCreateWithoutLiftInputSchema;
