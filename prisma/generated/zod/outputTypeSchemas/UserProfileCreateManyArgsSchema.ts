import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateManyInputSchema } from '../inputTypeSchemas/UserProfileCreateManyInputSchema'

export const UserProfileCreateManyArgsSchema: z.ZodType<Prisma.UserProfileCreateManyArgs> = z.object({
  data: z.union([ UserProfileCreateManyInputSchema,UserProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default UserProfileCreateManyArgsSchema;
