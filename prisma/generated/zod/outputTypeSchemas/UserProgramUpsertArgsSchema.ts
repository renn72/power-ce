import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramWhereUniqueInputSchema } from '../inputTypeSchemas/UserProgramWhereUniqueInputSchema'
import { UserProgramCreateInputSchema } from '../inputTypeSchemas/UserProgramCreateInputSchema'
import { UserProgramUncheckedCreateInputSchema } from '../inputTypeSchemas/UserProgramUncheckedCreateInputSchema'
import { UserProgramUpdateInputSchema } from '../inputTypeSchemas/UserProgramUpdateInputSchema'
import { UserProgramUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserProgramUncheckedUpdateInputSchema'
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

export const UserProgramUpsertArgsSchema: z.ZodType<Prisma.UserProgramUpsertArgs> = z.object({
  select: UserProgramSelectSchema.optional(),
  where: UserProgramWhereUniqueInputSchema,
  create: z.union([ UserProgramCreateInputSchema,UserProgramUncheckedCreateInputSchema ]),
  update: z.union([ UserProgramUpdateInputSchema,UserProgramUncheckedUpdateInputSchema ]),
}).strict() ;

export default UserProgramUpsertArgsSchema;
