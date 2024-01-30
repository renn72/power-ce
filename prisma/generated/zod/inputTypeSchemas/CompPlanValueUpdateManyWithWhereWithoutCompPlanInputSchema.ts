import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueScalarWhereInputSchema } from './CompPlanValueScalarWhereInputSchema';
import { CompPlanValueUpdateManyMutationInputSchema } from './CompPlanValueUpdateManyMutationInputSchema';
import { CompPlanValueUncheckedUpdateManyWithoutCompPlanInputSchema } from './CompPlanValueUncheckedUpdateManyWithoutCompPlanInputSchema';

export const CompPlanValueUpdateManyWithWhereWithoutCompPlanInputSchema: z.ZodType<Prisma.CompPlanValueUpdateManyWithWhereWithoutCompPlanInput> = z.object({
  where: z.lazy(() => CompPlanValueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompPlanValueUpdateManyMutationInputSchema),z.lazy(() => CompPlanValueUncheckedUpdateManyWithoutCompPlanInputSchema) ]),
}).strict();

export default CompPlanValueUpdateManyWithWhereWithoutCompPlanInputSchema;
