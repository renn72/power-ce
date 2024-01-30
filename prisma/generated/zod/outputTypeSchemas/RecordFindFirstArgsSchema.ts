import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecordWhereInputSchema } from '../inputTypeSchemas/RecordWhereInputSchema'
import { RecordOrderByWithRelationInputSchema } from '../inputTypeSchemas/RecordOrderByWithRelationInputSchema'
import { RecordWhereUniqueInputSchema } from '../inputTypeSchemas/RecordWhereUniqueInputSchema'
import { RecordScalarFieldEnumSchema } from '../inputTypeSchemas/RecordScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecordSelectSchema: z.ZodType<Prisma.RecordSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  date: z.boolean().optional(),
  lift: z.boolean().optional(),
  wc: z.boolean().optional(),
  gender: z.boolean().optional(),
  name: z.boolean().optional(),
  weight: z.boolean().optional(),
  userId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}).strict()

export const RecordFindFirstArgsSchema: z.ZodType<Prisma.RecordFindFirstArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default RecordFindFirstArgsSchema;
