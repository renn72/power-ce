import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanWhereUniqueInputSchema } from './CompPlanWhereUniqueInputSchema';
import { CompPlanCreateWithoutValueInputSchema } from './CompPlanCreateWithoutValueInputSchema';
import { CompPlanUncheckedCreateWithoutValueInputSchema } from './CompPlanUncheckedCreateWithoutValueInputSchema';

export const CompPlanCreateOrConnectWithoutValueInputSchema: z.ZodType<Prisma.CompPlanCreateOrConnectWithoutValueInput> = z.object({
  where: z.lazy(() => CompPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompPlanCreateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedCreateWithoutValueInputSchema) ]),
}).strict();

export default CompPlanCreateOrConnectWithoutValueInputSchema;
