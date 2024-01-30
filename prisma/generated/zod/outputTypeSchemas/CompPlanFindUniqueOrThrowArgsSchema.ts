import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanIncludeSchema } from '../inputTypeSchemas/CompPlanIncludeSchema'
import { CompPlanWhereUniqueInputSchema } from '../inputTypeSchemas/CompPlanWhereUniqueInputSchema'
import { CompPlanValueFindManyArgsSchema } from "../outputTypeSchemas/CompPlanValueFindManyArgsSchema"
import { CompPlanCountOutputTypeArgsSchema } from "../outputTypeSchemas/CompPlanCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompPlanSelectSchema: z.ZodType<Prisma.CompPlanSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  date: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  value: z.union([z.boolean(),z.lazy(() => CompPlanValueFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompPlanFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompPlanFindUniqueOrThrowArgs> = z.object({
  select: CompPlanSelectSchema.optional(),
  include: CompPlanIncludeSchema.optional(),
  where: CompPlanWhereUniqueInputSchema,
}).strict() ;

export default CompPlanFindUniqueOrThrowArgsSchema;
