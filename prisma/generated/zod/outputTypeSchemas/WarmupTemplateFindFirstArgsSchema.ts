import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateIncludeSchema } from '../inputTypeSchemas/WarmupTemplateIncludeSchema'
import { WarmupTemplateWhereInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereInputSchema'
import { WarmupTemplateOrderByWithRelationInputSchema } from '../inputTypeSchemas/WarmupTemplateOrderByWithRelationInputSchema'
import { WarmupTemplateWhereUniqueInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereUniqueInputSchema'
import { WarmupTemplateScalarFieldEnumSchema } from '../inputTypeSchemas/WarmupTemplateScalarFieldEnumSchema'
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

export const WarmupTemplateFindFirstArgsSchema: z.ZodType<Prisma.WarmupTemplateFindFirstArgs> = z.object({
  select: WarmupTemplateSelectSchema.optional(),
  include: WarmupTemplateIncludeSchema.optional(),
  where: WarmupTemplateWhereInputSchema.optional(),
  orderBy: z.union([ WarmupTemplateOrderByWithRelationInputSchema.array(),WarmupTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: WarmupTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WarmupTemplateScalarFieldEnumSchema,WarmupTemplateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default WarmupTemplateFindFirstArgsSchema;
