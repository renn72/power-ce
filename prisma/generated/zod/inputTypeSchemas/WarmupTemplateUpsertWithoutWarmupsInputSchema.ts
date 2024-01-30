import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateUpdateWithoutWarmupsInputSchema } from './WarmupTemplateUpdateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema';
import { WarmupTemplateCreateWithoutWarmupsInputSchema } from './WarmupTemplateCreateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema';
import { WarmupTemplateWhereInputSchema } from './WarmupTemplateWhereInputSchema';

export const WarmupTemplateUpsertWithoutWarmupsInputSchema: z.ZodType<Prisma.WarmupTemplateUpsertWithoutWarmupsInput> = z.object({
  update: z.union([ z.lazy(() => WarmupTemplateUpdateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema) ]),
  create: z.union([ z.lazy(() => WarmupTemplateCreateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema) ]),
  where: z.lazy(() => WarmupTemplateWhereInputSchema).optional()
}).strict();

export default WarmupTemplateUpsertWithoutWarmupsInputSchema;
