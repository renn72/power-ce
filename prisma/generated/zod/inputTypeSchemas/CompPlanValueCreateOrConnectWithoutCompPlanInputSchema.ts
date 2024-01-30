import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueWhereUniqueInputSchema } from './CompPlanValueWhereUniqueInputSchema';
import { CompPlanValueCreateWithoutCompPlanInputSchema } from './CompPlanValueCreateWithoutCompPlanInputSchema';
import { CompPlanValueUncheckedCreateWithoutCompPlanInputSchema } from './CompPlanValueUncheckedCreateWithoutCompPlanInputSchema';

export const CompPlanValueCreateOrConnectWithoutCompPlanInputSchema: z.ZodType<Prisma.CompPlanValueCreateOrConnectWithoutCompPlanInput> = z.object({
  where: z.lazy(() => CompPlanValueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompPlanValueCreateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUncheckedCreateWithoutCompPlanInputSchema) ]),
}).strict();

export default CompPlanValueCreateOrConnectWithoutCompPlanInputSchema;
