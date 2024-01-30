import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DaySelectSchema } from '../inputTypeSchemas/DaySelectSchema';
import { DayIncludeSchema } from '../inputTypeSchemas/DayIncludeSchema';

export const DayArgsSchema: z.ZodType<Prisma.DayDefaultArgs> = z.object({
  select: z.lazy(() => DaySelectSchema).optional(),
  include: z.lazy(() => DayIncludeSchema).optional(),
}).strict();

export default DayArgsSchema;
