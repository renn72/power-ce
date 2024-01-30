import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsSelectSchema } from '../inputTypeSchemas/LiftsSelectSchema';
import { LiftsIncludeSchema } from '../inputTypeSchemas/LiftsIncludeSchema';

export const LiftsArgsSchema: z.ZodType<Prisma.LiftsDefaultArgs> = z.object({
  select: z.lazy(() => LiftsSelectSchema).optional(),
  include: z.lazy(() => LiftsIncludeSchema).optional(),
}).strict();

export default LiftsArgsSchema;
