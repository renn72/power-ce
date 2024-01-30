import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexWhereUniqueInputSchema } from '../inputTypeSchemas/RPEIndexWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RPEIndexSelectSchema: z.ZodType<Prisma.RPEIndexSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  value: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}).strict()

export const RPEIndexDeleteArgsSchema: z.ZodType<Prisma.RPEIndexDeleteArgs> = z.object({
  select: RPEIndexSelectSchema.optional(),
  where: RPEIndexWhereUniqueInputSchema,
}).strict() ;

export default RPEIndexDeleteArgsSchema;
