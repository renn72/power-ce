import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogWhereInputSchema } from '../inputTypeSchemas/LogWhereInputSchema'
import { LogOrderByWithRelationInputSchema } from '../inputTypeSchemas/LogOrderByWithRelationInputSchema'
import { LogWhereUniqueInputSchema } from '../inputTypeSchemas/LogWhereUniqueInputSchema'
import { LogScalarFieldEnumSchema } from '../inputTypeSchemas/LogScalarFieldEnumSchema'
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

export const LogFindManyArgsSchema: z.ZodType<Prisma.LogFindManyArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default LogFindManyArgsSchema;
