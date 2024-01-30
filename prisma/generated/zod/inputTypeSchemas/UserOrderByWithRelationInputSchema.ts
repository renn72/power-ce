import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AccountOrderByRelationAggregateInputSchema } from './AccountOrderByRelationAggregateInputSchema';
import { SessionOrderByRelationAggregateInputSchema } from './SessionOrderByRelationAggregateInputSchema';
import { UserProfileOrderByRelationAggregateInputSchema } from './UserProfileOrderByRelationAggregateInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isDiet: z.lazy(() => SortOrderSchema).optional(),
  isDietTrainer: z.lazy(() => SortOrderSchema).optional(),
  isPower: z.lazy(() => SortOrderSchema).optional(),
  isTrainer: z.lazy(() => SortOrderSchema).optional(),
  isClient: z.lazy(() => SortOrderSchema).optional(),
  isRecordEditor: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  isSuper: z.lazy(() => SortOrderSchema).optional(),
  isCreator: z.lazy(() => SortOrderSchema).optional(),
  isRoot: z.lazy(() => SortOrderSchema).optional(),
  isHiit: z.lazy(() => SortOrderSchema).optional(),
  isHiitTrainer: z.lazy(() => SortOrderSchema).optional(),
  isPowerTrainer: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield4: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield5: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield6: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield7: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield8: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield9: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  userProfiles: z.lazy(() => UserProfileOrderByRelationAggregateInputSchema).optional()
}).strict();

export default UserOrderByWithRelationInputSchema;
