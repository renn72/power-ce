import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueIncludeSchema } from '../inputTypeSchemas/CompPlanValueIncludeSchema'
import { CompPlanValueWhereInputSchema } from '../inputTypeSchemas/CompPlanValueWhereInputSchema'
import { CompPlanValueOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompPlanValueOrderByWithRelationInputSchema'
import { CompPlanValueWhereUniqueInputSchema } from '../inputTypeSchemas/CompPlanValueWhereUniqueInputSchema'
import { CompPlanValueScalarFieldEnumSchema } from '../inputTypeSchemas/CompPlanValueScalarFieldEnumSchema'
import { CompPlanArgsSchema } from "../outputTypeSchemas/CompPlanArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompPlanValueSelectSchema: z.ZodType<Prisma.CompPlanValueSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  CompPlanId: z.boolean().optional(),
  name: z.boolean().optional(),
  value: z.boolean().optional(),
  notes: z.boolean().optional(),
  time: z.boolean().optional(),
  isGoodLift: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  CompPlan: z.union([z.boolean(),z.lazy(() => CompPlanArgsSchema)]).optional(),
}).strict()

export const CompPlanValueFindManyArgsSchema: z.ZodType<Prisma.CompPlanValueFindManyArgs> = z.object({
  select: CompPlanValueSelectSchema.optional(),
  include: CompPlanValueIncludeSchema.optional(),
  where: CompPlanValueWhereInputSchema.optional(),
  orderBy: z.union([ CompPlanValueOrderByWithRelationInputSchema.array(),CompPlanValueOrderByWithRelationInputSchema ]).optional(),
  cursor: CompPlanValueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompPlanValueScalarFieldEnumSchema,CompPlanValueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default CompPlanValueFindManyArgsSchema;
