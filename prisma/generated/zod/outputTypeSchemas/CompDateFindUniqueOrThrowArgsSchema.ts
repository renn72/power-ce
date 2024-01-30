import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateWhereUniqueInputSchema } from '../inputTypeSchemas/CompDateWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompDateSelectSchema: z.ZodType<Prisma.CompDateSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  date: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
}).strict()

export const CompDateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompDateFindUniqueOrThrowArgs> = z.object({
  select: CompDateSelectSchema.optional(),
  where: CompDateWhereUniqueInputSchema,
}).strict() ;

export default CompDateFindUniqueOrThrowArgsSchema;
