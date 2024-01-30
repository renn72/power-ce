import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramCreateManyInputSchema } from '../inputTypeSchemas/UserProgramCreateManyInputSchema'

export const UserProgramCreateManyArgsSchema: z.ZodType<Prisma.UserProgramCreateManyArgs> = z.object({
  data: z.union([ UserProgramCreateManyInputSchema,UserProgramCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default UserProgramCreateManyArgsSchema;
