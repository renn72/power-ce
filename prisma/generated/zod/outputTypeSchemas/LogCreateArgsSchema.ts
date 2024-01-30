import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogCreateInputSchema } from '../inputTypeSchemas/LogCreateInputSchema'
import { LogUncheckedCreateInputSchema } from '../inputTypeSchemas/LogUncheckedCreateInputSchema'
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

export const LogCreateArgsSchema: z.ZodType<Prisma.LogCreateArgs> = z.object({
  select: LogSelectSchema.optional(),
  data: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
}).strict() ;

export default LogCreateArgsSchema;
