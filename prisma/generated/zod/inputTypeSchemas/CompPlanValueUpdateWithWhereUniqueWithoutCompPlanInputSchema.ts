import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueWhereUniqueInputSchema } from './CompPlanValueWhereUniqueInputSchema';
import { CompPlanValueUpdateWithoutCompPlanInputSchema } from './CompPlanValueUpdateWithoutCompPlanInputSchema';
import { CompPlanValueUncheckedUpdateWithoutCompPlanInputSchema } from './CompPlanValueUncheckedUpdateWithoutCompPlanInputSchema';

export const CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInputSchema: z.ZodType<Prisma.CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInput> = z.object({
  where: z.lazy(() => CompPlanValueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompPlanValueUpdateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUncheckedUpdateWithoutCompPlanInputSchema) ]),
}).strict();

export default CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInputSchema;
