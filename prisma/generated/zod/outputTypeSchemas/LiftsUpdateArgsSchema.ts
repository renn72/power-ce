import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsIncludeSchema } from '../inputTypeSchemas/LiftsIncludeSchema'
import { LiftsUpdateInputSchema } from '../inputTypeSchemas/LiftsUpdateInputSchema'
import { LiftsUncheckedUpdateInputSchema } from '../inputTypeSchemas/LiftsUncheckedUpdateInputSchema'
import { LiftsWhereUniqueInputSchema } from '../inputTypeSchemas/LiftsWhereUniqueInputSchema'
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

export const LiftsUpdateArgsSchema: z.ZodType<Prisma.LiftsUpdateArgs> = z.object({
  select: LiftsSelectSchema.optional(),
  include: LiftsIncludeSchema.optional(),
  data: z.union([ LiftsUpdateInputSchema,LiftsUncheckedUpdateInputSchema ]),
  where: LiftsWhereUniqueInputSchema,
}).strict() ;

export default LiftsUpdateArgsSchema;
