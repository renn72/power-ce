import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueIncludeSchema } from '../inputTypeSchemas/CompPlanValueIncludeSchema'
import { CompPlanValueWhereUniqueInputSchema } from '../inputTypeSchemas/CompPlanValueWhereUniqueInputSchema'
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

export const CompPlanValueDeleteArgsSchema: z.ZodType<Prisma.CompPlanValueDeleteArgs> = z.object({
  select: CompPlanValueSelectSchema.optional(),
  include: CompPlanValueIncludeSchema.optional(),
  where: CompPlanValueWhereUniqueInputSchema,
}).strict() ;

export default CompPlanValueDeleteArgsSchema;
