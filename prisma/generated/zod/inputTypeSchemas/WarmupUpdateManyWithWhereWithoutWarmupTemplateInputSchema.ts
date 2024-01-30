import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupScalarWhereInputSchema } from './WarmupScalarWhereInputSchema';
import { WarmupUpdateManyMutationInputSchema } from './WarmupUpdateManyMutationInputSchema';
import { WarmupUncheckedUpdateManyWithoutWarmupTemplateInputSchema } from './WarmupUncheckedUpdateManyWithoutWarmupTemplateInputSchema';

export const WarmupUpdateManyWithWhereWithoutWarmupTemplateInputSchema: z.ZodType<Prisma.WarmupUpdateManyWithWhereWithoutWarmupTemplateInput> = z.object({
  where: z.lazy(() => WarmupScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WarmupUpdateManyMutationInputSchema),z.lazy(() => WarmupUncheckedUpdateManyWithoutWarmupTemplateInputSchema) ]),
}).strict();

export default WarmupUpdateManyWithWhereWithoutWarmupTemplateInputSchema;
