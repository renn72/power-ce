import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateManyUserInputSchema } from './UserProfileCreateManyUserInputSchema';

export const UserProfileCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserProfileCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProfileCreateManyUserInputSchema),z.lazy(() => UserProfileCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default UserProfileCreateManyUserInputEnvelopeSchema;
