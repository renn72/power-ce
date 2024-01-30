import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetSelectSchema } from '../inputTypeSchemas/SuperSetSelectSchema';
import { SuperSetIncludeSchema } from '../inputTypeSchemas/SuperSetIncludeSchema';

export const SuperSetArgsSchema: z.ZodType<Prisma.SuperSetDefaultArgs> = z.object({
  select: z.lazy(() => SuperSetSelectSchema).optional(),
  include: z.lazy(() => SuperSetIncludeSchema).optional(),
}).strict();

export default SuperSetArgsSchema;
