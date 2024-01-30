import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupIncludeSchema } from '../inputTypeSchemas/WarmupIncludeSchema'
import { WarmupCreateInputSchema } from '../inputTypeSchemas/WarmupCreateInputSchema'
import { WarmupUncheckedCreateInputSchema } from '../inputTypeSchemas/WarmupUncheckedCreateInputSchema'
import { WarmupTemplateArgsSchema } from "../outputTypeSchemas/WarmupTemplateArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const WarmupCreateArgsSchema: z.ZodType<Prisma.WarmupCreateArgs> = z.object({
  select: WarmupSelectSchema.optional(),
  include: WarmupIncludeSchema.optional(),
  data: z.union([ WarmupCreateInputSchema,WarmupUncheckedCreateInputSchema ]),
}).strict() ;

export default WarmupCreateArgsSchema;
