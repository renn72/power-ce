import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateIncludeSchema } from '../inputTypeSchemas/WarmupTemplateIncludeSchema'
import { WarmupTemplateWhereUniqueInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereUniqueInputSchema'
import { WarmupTemplateCreateInputSchema } from '../inputTypeSchemas/WarmupTemplateCreateInputSchema'
import { WarmupTemplateUncheckedCreateInputSchema } from '../inputTypeSchemas/WarmupTemplateUncheckedCreateInputSchema'
import { WarmupTemplateUpdateInputSchema } from '../inputTypeSchemas/WarmupTemplateUpdateInputSchema'
import { WarmupTemplateUncheckedUpdateInputSchema } from '../inputTypeSchemas/WarmupTemplateUncheckedUpdateInputSchema'
import { WarmupFindManyArgsSchema } from "../outputTypeSchemas/WarmupFindManyArgsSchema"
import { WarmupTemplateCountOutputTypeArgsSchema } from "../outputTypeSchemas/WarmupTemplateCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const WarmupTemplateUpsertArgsSchema: z.ZodType<Prisma.WarmupTemplateUpsertArgs> = z.object({
  select: WarmupTemplateSelectSchema.optional(),
  include: WarmupTemplateIncludeSchema.optional(),
  where: WarmupTemplateWhereUniqueInputSchema,
  create: z.union([ WarmupTemplateCreateInputSchema,WarmupTemplateUncheckedCreateInputSchema ]),
  update: z.union([ WarmupTemplateUpdateInputSchema,WarmupTemplateUncheckedUpdateInputSchema ]),
}).strict() ;

export default WarmupTemplateUpsertArgsSchema;
