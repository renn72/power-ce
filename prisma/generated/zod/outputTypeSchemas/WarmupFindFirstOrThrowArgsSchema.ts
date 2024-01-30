import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupIncludeSchema } from '../inputTypeSchemas/WarmupIncludeSchema'
import { WarmupWhereInputSchema } from '../inputTypeSchemas/WarmupWhereInputSchema'
import { WarmupOrderByWithRelationInputSchema } from '../inputTypeSchemas/WarmupOrderByWithRelationInputSchema'
import { WarmupWhereUniqueInputSchema } from '../inputTypeSchemas/WarmupWhereUniqueInputSchema'
import { WarmupScalarFieldEnumSchema } from '../inputTypeSchemas/WarmupScalarFieldEnumSchema'
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

export const WarmupFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WarmupFindFirstOrThrowArgs> = z.object({
  select: WarmupSelectSchema.optional(),
  include: WarmupIncludeSchema.optional(),
  where: WarmupWhereInputSchema.optional(),
  orderBy: z.union([ WarmupOrderByWithRelationInputSchema.array(),WarmupOrderByWithRelationInputSchema ]).optional(),
  cursor: WarmupWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WarmupScalarFieldEnumSchema,WarmupScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default WarmupFindFirstOrThrowArgsSchema;
