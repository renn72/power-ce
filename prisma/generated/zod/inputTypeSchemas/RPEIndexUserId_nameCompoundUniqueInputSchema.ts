import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RPEIndexUserId_nameCompoundUniqueInputSchema: z.ZodType<Prisma.RPEIndexUserId_nameCompoundUniqueInput> = z.object({
  userId: z.string(),
  name: z.string()
}).strict();

export default RPEIndexUserId_nameCompoundUniqueInputSchema;
