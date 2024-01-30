import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateWhereInputSchema } from './WarmupTemplateWhereInputSchema';
import { WarmupTemplateUpdateWithoutWarmupsInputSchema } from './WarmupTemplateUpdateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema';

export const WarmupTemplateUpdateToOneWithWhereWithoutWarmupsInputSchema: z.ZodType<Prisma.WarmupTemplateUpdateToOneWithWhereWithoutWarmupsInput> = z.object({
  where: z.lazy(() => WarmupTemplateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WarmupTemplateUpdateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema) ]),
}).strict();

export default WarmupTemplateUpdateToOneWithWhereWithoutWarmupsInputSchema;
