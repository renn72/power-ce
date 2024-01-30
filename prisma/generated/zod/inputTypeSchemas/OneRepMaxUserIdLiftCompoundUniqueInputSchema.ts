import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const OneRepMaxUserIdLiftCompoundUniqueInputSchema: z.ZodType<Prisma.OneRepMaxUserIdLiftCompoundUniqueInput> = z.object({
  userId: z.string(),
  lift: z.string()
}).strict();

export default OneRepMaxUserIdLiftCompoundUniqueInputSchema;
