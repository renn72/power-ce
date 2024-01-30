import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftSelectSchema } from '../inputTypeSchemas/LiftSelectSchema';
import { LiftIncludeSchema } from '../inputTypeSchemas/LiftIncludeSchema';

export const LiftArgsSchema: z.ZodType<Prisma.LiftDefaultArgs> = z.object({
  select: z.lazy(() => LiftSelectSchema).optional(),
  include: z.lazy(() => LiftIncludeSchema).optional(),
}).strict();

export default LiftArgsSchema;
