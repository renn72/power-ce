import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramWhereInputSchema } from '../inputTypeSchemas/UserProgramWhereInputSchema'

export const UserProgramDeleteManyArgsSchema: z.ZodType<Prisma.UserProgramDeleteManyArgs> = z.object({
  where: UserProgramWhereInputSchema.optional(),
}).strict() ;

export default UserProgramDeleteManyArgsSchema;
