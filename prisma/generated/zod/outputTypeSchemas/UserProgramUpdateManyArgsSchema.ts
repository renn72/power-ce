import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramUpdateManyMutationInputSchema } from '../inputTypeSchemas/UserProgramUpdateManyMutationInputSchema'
import { UserProgramUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/UserProgramUncheckedUpdateManyInputSchema'
import { UserProgramWhereInputSchema } from '../inputTypeSchemas/UserProgramWhereInputSchema'

export const UserProgramUpdateManyArgsSchema: z.ZodType<Prisma.UserProgramUpdateManyArgs> = z.object({
  data: z.union([ UserProgramUpdateManyMutationInputSchema,UserProgramUncheckedUpdateManyInputSchema ]),
  where: UserProgramWhereInputSchema.optional(),
}).strict() ;

export default UserProgramUpdateManyArgsSchema;
