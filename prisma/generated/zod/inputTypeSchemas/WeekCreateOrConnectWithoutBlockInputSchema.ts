import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';
import { WeekCreateWithoutBlockInputSchema } from './WeekCreateWithoutBlockInputSchema';
import { WeekUncheckedCreateWithoutBlockInputSchema } from './WeekUncheckedCreateWithoutBlockInputSchema';

export const WeekCreateOrConnectWithoutBlockInputSchema: z.ZodType<Prisma.WeekCreateOrConnectWithoutBlockInput> = z.object({
  where: z.lazy(() => WeekWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WeekCreateWithoutBlockInputSchema),z.lazy(() => WeekUncheckedCreateWithoutBlockInputSchema) ]),
}).strict();

export default WeekCreateOrConnectWithoutBlockInputSchema;
