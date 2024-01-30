import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueCreateWithoutCompPlanInputSchema } from './CompPlanValueCreateWithoutCompPlanInputSchema';
import { CompPlanValueUncheckedCreateWithoutCompPlanInputSchema } from './CompPlanValueUncheckedCreateWithoutCompPlanInputSchema';
import { CompPlanValueCreateOrConnectWithoutCompPlanInputSchema } from './CompPlanValueCreateOrConnectWithoutCompPlanInputSchema';
import { CompPlanValueCreateManyCompPlanInputEnvelopeSchema } from './CompPlanValueCreateManyCompPlanInputEnvelopeSchema';
import { CompPlanValueWhereUniqueInputSchema } from './CompPlanValueWhereUniqueInputSchema';

export const CompPlanValueCreateNestedManyWithoutCompPlanInputSchema: z.ZodType<Prisma.CompPlanValueCreateNestedManyWithoutCompPlanInput> = z.object({
  create: z.union([ z.lazy(() => CompPlanValueCreateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueCreateWithoutCompPlanInputSchema).array(),z.lazy(() => CompPlanValueUncheckedCreateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUncheckedCreateWithoutCompPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompPlanValueCreateOrConnectWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueCreateOrConnectWithoutCompPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompPlanValueCreateManyCompPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompPlanValueWhereUniqueInputSchema),z.lazy(() => CompPlanValueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default CompPlanValueCreateNestedManyWithoutCompPlanInputSchema;
