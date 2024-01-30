import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateCreateWithoutWarmupsInputSchema } from './WarmupTemplateCreateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema';
import { WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema } from './WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema';
import { WarmupTemplateUpsertWithoutWarmupsInputSchema } from './WarmupTemplateUpsertWithoutWarmupsInputSchema';
import { WarmupTemplateWhereUniqueInputSchema } from './WarmupTemplateWhereUniqueInputSchema';
import { WarmupTemplateUpdateToOneWithWhereWithoutWarmupsInputSchema } from './WarmupTemplateUpdateToOneWithWhereWithoutWarmupsInputSchema';
import { WarmupTemplateUpdateWithoutWarmupsInputSchema } from './WarmupTemplateUpdateWithoutWarmupsInputSchema';
import { WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema } from './WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema';

export const WarmupTemplateUpdateOneRequiredWithoutWarmupsNestedInputSchema: z.ZodType<Prisma.WarmupTemplateUpdateOneRequiredWithoutWarmupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => WarmupTemplateCreateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedCreateWithoutWarmupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WarmupTemplateCreateOrConnectWithoutWarmupsInputSchema).optional(),
  upsert: z.lazy(() => WarmupTemplateUpsertWithoutWarmupsInputSchema).optional(),
  connect: z.lazy(() => WarmupTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WarmupTemplateUpdateToOneWithWhereWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUpdateWithoutWarmupsInputSchema),z.lazy(() => WarmupTemplateUncheckedUpdateWithoutWarmupsInputSchema) ]).optional(),
}).strict();

export default WarmupTemplateUpdateOneRequiredWithoutWarmupsNestedInputSchema;
