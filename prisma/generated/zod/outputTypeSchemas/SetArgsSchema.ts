import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetSelectSchema } from '../inputTypeSchemas/SetSelectSchema';
import { SetIncludeSchema } from '../inputTypeSchemas/SetIncludeSchema';

export const SetArgsSchema: z.ZodType<Prisma.SetDefaultArgs> = z.object({
  select: z.lazy(() => SetSelectSchema).optional(),
  include: z.lazy(() => SetIncludeSchema).optional(),
}).strict();

export default SetArgsSchema;
