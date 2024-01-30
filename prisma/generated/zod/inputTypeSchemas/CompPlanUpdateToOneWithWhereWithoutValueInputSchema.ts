import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanWhereInputSchema } from './CompPlanWhereInputSchema';
import { CompPlanUpdateWithoutValueInputSchema } from './CompPlanUpdateWithoutValueInputSchema';
import { CompPlanUncheckedUpdateWithoutValueInputSchema } from './CompPlanUncheckedUpdateWithoutValueInputSchema';

export const CompPlanUpdateToOneWithWhereWithoutValueInputSchema: z.ZodType<Prisma.CompPlanUpdateToOneWithWhereWithoutValueInput> = z.object({
  where: z.lazy(() => CompPlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompPlanUpdateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedUpdateWithoutValueInputSchema) ]),
}).strict();

export default CompPlanUpdateToOneWithWhereWithoutValueInputSchema;
