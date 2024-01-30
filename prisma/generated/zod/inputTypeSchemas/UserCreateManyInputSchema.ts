import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  isDiet: z.boolean().optional(),
  isDietTrainer: z.boolean().optional(),
  isPower: z.boolean().optional(),
  isTrainer: z.boolean().optional(),
  isClient: z.boolean().optional(),
  isRecordEditor: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  isSuper: z.boolean().optional(),
  isCreator: z.boolean().optional(),
  isRoot: z.boolean().optional(),
  isHiit: z.boolean().optional(),
  isHiitTrainer: z.boolean().optional(),
  isPowerTrainer: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable(),
  flield6: z.string().optional().nullable(),
  flield7: z.string().optional().nullable(),
  flield8: z.string().optional().nullable(),
  flield9: z.string().optional().nullable()
}).strict();

export default UserCreateManyInputSchema;
