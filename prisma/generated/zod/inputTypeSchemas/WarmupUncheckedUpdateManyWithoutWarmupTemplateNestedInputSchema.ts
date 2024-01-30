import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupCreateWithoutWarmupTemplateInputSchema } from './WarmupCreateWithoutWarmupTemplateInputSchema';
import { WarmupUncheckedCreateWithoutWarmupTemplateInputSchema } from './WarmupUncheckedCreateWithoutWarmupTemplateInputSchema';
import { WarmupCreateOrConnectWithoutWarmupTemplateInputSchema } from './WarmupCreateOrConnectWithoutWarmupTemplateInputSchema';
import { WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInputSchema } from './WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInputSchema';
import { WarmupCreateManyWarmupTemplateInputEnvelopeSchema } from './WarmupCreateManyWarmupTemplateInputEnvelopeSchema';
import { WarmupWhereUniqueInputSchema } from './WarmupWhereUniqueInputSchema';
import { WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInputSchema } from './WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInputSchema';
import { WarmupUpdateManyWithWhereWithoutWarmupTemplateInputSchema } from './WarmupUpdateManyWithWhereWithoutWarmupTemplateInputSchema';
import { WarmupScalarWhereInputSchema } from './WarmupScalarWhereInputSchema';

export const WarmupUncheckedUpdateManyWithoutWarmupTemplateNestedInputSchema: z.ZodType<Prisma.WarmupUncheckedUpdateManyWithoutWarmupTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => WarmupCreateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupCreateWithoutWarmupTemplateInputSchema).array(),z.lazy(() => WarmupUncheckedCreateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUncheckedCreateWithoutWarmupTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WarmupCreateOrConnectWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupCreateOrConnectWithoutWarmupTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WarmupCreateManyWarmupTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WarmupWhereUniqueInputSchema),z.lazy(() => WarmupWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WarmupWhereUniqueInputSchema),z.lazy(() => WarmupWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WarmupWhereUniqueInputSchema),z.lazy(() => WarmupWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WarmupWhereUniqueInputSchema),z.lazy(() => WarmupWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WarmupUpdateManyWithWhereWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUpdateManyWithWhereWithoutWarmupTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WarmupScalarWhereInputSchema),z.lazy(() => WarmupScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default WarmupUncheckedUpdateManyWithoutWarmupTemplateNestedInputSchema;
