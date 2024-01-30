import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const UserProgramCreateManyInputSchema: z.ZodType<Prisma.UserProgramCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  trainerId: z.string().optional().nullable(),
  templateId: z.string(),
  programId: z.string().optional().nullable(),
  isProgramActive: z.boolean(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export default UserProgramCreateManyInputSchema;
