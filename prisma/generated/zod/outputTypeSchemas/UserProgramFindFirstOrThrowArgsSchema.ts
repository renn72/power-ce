import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramWhereInputSchema } from '../inputTypeSchemas/UserProgramWhereInputSchema'
import { UserProgramOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserProgramOrderByWithRelationInputSchema'
import { UserProgramWhereUniqueInputSchema } from '../inputTypeSchemas/UserProgramWhereUniqueInputSchema'
import { UserProgramScalarFieldEnumSchema } from '../inputTypeSchemas/UserProgramScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserProgramSelectSchema: z.ZodType<Prisma.UserProgramSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  templateId: z.boolean().optional(),
  programId: z.boolean().optional(),
  isProgramActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const UserProgramFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProgramFindFirstOrThrowArgs> = z.object({
  select: UserProgramSelectSchema.optional(),
  where: UserProgramWhereInputSchema.optional(),
  orderBy: z.union([ UserProgramOrderByWithRelationInputSchema.array(),UserProgramOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProgramWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProgramScalarFieldEnumSchema,UserProgramScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default UserProgramFindFirstOrThrowArgsSchema;
