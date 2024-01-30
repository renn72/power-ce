import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanUpdateWithoutValueInputSchema } from './CompPlanUpdateWithoutValueInputSchema';
import { CompPlanUncheckedUpdateWithoutValueInputSchema } from './CompPlanUncheckedUpdateWithoutValueInputSchema';
import { CompPlanCreateWithoutValueInputSchema } from './CompPlanCreateWithoutValueInputSchema';
import { CompPlanUncheckedCreateWithoutValueInputSchema } from './CompPlanUncheckedCreateWithoutValueInputSchema';
import { CompPlanWhereInputSchema } from './CompPlanWhereInputSchema';

export const CompPlanUpsertWithoutValueInputSchema: z.ZodType<Prisma.CompPlanUpsertWithoutValueInput> = z.object({
  update: z.union([ z.lazy(() => CompPlanUpdateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedUpdateWithoutValueInputSchema) ]),
  create: z.union([ z.lazy(() => CompPlanCreateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedCreateWithoutValueInputSchema) ]),
  where: z.lazy(() => CompPlanWhereInputSchema).optional()
}).strict();

export default CompPlanUpsertWithoutValueInputSchema;
