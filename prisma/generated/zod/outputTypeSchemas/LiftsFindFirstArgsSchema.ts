import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsIncludeSchema } from '../inputTypeSchemas/LiftsIncludeSchema'
import { LiftsWhereInputSchema } from '../inputTypeSchemas/LiftsWhereInputSchema'
import { LiftsOrderByWithRelationInputSchema } from '../inputTypeSchemas/LiftsOrderByWithRelationInputSchema'
import { LiftsWhereUniqueInputSchema } from '../inputTypeSchemas/LiftsWhereUniqueInputSchema'
import { LiftsScalarFieldEnumSchema } from '../inputTypeSchemas/LiftsScalarFieldEnumSchema'
import { LiftFindManyArgsSchema } from "../outputTypeSchemas/LiftFindManyArgsSchema"
import { LiftsCountOutputTypeArgsSchema } from "../outputTypeSchemas/LiftsCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LiftsSelectSchema: z.ZodType<Prisma.LiftsSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  lift: z.union([z.boolean(),z.lazy(() => LiftFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LiftsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LiftsFindFirstArgsSchema: z.ZodType<Prisma.LiftsFindFirstArgs> = z.object({
  select: LiftsSelectSchema.optional(),
  include: LiftsIncludeSchema.optional(),
  where: LiftsWhereInputSchema.optional(),
  orderBy: z.union([ LiftsOrderByWithRelationInputSchema.array(),LiftsOrderByWithRelationInputSchema ]).optional(),
  cursor: LiftsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LiftsScalarFieldEnumSchema,LiftsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default LiftsFindFirstArgsSchema;
