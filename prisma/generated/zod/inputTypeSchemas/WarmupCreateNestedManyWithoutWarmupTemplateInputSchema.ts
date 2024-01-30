import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupCreateWithoutWarmupTemplateInputSchema } from './WarmupCreateWithoutWarmupTemplateInputSchema';
import { WarmupUncheckedCreateWithoutWarmupTemplateInputSchema } from './WarmupUncheckedCreateWithoutWarmupTemplateInputSchema';
import { WarmupCreateOrConnectWithoutWarmupTemplateInputSchema } from './WarmupCreateOrConnectWithoutWarmupTemplateInputSchema';
import { WarmupCreateManyWarmupTemplateInputEnvelopeSchema } from './WarmupCreateManyWarmupTemplateInputEnvelopeSchema';
import { WarmupWhereUniqueInputSchema } from './WarmupWhereUniqueInputSchema';

export const WarmupCreateNestedManyWithoutWarmupTemplateInputSchema: z.ZodType<Prisma.WarmupCreateNestedManyWithoutWarmupTemplateInput> = z.object({
  create: z.union([ z.lazy(() => WarmupCreateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupCreateWithoutWarmupTemplateInputSchema).array(),z.lazy(() => WarmupUncheckedCreateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUncheckedCreateWithoutWarmupTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WarmupCreateOrConnectWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupCreateOrConnectWithoutWarmupTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WarmupCreateManyWarmupTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WarmupWhereUniqueInputSchema),z.lazy(() => WarmupWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default WarmupCreateNestedManyWithoutWarmupTemplateInputSchema;
