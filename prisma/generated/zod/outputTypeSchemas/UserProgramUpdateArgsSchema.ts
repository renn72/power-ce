import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramUpdateInputSchema } from '../inputTypeSchemas/UserProgramUpdateInputSchema'
import { UserProgramUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserProgramUncheckedUpdateInputSchema'
import { UserProgramWhereUniqueInputSchema } from '../inputTypeSchemas/UserProgramWhereUniqueInputSchema'
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

export const UserProgramUpdateArgsSchema: z.ZodType<Prisma.UserProgramUpdateArgs> = z.object({
  select: UserProgramSelectSchema.optional(),
  data: z.union([ UserProgramUpdateInputSchema,UserProgramUncheckedUpdateInputSchema ]),
  where: UserProgramWhereUniqueInputSchema,
}).strict() ;

export default UserProgramUpdateArgsSchema;
