import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateCreateWithoutWarmupsInputSchema } from './WarmupTemplateCreateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema';
import { WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema } from './WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema';
import { WarmupTemplateWhereUniqueInputSchema } from './WarmupTemplateWhereUniqueInputSchema';

export const WarmupTemplateCreateNestedOneWithoutWarmupsInputSchema: z.ZodType<Prisma.WarmupTemplateCreateNestedOneWithoutWarmupsInput> = z.object({
  create: z.union([ z.lazy(() => WarmupTemplateCreateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema).optional(),
  connect: z.lazy(() => WarmupTemplateWhereUniqueInputSchema).optional()
}).strict();

export default WarmupTemplateCreateNestedOneWithoutWarmupsInputSchema;
