import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueCreateWithoutCompPlanInputSchema } from './CompPlanValueCreateWithoutCompPlanInputSchema';
import { CompPlanValueUncheckedCreateWithoutCompPlanInputSchema } from './CompPlanValueUncheckedCreateWithoutCompPlanInputSchema';
import { CompPlanValueCreateOrConnectWithoutCompPlanInputSchema } from './CompPlanValueCreateOrConnectWithoutCompPlanInputSchema';
import { CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInputSchema } from './CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInputSchema';
import { CompPlanValueCreateManyCompPlanInputEnvelopeSchema } from './CompPlanValueCreateManyCompPlanInputEnvelopeSchema';
import { CompPlanValueWhereUniqueInputSchema } from './CompPlanValueWhereUniqueInputSchema';
import { CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInputSchema } from './CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInputSchema';
import { CompPlanValueUpdateManyWithWhereWithoutCompPlanInputSchema } from './CompPlanValueUpdateManyWithWhereWithoutCompPlanInputSchema';
import { CompPlanValueScalarWhereInputSchema } from './CompPlanValueScalarWhereInputSchema';

export const CompPlanValueUpdateManyWithoutCompPlanNestedInputSchema: z.ZodType<Prisma.CompPlanValueUpdateManyWithoutCompPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompPlanValueCreateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueCreateWithoutCompPlanInputSchema).array(),z.lazy(() => CompPlanValueUncheckedCreateWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUncheckedCreateWithoutCompPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompPlanValueCreateOrConnectWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueCreateOrConnectWithoutCompPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUpsertWithWhereUniqueWithoutCompPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompPlanValueCreateManyCompPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompPlanValueWhereUniqueInputSchema),z.lazy(() => CompPlanValueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompPlanValueWhereUniqueInputSchema),z.lazy(() => CompPlanValueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompPlanValueWhereUniqueInputSchema),z.lazy(() => CompPlanValueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompPlanValueWhereUniqueInputSchema),z.lazy(() => CompPlanValueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUpdateWithWhereUniqueWithoutCompPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompPlanValueUpdateManyWithWhereWithoutCompPlanInputSchema),z.lazy(() => CompPlanValueUpdateManyWithWhereWithoutCompPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompPlanValueScalarWhereInputSchema),z.lazy(() => CompPlanValueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default CompPlanValueUpdateManyWithoutCompPlanNestedInputSchema;
