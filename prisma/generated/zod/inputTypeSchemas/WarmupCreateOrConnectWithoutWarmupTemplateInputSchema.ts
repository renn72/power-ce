import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupWhereUniqueInputSchema } from './WarmupWhereUniqueInputSchema';
import { WarmupCreateWithoutWarmupTemplateInputSchema } from './WarmupCreateWithoutWarmupTemplateInputSchema';
import { WarmupUncheckedCreateWithoutWarmupTemplateInputSchema } from './WarmupUncheckedCreateWithoutWarmupTemplateInputSchema';

export const WarmupCreateOrConnectWithoutWarmupTemplateInputSchema: z.ZodType<Prisma.WarmupCreateOrConnectWithoutWarmupTemplateInput> = z.object({
  where: z.lazy(() => WarmupWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WarmupCreateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUncheckedCreateWithoutWarmupTemplateInputSchema) ]),
}).strict();

export default WarmupCreateOrConnectWithoutWarmupTemplateInputSchema;
