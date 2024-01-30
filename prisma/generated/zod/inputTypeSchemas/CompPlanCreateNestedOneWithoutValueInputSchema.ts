import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanCreateWithoutValueInputSchema } from './CompPlanCreateWithoutValueInputSchema';
import { CompPlanUncheckedCreateWithoutValueInputSchema } from './CompPlanUncheckedCreateWithoutValueInputSchema';
import { CompPlanCreateOrConnectWithoutValueInputSchema } from './CompPlanCreateOrConnectWithoutValueInputSchema';
import { CompPlanWhereUniqueInputSchema } from './CompPlanWhereUniqueInputSchema';

export const CompPlanCreateNestedOneWithoutValueInputSchema: z.ZodType<Prisma.CompPlanCreateNestedOneWithoutValueInput> = z.object({
  create: z.union([ z.lazy(() => CompPlanCreateWithoutValueInputSchema),z.lazy(() => CompPlanUncheckedCreateWithoutValueInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompPlanCreateOrConnectWithoutValueInputSchema).optional(),
  connect: z.lazy(() => CompPlanWhereUniqueInputSchema).optional()
}).strict();

export default CompPlanCreateNestedOneWithoutValueInputSchema;
