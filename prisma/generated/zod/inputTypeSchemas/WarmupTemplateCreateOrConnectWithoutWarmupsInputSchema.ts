import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateWhereUniqueInputSchema } from './WarmupTemplateWhereUniqueInputSchema';
import { WarmupTemplateCreateWithoutWarmupsInputSchema } from './WarmupTemplateCreateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema';

export const WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema: z.ZodType<Prisma.WarmupTemplateCreateOrConnectWithoutWarmupsInput> = z.object({
  where: z.lazy(() => WarmupTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WarmupTemplateCreateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema) ]),
}).strict();

export default WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema;
