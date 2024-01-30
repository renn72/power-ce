import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';
import { WeekCreateWithoutDayInputSchema } from './WeekCreateWithoutDayInputSchema';
import { WeekUncheckedCreateWithoutDayInputSchema } from './WeekUncheckedCreateWithoutDayInputSchema';

export const WeekCreateOrConnectWithoutDayInputSchema: z.ZodType<Prisma.WeekCreateOrConnectWithoutDayInput> = z.object({
  where: z.lazy(() => WeekWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WeekCreateWithoutDayInputSchema),z.lazy(() => WeekUncheckedCreateWithoutDayInputSchema) ]),
}).strict();

export default WeekCreateOrConnectWithoutDayInputSchema;
