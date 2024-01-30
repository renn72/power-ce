import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WarmupTemplateCreateWithoutWarmupsInputSchema: z.ZodType<Prisma.WarmupTemplateCreateWithoutWarmupsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default WarmupTemplateCreateWithoutWarmupsInputSchema;
