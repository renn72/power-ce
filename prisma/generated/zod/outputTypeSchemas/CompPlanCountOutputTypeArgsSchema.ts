import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanCountOutputTypeSelectSchema } from './CompPlanCountOutputTypeSelectSchema';

export const CompPlanCountOutputTypeArgsSchema: z.ZodType<Prisma.CompPlanCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompPlanCountOutputTypeSelectSchema).nullish(),
}).strict();

export default CompPlanCountOutputTypeSelectSchema;
