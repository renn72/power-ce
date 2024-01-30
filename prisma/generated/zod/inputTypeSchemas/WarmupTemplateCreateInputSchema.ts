import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupCreateNestedManyWithoutWarmupTemplateInputSchema } from './WarmupCreateNestedManyWithoutWarmupTemplateInputSchema';

export const WarmupTemplateCreateInputSchema: z.ZodType<Prisma.WarmupTemplateCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  warmups: z.lazy(() => WarmupCreateNestedManyWithoutWarmupTemplateInputSchema).optional()
}).strict();

export default WarmupTemplateCreateInputSchema;
