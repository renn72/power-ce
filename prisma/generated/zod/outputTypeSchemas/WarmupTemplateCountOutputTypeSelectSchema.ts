import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const WarmupTemplateCountOutputTypeSelectSchema: z.ZodType<Prisma.WarmupTemplateCountOutputTypeSelect> = z.object({
  warmups: z.boolean().optional(),
}).strict();

export default WarmupTemplateCountOutputTypeSelectSchema;
