import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupFindManyArgsSchema } from "../outputTypeSchemas/WarmupFindManyArgsSchema"
import { WarmupTemplateCountOutputTypeArgsSchema } from "../outputTypeSchemas/WarmupTemplateCountOutputTypeArgsSchema"

export const WarmupTemplateSelectSchema: z.ZodType<Prisma.WarmupTemplateSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  name: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  warmups: z.union([z.boolean(),z.lazy(() => WarmupFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WarmupTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WarmupTemplateSelectSchema;
