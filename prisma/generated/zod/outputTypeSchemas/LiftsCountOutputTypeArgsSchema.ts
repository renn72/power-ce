import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsCountOutputTypeSelectSchema } from './LiftsCountOutputTypeSelectSchema';

export const LiftsCountOutputTypeArgsSchema: z.ZodType<Prisma.LiftsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LiftsCountOutputTypeSelectSchema).nullish(),
}).strict();

export default LiftsCountOutputTypeSelectSchema;
