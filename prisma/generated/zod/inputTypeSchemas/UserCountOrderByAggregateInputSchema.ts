import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
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
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional(),
  flield4: z.lazy(() => SortOrderSchema).optional(),
  flield5: z.lazy(() => SortOrderSchema).optional(),
  flield6: z.lazy(() => SortOrderSchema).optional(),
  flield7: z.lazy(() => SortOrderSchema).optional(),
  flield8: z.lazy(() => SortOrderSchema).optional(),
  flield9: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default UserCountOrderByAggregateInputSchema;
