import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateSelectSchema } from '../inputTypeSchemas/WarmupTemplateSelectSchema';
import { WarmupTemplateIncludeSchema } from '../inputTypeSchemas/WarmupTemplateIncludeSchema';

export const WarmupTemplateArgsSchema: z.ZodType<Prisma.WarmupTemplateDefaultArgs> = z.object({
  select: z.lazy(() => WarmupTemplateSelectSchema).optional(),
  include: z.lazy(() => WarmupTemplateIncludeSchema).optional(),
}).strict();

export default WarmupTemplateArgsSchema;
