import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftIncludeSchema } from '../inputTypeSchemas/LiftIncludeSchema'
import { LiftWhereInputSchema } from '../inputTypeSchemas/LiftWhereInputSchema'
import { LiftOrderByWithRelationInputSchema } from '../inputTypeSchemas/LiftOrderByWithRelationInputSchema'
import { LiftWhereUniqueInputSchema } from '../inputTypeSchemas/LiftWhereUniqueInputSchema'
import { LiftScalarFieldEnumSchema } from '../inputTypeSchemas/LiftScalarFieldEnumSchema'
import { LiftsArgsSchema } from "../outputTypeSchemas/LiftsArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LiftSelectSchema: z.ZodType<Prisma.LiftSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  createdAtUser: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  liftId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  weight: z.boolean().optional(),
  reps: z.boolean().optional(),
  liftName: z.boolean().optional(),
  notes: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  lift: z.union([z.boolean(),z.lazy(() => LiftsArgsSchema)]).optional(),
}).strict()

export const LiftFindManyArgsSchema: z.ZodType<Prisma.LiftFindManyArgs> = z.object({
  select: LiftSelectSchema.optional(),
  include: LiftIncludeSchema.optional(),
  where: LiftWhereInputSchema.optional(),
  orderBy: z.union([ LiftOrderByWithRelationInputSchema.array(),LiftOrderByWithRelationInputSchema ]).optional(),
  cursor: LiftWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LiftScalarFieldEnumSchema,LiftScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default LiftFindManyArgsSchema;
