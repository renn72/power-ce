import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupWhereUniqueInputSchema } from './WarmupWhereUniqueInputSchema';
import { WarmupUpdateWithoutWarmupTemplateInputSchema } from './WarmupUpdateWithoutWarmupTemplateInputSchema';
import { WarmupUncheckedUpdateWithoutWarmupTemplateInputSchema } from './WarmupUncheckedUpdateWithoutWarmupTemplateInputSchema';
import { WarmupCreateWithoutWarmupTemplateInputSchema } from './WarmupCreateWithoutWarmupTemplateInputSchema';
import { WarmupUncheckedCreateWithoutWarmupTemplateInputSchema } from './WarmupUncheckedCreateWithoutWarmupTemplateInputSchema';

export const WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInputSchema: z.ZodType<Prisma.WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInput> = z.object({
  where: z.lazy(() => WarmupWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WarmupUpdateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUncheckedUpdateWithoutWarmupTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => WarmupCreateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUncheckedCreateWithoutWarmupTemplateInputSchema) ]),
}).strict();

export default WarmupUpsertWithWhereUniqueWithoutWarmupTemplateInputSchema;
