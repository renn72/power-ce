import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserCountOrderByAggregateInputSchema } from './UserCountOrderByAggregateInputSchema';
import { UserMaxOrderByAggregateInputSchema } from './UserMaxOrderByAggregateInputSchema';
import { UserMinOrderByAggregateInputSchema } from './UserMinOrderByAggregateInputSchema';

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
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
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export default UserOrderByWithAggregationInputSchema;
