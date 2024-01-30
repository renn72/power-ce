import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanCreateWithoutValueInputSchema } from './CompPlanCreateWithoutValueInputSchema';
import { CompPlanUncheckedCreateWithoutValueInputSchema } from './CompPlanUncheckedCreateWithoutValueInputSchema';
import { CompPlanCreateOrConnectWithoutValueInputSchema } from './CompPlanCreateOrConnectWithoutValueInputSchema';
import { CompPlanUpsertWithoutValueInputSchema } from './CompPlanUpsertWithoutValueInputSchema';
import { CompPlanWhereUniqueInputSchema } from './CompPlanWhereUniqueInputSchema';
import { CompPlanUpdateToOneWithWhereWithoutValueInputSchema } from './CompPlanUpdateToOneWithWhereWithoutValueInputSchema';
import { CompPlanUpdateWithoutValueInputSchema } from './CompPlanUpdateWithoutValueInputSchema';
import { CompPlanUncheckedUpdateWithoutValueInputSchema } from './CompPlanUncheckedUpdateWithoutValueInputSchema';

export const CompPlanUpdateOneRequiredWithoutValueNestedInputSchema: z.ZodType<Prisma.CompPlanUpdateOneRequiredWithoutValueNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompPlanCreateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedCreateWithoutValueInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompPlanCreateOrConnectWithoutValueInputSchema).optional(),
  upsert: z.lazy(() => CompPlanUpsertWithoutValueInputSchema).optional(),
  connect: z.lazy(() => CompPlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompPlanUpdateToOneWithWhereWithoutValueInputSchema),z.lazy(() => CompPlanUpdateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedUpdateWithoutValueInputSchema) ]).optional(),
}).strict();

export default CompPlanUpdateOneRequiredWithoutValueNestedInputSchema;
