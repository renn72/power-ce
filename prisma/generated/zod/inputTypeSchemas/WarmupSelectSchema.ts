import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateArgsSchema } from "../outputTypeSchemas/WarmupTemplateArgsSchema"

export const WarmupSelectSchema: z.ZodType<Prisma.WarmupSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  notes: z.boolean().optional(),
  name: z.boolean().optional(),
  link: z.boolean().optional(),
  warmupTemplateId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  warmupTemplate: z.union([z.boolean(),z.lazy(() => WarmupTemplateArgsSchema)]).optional(),
}).strict()

export default WarmupSelectSchema;
