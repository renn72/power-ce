import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereInputSchema } from '../inputTypeSchemas/UserProfileWhereInputSchema'

export const UserProfileDeleteManyArgsSchema: z.ZodType<Prisma.UserProfileDeleteManyArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
}).strict() ;

export default UserProfileDeleteManyArgsSchema;
