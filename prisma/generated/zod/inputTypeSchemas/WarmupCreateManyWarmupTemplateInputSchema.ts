import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WarmupCreateManyWarmupTemplateInputSchema: z.ZodType<Prisma.WarmupCreateManyWarmupTemplateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  notes: z.string(),
  name: z.string(),
  link: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default WarmupCreateManyWarmupTemplateInputSchema;
