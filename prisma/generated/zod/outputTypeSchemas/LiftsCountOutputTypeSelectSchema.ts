import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const LiftsCountOutputTypeSelectSchema: z.ZodType<Prisma.LiftsCountOutputTypeSelect> = z.object({
  lift: z.boolean().optional(),
}).strict();

export default LiftsCountOutputTypeSelectSchema;
