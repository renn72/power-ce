import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupWhereUniqueInputSchema } from './WarmupWhereUniqueInputSchema';
import { WarmupUpdateWithoutWarmupTemplateInputSchema } from './WarmupUpdateWithoutWarmupTemplateInputSchema';
import { WarmupUncheckedUpdateWithoutWarmupTemplateInputSchema } from './WarmupUncheckedUpdateWithoutWarmupTemplateInputSchema';

export const WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInputSchema: z.ZodType<Prisma.WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInput> = z.object({
  where: z.lazy(() => WarmupWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WarmupUpdateWithoutWarmupTemplateInputSchema),z.lazy(() => WarmupUncheckedUpdateWithoutWarmupTemplateInputSchema) ]),
}).strict();

export default WarmupUpdateWithWhereUniqueWithoutWarmupTemplateInputSchema;
