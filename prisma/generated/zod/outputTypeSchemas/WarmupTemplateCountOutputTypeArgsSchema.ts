import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateCountOutputTypeSelectSchema } from './WarmupTemplateCountOutputTypeSelectSchema';

export const WarmupTemplateCountOutputTypeArgsSchema: z.ZodType<Prisma.WarmupTemplateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WarmupTemplateCountOutputTypeSelectSchema).nullish(),
}).strict();

export default WarmupTemplateCountOutputTypeSelectSchema;
