import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DailyLogSelectSchema } from '../inputTypeSchemas/DailyLogSelectSchema';
import { DailyLogIncludeSchema } from '../inputTypeSchemas/DailyLogIncludeSchema';

export const DailyLogArgsSchema: z.ZodType<Prisma.DailyLogDefaultArgs> = z.object({
  select: z.lazy(() => DailyLogSelectSchema).optional(),
  include: z.lazy(() => DailyLogIncludeSchema).optional(),
}).strict();

export default DailyLogArgsSchema;
