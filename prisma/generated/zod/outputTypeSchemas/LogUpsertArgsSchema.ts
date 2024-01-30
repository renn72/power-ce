import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogWhereUniqueInputSchema } from '../inputTypeSchemas/LogWhereUniqueInputSchema'
import { LogCreateInputSchema } from '../inputTypeSchemas/LogCreateInputSchema'
import { LogUncheckedCreateInputSchema } from '../inputTypeSchemas/LogUncheckedCreateInputSchema'
import { LogUpdateInputSchema } from '../inputTypeSchemas/LogUpdateInputSchema'
import { LogUncheckedUpdateInputSchema } from '../inputTypeSchemas/LogUncheckedUpdateInputSchema'
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

export const LogUpsertArgsSchema: z.ZodType<Prisma.LogUpsertArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
  create: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
  update: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
}).strict() ;

export default LogUpsertArgsSchema;
