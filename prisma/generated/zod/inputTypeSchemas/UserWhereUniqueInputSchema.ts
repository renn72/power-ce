import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { AccountListRelationFilterSchema } from './AccountListRelationFilterSchema';
import { SessionListRelationFilterSchema } from './SessionListRelationFilterSchema';
import { UserProfileListRelationFilterSchema } from './UserProfileListRelationFilterSchema';

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isDiet: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDietTrainer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPower: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isTrainer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isClient: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isRecordEditor: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isSuper: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCreator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isRoot: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isHiit: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isHiitTrainer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isPowerTrainer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield6: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield7: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield8: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield9: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  userProfiles: z.lazy(() => UserProfileListRelationFilterSchema).optional()
}).strict());

export default UserWhereUniqueInputSchema;
