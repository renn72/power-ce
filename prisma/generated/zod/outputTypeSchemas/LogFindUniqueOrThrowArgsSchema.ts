import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogWhereUniqueInputSchema } from '../inputTypeSchemas/LogWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LogSelectSchema: z.ZodType<Prisma.LogSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  action: z.boolean().optional(),
  location: z.boolean().optional(),
  url: z.boolean().optional(),
  response: z.boolean().optional(),
  request: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
}).strict()

export const LogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LogFindUniqueOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export default LogFindUniqueOrThrowArgsSchema;
