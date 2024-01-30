import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateCreateNestedOneWithoutWarmupsInputSchema } from './WarmupTemplateCreateNestedOneWithoutWarmupsInputSchema';

export const WarmupCreateInputSchema: z.ZodType<Prisma.WarmupCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  notes: z.string(),
  name: z.string(),
  link: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  warmupTemplate: z.lazy(() => WarmupTemplateCreateNestedOneWithoutWarmupsInputSchema)
}).strict();

export default WarmupCreateInputSchema;
