import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateManyMutationInputSchema } from '../inputTypeSchemas/UserProfileUpdateManyMutationInputSchema'
import { UserProfileUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/UserProfileUncheckedUpdateManyInputSchema'
import { UserProfileWhereInputSchema } from '../inputTypeSchemas/UserProfileWhereInputSchema'

export const UserProfileUpdateManyArgsSchema: z.ZodType<Prisma.UserProfileUpdateManyArgs> = z.object({
  data: z.union([ UserProfileUpdateManyMutationInputSchema,UserProfileUncheckedUpdateManyInputSchema ]),
  where: UserProfileWhereInputSchema.optional(),
}).strict() ;

export default UserProfileUpdateManyArgsSchema;
