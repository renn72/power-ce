import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueWhereUniqueInputSchema } from './CompPlanValueWhereUniqueInputSchema';
import { CompPlanValueUpdateWithoutCompPlanInputSchema } from './CompPlanValueUpdateWithoutCompPlanInputSchema';
import { CompPlanValueUncheckedUpdateWithoutCompPlanInputSchema } from './CompPlanValueUncheckedUpdateWithoutCompPlanInputSchema';
import { CompPlanValueCreateWithoutCompPlanInputSchema } from './CompPlanValueCreateWithoutCompPlanInputSchema';
import { CompPlanValueUncheckedCreateWithoutCompPlanInputSchema } from './CompPlanValueUncheckedCreateWithoutCompPlanInputSchema';

export const CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInputSchema: z.ZodType<Prisma.CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInput> = z.object({
  where: z.lazy(() => CompPlanValueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompPlanValueUpdateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUncheckedUpdateWithoutCompPlanInputSchema) ]),
  create: z.union([ z.lazy(() => CompPlanValueCreateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUncheckedCreateWithoutCompPlanInputSchema) ]),
}).strict();

export default CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInputSchema;
